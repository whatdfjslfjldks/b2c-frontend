"use client";

import MainLayout from "@/layouts/mainLayout";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import BottomComponent from "@/components/bottom/bottomComponent";
import productList from "@/components/homePage/productList";
import InfiniteScroll from "react-infinite-scroll-component";

const menu = [
  { id: 1, label: "未开始" },
  { id: 2, label: "正在进行" },
  { id: 3, label: "已结束" },
];

export default function PreSale() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(1);
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
          <div className="flex flex-row items-center  w-full h-[46px] mt-[10px] pl-[10px]">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="text-[#282828] text-[14px] cursor-pointer"
              >
                首页
              </div>
              <div className="text-[#999] text-[14px]">限时预售</div>
            </Breadcrumbs>
          </div>

          {/* 限时预售图片 */}
          <div className="flex flex-row justify-center items-center w-full h-[128px] bg-[url('/images/seckill-back.png')]">
            <Image
              src="/images/presell.png"
              alt="pic"
              width={200}
              height={48}
            />
          </div>

          {/* 未开始，正在进行，结束 */}
          <div className="flex flex-row w-full h-[80px]">
            {/* 未开始 */}
            <div
              onClick={() => setSelectedMenu(1)}
              className={`flex flex-row cursor-pointer justify-center items-center w-[300px] h-[80px] bg-no-repeat ${
                selectedMenu === 1
                  ? 'bg-[url("/images/seckill-slide-back.png")]'
                  : ""
              }`}
            >
              <div
                className={`flex justify-center ml-[26px] text-[24px] ${
                  selectedMenu === 1 ? "text-[#fff]" : "text-[#282828]"
                } font-bold w-[100px] h-[60px] bg-no-repeat bg-[url('/images/seckill-slide-clock.png')]`}
              >
                <div className="mt-[12px] ml-[-35px]">未开始</div>
              </div>
            </div>
            {/* 正在进行 */}
            <div
              onClick={() => setSelectedMenu(2)}
              className={`flex flex-row cursor-pointer  ml-[150px] justify-center items-center w-[300px] h-[80px] bg-no-repeat ${
                selectedMenu === 2
                  ? 'bg-[url("/images/seckill-slide-back.png")]'
                  : ""
              }`}
            >
              <div
                className={`flex justify-center ml-[26px] text-[24px] ${
                  selectedMenu === 2 ? "text-[#fff]" : "text-[#282828]"
                } font-bold w-[100px] h-[60px] bg-no-repeat bg-[url('/images/seckill-slide-clock.png')]`}
              >
                <div className="mt-[12px] ml-[-35px]">正在进行</div>
              </div>
            </div>
            {/* 结束 */}
            <div
              onClick={() => setSelectedMenu(3)}
              className={`flex flex-row cursor-pointer  ml-[150px]  justify-center items-center w-[300px] h-[80px] bg-no-repeat ${
                selectedMenu === 3
                  ? 'bg-[url("/images/seckill-slide-back.png")]'
                  : ""
              } `}
            >
              <div
                className={`flex justify-center ml-[26px] text-[24px] ${
                  selectedMenu === 3 ? "text-[#fff]" : "text-[#282828]"
                } font-bold w-[100px] h-[60px] bg-no-repeat bg-[url('/images/seckill-slide-clock.png')]`}
              >
                <div className="mt-[12px] ml-[-35px]">结束</div>
              </div>
            </div>
          </div>

{/* 商品列表 */}

<div>
            <InfiniteScroll
              dataLength={productList.length}
              next={loadMoreProducts}
              hasMore={hasMore}
              loader={<div className="text-center py-4">加载中...</div>}
              endMessage={
                <div className="text-center py-4">没有更多商品了！</div>
              }
            >
              <div className="flex flex-wrap w-full ">
                {productList.map((product, index) => (
                  <div key={index} className="flex-none w-[25%] h-[400px] p-2">
                    <div className="w-full h-full p-1 rounded-lg cursor-pointer hover:shadow-lg box-border">
                      <div className="w-full h-[240px] rounded-lg relative">
                        <Image
                          src="/images/test.jpg"
                          alt="product"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="mt-[5px] text-[16px] font-medium text-[#282828] font-custom line-clamp-2">
                        帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂
                        无花果 LUCE DI COLONIA克罗尼亚(香薰芯)
                      </div>

                      <div className="flex flex-row mt-[10px]">
                        <div className="flex flex-col">
                          <div className="flex flex-row items-center">
                            <div className="text-[22px] font-custom2 text-[#ff5000] font-bold">
                              &yen;179.99
                            </div>
                            <div className="ml-[8px] mt-[5px] text-[12px] text-[#969696] line-through font-custom2">
                              &yen;280.00
                            </div>
                          </div>

                          {/* 购买人数进度条 */}
                          <div className="flex flex-row mt-[2px] items-center">
                            <div className="text-[12px] text-[#969696]">
                              已抢28%
                            </div>
                            {/* 进度条 */}
                            <div className="flex flex-row w-[80px] ml-[12px] h-[8px] bg-[#e2e2e2] rounded">
                              {/* 已抢购进度条 */}
                              <div className="w-[20px] h-[8px] bg-[#e93323] rounded"></div>
                            </div>
                          </div>
                        </div>

                        {/* 抢购中 */}
                        <div className="flex ml-auto mr-[5px] mt-[10px] text-[14px] rounded bg-[#e93323] justify-center items-center text-[#fff] w-[70px] h-[38px]">
                          抢购中
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
