"use client";

import React, { useState } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomComponent from "../bottom/bottomComponent";

interface ProductsProps {
  selectedKey: number;
}

const Products: React.FC<ProductsProps> = ({ selectedKey }) => {
  const [productList, setProductList] = useState<string[]>([
    "商品 1",
    "商品 2",
    "商品 3",
    "商品 4",
    "商品 5",
    "商品 6",
    "商品 7",
    "商品 8",
    "商品 9",
    "商品 10",
  ]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 模拟加载更多的商品数据
  const loadMoreProducts = () => {
    // 模拟网络请求，延时加载更多商品
    setTimeout(() => {
      setProductList((prev) => [
        ...prev,
        "商品 11",
        "商品 12",
        "商品 13",
        "商品 14",
        "商品 15",
        "商品 16",
        "商品 17",
        "商品 18",
        "商品 19",
        "商品 20",
      ]);

      // 如果商品数超过一定数量，停止加载
      if (productList.length >= 30) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={productList.length}
        next={loadMoreProducts}
        hasMore={hasMore}
        loader={<div className="text-center py-4">加载中...</div>}
        endMessage={<div className="text-center py-4">没有更多商品了！</div>}
      >
        <div className="flex flex-wrap w-full ">
          {productList.map((product, index) => (
            <div key={index} className="flex-none w-[20%] h-[300px] p-2">
              <div className="w-full h-full p-1 rounded-lg cursor-pointer border-[1px] border-transparent hover:border-[1px] hover:border-[#ff5050] box-border">
                <div className="w-full h-[180px] rounded-lg relative">
                  <Image
                    src="/images/test.jpg"
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-[5px] text-[16px] font-medium text-[#282828] font-custom line-clamp-1">
                  帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果
                  LUCE DI COLONIA克罗尼亚(香薰芯)
                </div>
                <div className="mt-[2px] text-[#ff5000] font-custom text-[14px]">
                  包邮
                </div>
                <div className="flex flex-row items-center">
                  <div className="text-[20px] font-custom2 text-[#ff5000] font-bold">
                    &yen;179.99
                  </div>
                  <div className="ml-[8px] mt-[5px] text-[14px] text-[#7a7a7a] font-custom2">
                    999+人购买
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
