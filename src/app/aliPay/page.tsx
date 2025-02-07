'use client'

import BottomComponent from "@/components/bottom/bottomComponent"
import MainLayout from "@/layouts/mainLayout"
import { Breadcrumbs } from "@mui/material"
import { useSearchParams,useRouter } from "next/navigation"
import Image from "next/image"
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export default function AliPay(){
    const router=useRouter()
    const orderId=useSearchParams().get("orderId")
    const totalPrice=useSearchParams().get("totalPrice")

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
              <div className="text-[#999] text-[14px]">订单号: {orderId}</div>
            </Breadcrumbs>
          </div>

          <div className="flex flex-row p-[30px]">
            <div className="text-[20px] text-[#282828] font-custom">
                支付宝支付
            </div>
            <div className="flex flex-row items-center ml-[auto]">
                <div className="text-[14px] text-[#969696]">
                    应付金额: 
                </div>
                <div className="text-[22px] ml-[5px] text-[#e93323] font-bold">
                    {totalPrice}
                </div>
                <div className="text-[14px] text-[#969696]">
                   元 
                </div>

            </div>
          </div>


          <div className="flex flex-row w-full pl-[200px] pr-[200px]">
            {/* 二维码图片 */}
            <div className="flex flex-col">
                <div className="w-[300px] h-[300px] border border-[#282828]">

                </div>
                <div className="flex flex-row items-center mt-[10px] h-[100px] bg-[#1676ff]">
                    <div className="ml-[30px] w-[60px] h-[60px] relative">
                            <QrCodeScannerIcon sx={{
                                color: "#fff",
                                fontSize: 60
                            }}/>
                    </div>
                    <div className="flex flex-col ml-[40px]">
                        <div className="text-[16px] text-[#fff]">
                            请使用支付宝扫一扫
                        </div>
                        <div className="mt-[4px] text-[16px] text-[#fff]">
                            扫描二维码支付
                        </div>

                    </div>
                </div>
            </div>
            {/* 操作指南图片 */}
            <div className="ml-[80px]">

<Image
src="/images/aliPayExample.png"
alt="pic"
width={280}
height={200}
/>

            </div>

          </div>

          <div className="mt-[70px] pl-[30px]">
            <div
            onClick={() => router.back()}
             className="text-[18px] text-[#236fe9] cursor-pointer">
               {'<'}&nbsp;&nbsp; 选择其他支付方式
            </div>
          </div>

          
    
          </div>

          <BottomComponent/>
            </MainLayout>
            </div>
    )
}