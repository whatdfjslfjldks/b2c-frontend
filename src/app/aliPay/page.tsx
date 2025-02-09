"use client";

import BottomComponent from "@/components/bottom/bottomComponent";
import MainLayout from "@/layouts/mainLayout";
import { Box, Breadcrumbs, Button, CircularProgress, Tooltip } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/api/fetchApi";
import { message } from "antd";
import { QRCodeCanvas } from "qrcode.react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getUserFromLocalStorage } from "@/middleware/redux/userInfoSlice";

export default function AliPay() {
  const router = useRouter();
  const orderId = useSearchParams().get("orderId");
  const totalPrice = useSearchParams().get("totalPrice");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [pay,setPay]=useState<boolean>(false);

  useEffect(() => {
    if (!getUserFromLocalStorage()) {
      message.error("请先登录");
      return;
    }
    fetchAPI("/order-server/getAliPayQRCode", {
      method: "POST",
      body: JSON.stringify({
        order_id: orderId,
      }),
    }).then((data) => {
      if (data.code === 200) {
        setQrCode(data.data.qrCode);
      } else {
        message.error(data.msg);
      }
    });
  }, []);

  const handlePaySuccess=()=>{
    setPay(true);
    fetchAPI("/order-server/testPaySuccess", {
      method: "POST",
      body: JSON.stringify({
        order_id: orderId,
      }),
    },10*1000).then((data) => {
      if (data.code === 200) {
        message.success("支付成功");
        router.push(data.data.returnUrl);
      } else {
        message.error(data.msg);
      }
      setPay(false);
   });
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
              <div className="text-[#999] text-[14px]">订单号: {orderId}</div>
            </Breadcrumbs>
          </div>

          <div className="flex flex-row p-[30px]">
            <div className="text-[20px] text-[#282828] font-custom">
              支付宝支付
            </div>
            <Tooltip
           title="当前二维码为支付宝沙盒测试专用，无法用于正常支付。测试支付功能请点击右侧支付成功按钮👉。"
            placement="right"
            color="info"
            >
            <div className="cursor-pointer ml-[20px]">
            <ExclamationCircleOutlined />
            </div>
            </Tooltip>
            <div className="ml-[50px]">
              <Button
                          sx={{
                            width:"180px"
                        }}
              onClick={handlePaySuccess}
              variant="contained"
              color="primary"
              >
                         {pay ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress color="primary" size={24} sx={{ marginRight: 2 }} />
                      支付处理中
                    </Box>
                  ) : (
                    ' 支付成功'
                  )}
              </Button>
            </div>
            <div className="flex flex-row items-center ml-[auto]">
              <div className="text-[14px] text-[#969696]">应付金额:</div>
              <div className="text-[22px] ml-[5px] text-[#e93323] font-bold">
                {totalPrice}
              </div>
              <div className="text-[14px] text-[#969696]">元</div>
            </div>
          </div>

          <div className="flex flex-row w-full pl-[300px] pr-[200px]">
            {/* 二维码图片 */}
            <div className="flex flex-col">
              <div className="flex justify-center items-center w-[300px] h-[300px] border border-[#282828]">
                {qrCode && (
                  <QRCodeCanvas
                    value={qrCode}
                    size={286}
                    level={"Q"} // 纠错级别，二维码可能被损坏的纠错
                  />
                )}
              </div>
              <div className="flex flex-row items-center mt-[10px] h-[100px] bg-[#1676ff]">
                <div className="ml-[30px] w-[60px] h-[60px] relative">
                  <QrCodeScannerIcon
                    sx={{
                      color: "#fff",
                      fontSize: 60,
                    }}
                  />
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
              className="text-[18px] text-[#236fe9] cursor-pointer"
            >
              {"<"}&nbsp;&nbsp; 选择其他支付方式
            </div>
          </div>
        </div>

        <BottomComponent />
      </MainLayout>
    </div>
  );
}
