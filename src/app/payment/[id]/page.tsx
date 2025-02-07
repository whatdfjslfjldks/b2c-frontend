'use client'

import BottomComponent from "@/components/bottom/bottomComponent";
import MainLayout from "@/layouts/mainLayout";
import { Breadcrumbs } from "@mui/material";
import { useParams,useRouter } from "next/navigation";
import Image from "next/image";



export default function Payment() {
    const orderId = useParams().id;
    const router=useRouter();
    const totalPrice=50.00;

    const handleAliPayClick=()=>{
        router.push(`/aliPay?orderId=${orderId}&totalPrice=${totalPrice}`)
    }

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
              <div className="text-[#999] text-[14px]">确认订单</div>
            </Breadcrumbs>
          </div>

          <div
              style={{
                backgroundSize: "100% 100%",
              }}
           className="flex flex-col bg-[#fff] w-full h-[160px] bg-[url('/images/orderBg.png')] bg-no-repeat">
            <div className="text-[32px] pt-[55px] pl-[30px] text-[#fff]">
            订单提交成功！请尽快完成支付哦~
            </div>
            <div className="text-[14px] text-[#fff] mt-[12px] pl-[30px]">
                剩余时间： 00小时00分00秒
            </div>
          </div>
          {/* 订单信息 */}
          <div className="flex flex-col p-[30px]">
            <div className="text-[16px] text-[#282828]">
                订单编号: {orderId}
            </div>
            <div className="text-[16px] text-[#282828] mt-[12px]">
                订单价格: 50.00元
            </div>
            <div className="text-[16px] text-[#282828] mt-[12px] ">
                收货信息: 北京市 北京市 东城区
            </div>
            <div className="text-[16px] text-[#282828] mt-[12px] ">
                商品名称: 测试商品
            </div>
          </div>
          {/* 支付方式 */}
          <div className="pl-[30px] leading-10 p-2 text-[18px] text-[#282828] font-custom border-b border-[#cecece]">
            请选择支付方式
          </div>
          <div className="flex flex-row pt-[22px] pl-[30px]">
            {/* aliPay */}
            <div
            onClick={handleAliPayClick}
             className="flex flex-row cursor-pointer border border-[#d4d4d4] justify-center items-center w-[210px] h-[86px]">
                <div>
                    <Image
                    src="/images/alipay.png"
                    alt="aliPay"
                    width={50}
                    height={50}
                    />
                </div>
                <div className="text-[16px] text-[#4e4e4e]">
                支付宝支付
                    </div>
            </div>

          </div>

    
          </div>

          <BottomComponent/>
            </MainLayout>
            </div>
    )
}