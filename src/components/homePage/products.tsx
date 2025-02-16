"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomComponent from "../bottom/bottomComponent";
import useSWR from "swr";
import { fetchAPI } from "@/api/fetchApi";
import { APIResponse } from "@/model/dto/fetchApiDTO";
import { productsInfo } from "@/model/vo/productInfoVO";
import userInfoSlice from "@/middleware/redux/userInfoSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/middleware/redux/store";
import { userInfo } from "os";

interface ProductsProps {
  selectedKey: number;
}

const Products: React.FC<ProductsProps> = ({ selectedKey }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [productList, setProductList] = useState<productsInfo[]>([]);
    const { userInfo: reduxUserInfo } = useSelector((state: RootState) => state.user);

    const loadMoreProducts = async (url: string) => {
        return fetchAPI(url).then((data: APIResponse) => {
            if (data.code === 200) {
                return data.data as { productList: productsInfo[]; totalItems: number; currentPage: number };
            } else {
                if (process.env.NODE_ENV === "development") {
                    console.log('error:', data);
                }
                return null;
            }
        });
    };

    function handleNextPage() {
        setCurrentPage(prevPage => prevPage + 1);
    }

    // 根据 selectedKey 选择不同的 API
    const { data, error, isLoading } = useSWR(
        selectedKey === 0
            ? `/recommend-server/getRecommendProductList?userId=${reduxUserInfo?.userId}`  // key为0时使用另一种API
            : `/product-server/getProductList?currentPage=${currentPage}&pageSize=${pageSize}&categoryId=${selectedKey}`,  // 其他情况下使用默认API
        loadMoreProducts,
        {
            dedupingInterval: 10 * 5000, // 50 秒内不会重复请求相同 url
            staleTime: 1 * 60 * 1000 // 数据缓存时间 1 分钟
        }
    );

    // 当 selectedKey 改变时，重置商品列表并设置为第一页
    useEffect(() => {
        setCurrentPage(1);
        setProductList([]);
        setHasMore(true);
    }, [selectedKey]);

    useEffect(() => {
        if (data === undefined) return;

        if (data === null) {
            setHasMore(false);
            setProductList([]);
            return;
        }

        const totalPages = Math.ceil(data.totalItems / pageSize); // 计算总页数
        const isLastPage = data.currentPage === totalPages; // 判断是否已经是最后一页

        const shouldHaveMore = !isLastPage;

        if (data.productList === null || data.productList.length === 0) {
            setHasMore(false);
            setProductList([]);
            return;
        }

        setProductList(prev => [...prev, ...data.productList]);
        setHasMore(shouldHaveMore);
    }, [data]);

    // 处理产品点击事件，发送消息
    function handleProductClick(product: any) {
        window.open(`/productDetail/${product.id}`, '_blank');
    }

    return (
        <div>
            {/* 商品展示 */}
            <InfiniteScroll
                dataLength={productList?.length}
                next={handleNextPage}
                hasMore={hasMore}
                loader={<div className="text-center py-4">加载中...</div>}
                endMessage={<div className="text-center py-4">没有更多商品了！</div>}
            >
                <div className="flex flex-wrap w-full ">
                    {productList?.map((product, index) => (
                        <div key={index} className="flex-none w-[20%] h-[300px] p-2">
                            <div onClick={() => handleProductClick(product)} className="w-full h-full p-1 rounded-lg cursor-pointer border-[1px] border-transparent hover:border-[1px] hover:border-[#ff5050] box-border">
                                <div className="w-full h-[180px] rounded-lg relative">
                                    {product.pImg && product.pImg.length > 0 && product.pImg[0]?.img_url ? (
                                        <Image
                                            src={`http://localhost:9000/${product.pImg[0]?.img_url}`}
                                            alt="product"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    ) : (
                                        <Image
                                            src="/images/test.jpg"
                                            alt="Default Product Image"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    )}
                                </div>
                                <div className="mt-[5px] text-[16px] font-medium text-[#282828] font-custom line-clamp-1">
                                    {product.name}
                                </div>
                                <div className="mt-[2px] text-[#ff5000] font-custom text-[14px]">
                                    包邮
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="text-[20px] font-custom2 text-[#ff5000] font-bold">
                                        &yen;{product.price}
                                    </div>
                                    <div className="ml-[8px] mt-[5px] text-[14px] text-[#7a7a7a] font-custom2">
                                        {product.sold ? product.sold : 0}人购买
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
            <BottomComponent />
        </div>
    );
};

export default Products;
