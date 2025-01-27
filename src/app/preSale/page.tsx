'use client'

import MainLayout from "@/layouts/mainLayout"
import { useRouter } from "next/navigation"
import { Breadcrumbs } from "@mui/material"



export default function PreSale(){
    const router = useRouter()
    return (
        <div>
        <MainLayout>
        <div className="pl-[28px] pr-[28px]">
{/* 面包屑导航 */}
<div className="flex flex-row items-center bg-[#f5f5f5] w-full h-[46px] mt-[10px] pl-[10px]">
<Breadcrumbs separator="›" aria-label="breadcrumb">
<div onClick={() => {router.push("/")}} className="text-[#282828] text-[14px] cursor-pointer">
    首页
    </div>
      <div className="text-[#999] text-[14px]">限时预售</div>
    </Breadcrumbs>
</div>








            </div>

        
            </MainLayout>
            </div>

    )
}