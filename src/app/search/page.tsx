"use client";

import MainLayout from "@/layouts/mainLayout";
import { useRouter,useSearchParams } from "next/navigation";
import { Breadcrumbs, Button } from "@mui/material";
import {useEffect, useState } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomComponent from "@/components/bottom/bottomComponent";
import useSWR from 'swr'
import { fetchAPI } from "@/api/fetchApi";
import { APIResponse } from "@/model/dto/fetchApiDTO";
import { productsInfo } from "@/model/vo/productInfoVO";
import { menuItemsClassify } from "@/model/enum/enum";
import { productsList } from "@/model/dto/product";



export default function ProductClassify() {
  const [state,setState]=useState({
    selectedKey:0, //商品分类
    shaixuan:0, // 排序方式 0:all, 1:price, 2:time
    currentPage:1,
    pageSize:10,
    isSame:true, //和上一次更改是否为同一种类，默认为true
    isSort:false //是否是排序
  })
  const router = useRouter();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [productList, setProductList]=useState<productsInfo[]>([])
  const keyword = useSearchParams().get('keyword') || '';

  const loadMoreProducts = async (url:string)=> {
    // console.log("查询的url： ",url)
    return fetchAPI(url).then((data: APIResponse)=>{
      if(data.code===200){
        return data.data as productsList;
      }else{
        if (process.env.NODE_ENV === "development"){
        console.log('error:', data);
        }
        return null;
      }
    })
  };

  function handleNextPage(){
    // console.log("handleNextPage")
      setState({
        ...state,
        currentPage:state.currentPage+1,
        isSame:true,
        isSort:false
      })
  }

  // useEffect(()=>{
  //   console.log("keyword: ",keyword)
  // },[keyword])

  const { data, error, isLoading } = 
  useSWR(`/product-server/fuzzySearch?keyword=${keyword}&currentPage=${state.currentPage}&pageSize=${state.pageSize}`,
   loadMoreProducts,
   {
    dedupingInterval: 10*5000,  // 5秒内不会重复请求相同url
    staleTime: 1*60*1000,  // 数据缓存时间1分钟
   }
   )

   // TODO 因为data初始值会超发一次请求（第一次，data为undefined）
   useEffect(() => {
    // console.log("SDFsdfs: ",data)
    // 排除掉 data 初始为 undefined 的情况
    if (data === undefined) return;
  
    // 如果 data 为 null，说明没有数据返回，直接停止加载更多商品
    if (data === null) {
      setHasMore(false);
      setProductList([]);
      return;
    }
  // console.log("DSfdsfdsf:",data)
    const totalPages = Math.ceil(data.totalItems / state.pageSize); // 计算总页数
    const isLastPage = data.currentPage === totalPages; // 判断是否已经是最后一页
  
    // 设置 hasMore 标志
    const shouldHaveMore = !isLastPage;
  
    // 如果数据为空，清空商品列表并设置没有更多商品
    if (data.productList === null || data.productList.length === 0) {
      setHasMore(false);
      setProductList([]);
      return;
    }
  
    // 判断是否是同一种类
    if (state.isSame) {
      if (state.isSort) {
        // 排序情况下，直接设置新的商品列表
        setHasMore(shouldHaveMore);
        setProductList(data.productList);
      } else {
        // 非排序情况下，拼接新的商品列表
        setProductList((prev) => [...prev, ...data.productList]);
        setHasMore(shouldHaveMore);
      }
    } else {
      // 如果是不同分类，重置商品列表并更新
      setProductList(data.productList);
      setHasMore(shouldHaveMore);
    }
  }, [data]);

// 处理产品点击事件，发送消息
function handleProductClick(product:any) {
  window.open(`/productDetail/${product.id}`,'_blank');
}



  return (
    <div>
      <MainLayout>
        <div className="pl-[28px] pr-[28px]">
          {/* 面包屑导航 */}
          <div className="flex flex-row items-center w-full h-[46px] mt-[10px] pl-[10px]">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="text-[#282828] text-[14px] cursor-pointer"
              >
                首页
              </div>
              <div className="text-[#999] text-[14px]">{keyword}</div>
            </Breadcrumbs>
          </div>

{/* 商品展示 */}

{/* {isLoading ? <div>
  <Loading/>
</div>: */}
<div>
      <InfiniteScroll
        dataLength={productList?.length}
        // next={loadMoreProducts}
        next={handleNextPage}
        hasMore={hasMore}
        loader={<div className="text-center py-4">加载中...</div>}
        // loader={<div></div>}
        endMessage={<div className="text-center py-4">没有更多商品了！</div>}
      >
        <div className="flex flex-wrap w-full ">
          {productList?.map((product, index) => (
            <div key={index} className="flex-none w-[20%] h-[300px] p-2">
              <div onClick={()=>handleProductClick(product)} className="w-full h-full p-1 rounded-lg cursor-pointer border-[1px] border-transparent hover:border-[1px] hover:border-[#ff5050] box-border">
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
                  {/* 帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果
                  LUCE DI COLONIA克罗尼亚(香薰芯) */}
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


{/* } */}
        </div>
      </MainLayout>
    </div>
  );
}
