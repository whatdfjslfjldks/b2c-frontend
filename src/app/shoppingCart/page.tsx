'use client'

import BottomComponent from "@/components/bottom/bottomComponent";
import MainLayout from "@/layouts/mainLayout"
import { Breadcrumbs } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CartTable = dynamic(() => import('@/components/shoppingCart/cartTable'), { ssr: false });

export default function ShoppingCart(){
    const router = useRouter();


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
              <div className="text-[#999] text-[14px]">购物车</div>
            </Breadcrumbs>
          </div>

          {/* 购物车列表 */}
          <CartTable/>
          </div>

          <BottomComponent/>
            </MainLayout>
            </div>
    )
}