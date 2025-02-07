"use client";

import MainLayout from "@/layouts/mainLayout";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@mui/material";
import BottomComponent from "@/components/bottom/bottomComponent";

export default function AboutUs() {
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
              <div className="text-[#999] text-[14px]">关于我们</div>
            </Breadcrumbs>
          </div>

{/* 关于我们banner */}
          <div
            className="flex justify-center items-center bg-no-repeat w-full h-[230px] bg-[url('/images/aboutus.png')]"
            style={{
              backgroundSize: "100% 100%",
            }}
          >
            <div
              style={{
                backgroundSize: "100% 100%",
              }}
              className="flex flex-col items-center bg-no-repeat justify-center w-[520px] h-[80px] bg-[url('/images/about-us-bg.png')]"
            >
              <div className="text-[#fff] text-[30px] font-semibold mb-[10px]">
                关于我们
              </div>
              <div className="text-[#fff] text-[15px] font-normal">
                通过相关信息，了解我们更全面的我们
              </div>
            </div>
          </div>

          <div className="mt-[20px] w-full h-[200px]">
            详细介绍
          </div>

          <BottomComponent/>
        </div>
      </MainLayout>
    </div>
  );
}
