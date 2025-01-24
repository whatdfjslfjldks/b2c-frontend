"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import BottomComponent from "@/components/bottom/bottomComponent";
import NavComponent from "@/components/header/navComponent";
import FloatMenuComponent from "@/components/float/floatMenuComponent";
import TopSectionComponent from "@/components/header/topSectionComponent";
import SliderComponent from "@/components/slider/sliderComponents";
import SecKillComponent from "@/components/secKill/secKillComponent";
export default function Home() {
  return (
    <div>
      <FloatMenuComponent />
      <NavComponent />
      {/* 内容区域 */}
      <div className="pl-[48px] pr-[48px]">
        {/* logo,搜索框，广告动画 */}
        <TopSectionComponent />
        {/* 轮播图 */} 
        <SliderComponent />
        {/* 限时秒杀 */}
        <SecKillComponent />
      </div>

      <BottomComponent />
    </div>
  );
}
