"use client";

import { useState } from "react";
import Image from "next/image";

const menu = [
  { id: 1, label: "全部" },
  { id: 2, label: "购物心得" },
  { id: 3, label: "消费文化" },
  { id: 4, label: "品牌资讯" },
];

export default function NewsListComponent() {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(1);

  return (
    <div className="flex flex-col w-full h-full">
      {/* 文章类型筛选 */}
      <div className="flex flex-row font-custom text-[16px] text-[#282828] items-center w-full h-[70px]">
        <div
          onClick={() => setSelectedMenu(1)}
          className={`flex flex-row  font-custom text-[16px] text-[#282828] items-center cursor-pointer hover:text-[#e93323] ${
            selectedMenu === 1 ? "text-[#e93323]" : ""
          }`}
        >
          全部
        </div>
        <div
          onClick={() => setSelectedMenu(2)}
          className={`flex flex-row ml-[50px]  font-custom text-[16px] text-[#282828] items-center cursor-pointer hover:text-[#e93323] ${
            selectedMenu === 2 ? "text-[#e93323]" : ""
          }`}
        >
          购物心得
        </div>
        <div
          onClick={() => setSelectedMenu(3)}
          className={`flex flex-row ml-[50px]  font-custom text-[16px] text-[#282828] items-center cursor-pointer hover:text-[#e93323] ${
            selectedMenu === 3 ? "text-[#e93323]" : ""
          }`}
        >
          消费文化
        </div>
        <div
          onClick={() => setSelectedMenu(4)}
          className={`flex flex-row ml-[50px]  font-custom text-[16px] text-[#282828] items-center cursor-pointer hover:text-[#e93323] ${
            selectedMenu === 4 ? "text-[#e93323]" : ""
          }`}
        >
          品牌资讯
        </div>
      </div>

{/* 分页文章列表 */}
<div className="flex flex-col h-[calc(100%-70px)] w-full">

<div className="flex flex-row cursor-pointer w-full h-[20%] ">

<div className="w-[200px] h-full">
    <Image
    src="/images/go.jpg"
    alt="this is a image"
    width={200} 
    height={200} 
    style={{ objectFit: "cover", width: "100%", height: "100%" }} 
    priority
  />
    </div>

    <div className="flex flex-col w-[calc(100%-200px)] h-full p-5">
        <div className="text-[#333] text-[16px] font-custom line-clamp-1">
        秦安麦秆编——田野绽放艺术之花
        </div>

        <div className="flex flex-row items-center mt-[100px]">
{/* 发布时间 */}
<div><img src="/images/clock.png" alt="pic"width={20} height={20} /></div>

<div className="ml-[6px] text-[#999] text-[14px] font-custom">2025-01-22 11:08</div>
       
       {/* 浏览量 */}
       <div className="ml-[30px]"><img src="/images/eye.png" alt="pic"width={20} height={20} /></div>

<div className="ml-[6px] text-[#999] text-[14px] font-custom">999</div>
       
        </div>


    </div>


</div>



</div>

    </div>
  );
}
