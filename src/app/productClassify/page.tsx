"use client";

import MainLayout from "@/layouts/mainLayout";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomComponent from "@/components/bottom/bottomComponent";

const menuItems = [
  { id: 1, label: "运动户外" },
  { id: 2, label: "馋嘴零食" },
  { id: 3, label: "潮电数码" },
  { id: 4, label: "服饰时尚" },
  { id: 5, label: "家装建材" },
  { id: 6, label: "办公文具" },
  { id: 7, label: "家居生活" },
  { id: 8, label: "健康美容" },
  { id: 9, label: "母婴用品" },
  { id: 10, label: "书籍音像" },
];

const shuaixuan = [
  { id: 1, label: "默认" },
  { id: 2, label: "价格" },
  { id: 3, label: "上架时间" },
];

export default function ProductClassify() {
  const [selectedKey, setSelectedKey] = useState<number | null>(1);
  const [shuaixuan, setShuaixuan] = useState<number | null>(1);
  const router = useRouter();




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
      <MainLayout>
        <div className="pl-[28px] pr-[28px]">
          {/* 面包屑导航 */}
          <div className="flex flex-row items-center bg-[#f5f5f5] w-full h-[46px] mt-[10px] pl-[10px]">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="text-[#282828] text-[14px] cursor-pointer"
              >
                首页
              </div>
              <div className="text-[#999] text-[14px]">产品详情</div>
            </Breadcrumbs>
          </div>

          {/* 商品分类导航栏 */}
          <div className="flex flex-row items-center bg-[#f5f5f5] w-full h-[50px] mt-[10px] pl-[10px]">
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedKey(item.id)}
                className={`flex flex-row mr-[32px] cursor-pointer items-center justify-center w-[60px] h-[35px] ${
                  selectedKey === item.id ? "shadow-[0_2px_0_0_#e93323]" : ""
                }`}
              >
                <div
                  className={`text-[14px] hover:text-[#e93323]  ${
                    selectedKey === item.id
                      ? "font-custom text-[#e93323] "
                      : "text-[#282828]"
                  }`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* 排序 */}
          <div className="flex flex-row  items-center bg-[#f5f5f5] w-full h-[40px] mt-[5px] pl-[10px]">
            <div className="text-[#969696] text-[14px] font-custom">排序：</div>
            <div
              onClick={() => setShuaixuan(1)}
              className={`cursor-pointer hover:text-[#e93323] text-[14px] font-custom ml-[10px] ${
                shuaixuan === 1 ? " text-[#e93323]" : "text-[#282828]"
              }`}
            >
              默认
            </div>

            <div
              onClick={() => setShuaixuan(2)}
              className={`cursor-pointer hover:text-[#e93323] text-[14px] font-custom ml-[20px] ${
                shuaixuan === 2 ? "text-[#e93323]" : "text-[#282828]"
              }`}
            >
              价格
            </div>

            <div
              onClick={() => setShuaixuan(3)}
              className={`cursor-pointer hover:text-[#e93323]  text-[14px] font-custom ml-[20px] ${
                shuaixuan === 3 ? " text-[#e93323]" : "text-[#282828]"
              }`}
            >
              上架时间
            </div>
          </div>

{/* 商品展示 */}

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


        </div>
      </MainLayout>
    </div>
  );
}
