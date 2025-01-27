'use client'

import MainLayout from "@/layouts/mainLayout"
import { useRouter } from "next/navigation"
import { Breadcrumbs } from "@mui/material"
import BottomComponent from "@/components/bottom/bottomComponent"
import NewsListComponent from "@/components/newsList/newsListComponent"
import HotNewsComponent from "@/components/newsList/hotNewsComponent"



export default function NewsList(){
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
      <div className="text-[#999] text-[14px]">新闻列表</div>
    </Breadcrumbs>
</div>

{/* 新闻列表和热点资讯 */}
<div className="flex flex-row  h-[1000px]">

{/* 文章列表 */}
<div className="flex p-2 w-[70%] h-full  ">
    <NewsListComponent/>
</div>
{/* 热点资讯 */}
<div className="flex p-2 w-[30%] h-full">
    <HotNewsComponent/>
    </div>
    

</div>








<BottomComponent/>

            </div>

        
            </MainLayout>
            </div>

    )
}