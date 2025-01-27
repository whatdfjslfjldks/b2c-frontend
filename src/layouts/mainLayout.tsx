'use client'

import FloatMenuComponent from "@/components/float/floatMenuComponent"
import NavComponent from "@/components/header/navComponent"
import TopSectionComponent from "@/components/header/topSectionComponent"


export default function MainLayout(props: { children: React.ReactNode }) {
    return (
        <div> 

<FloatMenuComponent />
      <NavComponent />
      {/* 内容区域 */}
      <div className="pl-[28px] pr-[28px]">
        {/* logo,搜索框，广告动画 */}
        <TopSectionComponent />
            </div>
            {props.children}
        </div>
    )
}