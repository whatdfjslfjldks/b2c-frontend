"use client";

import BottomComponent from "@/components/bottom/bottomComponent";
import MainLayout from "@/layouts/mainLayout";
import { Breadcrumbs, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Cascader, Input, Modal, message } from "antd";
import { labelCities } from "@/model/data";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getCartFromLocalStorage } from "@/middleware/redux/cartSlice";
import { fetchAPI } from "@/api/fetchApi";
import { getAccessToken } from "@/api/token";

type selectedAddr = {
  name: string;
  phone: string;
  address: string;
  detail: string;
};

interface Cart {
  productList: product[];
}
interface product {
  id: number;
  name: string;
  cover: string; // 封面，选列表第一个
  price: number; // 单价
  amount: number; // 购买数量
}

export default function OrderConfirm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<selectedAddr>();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string[]>([]);
  const [detail, setDetail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [loadState, setLoadState] = useState({
    isLoading: true,
    isEmpty: false, // 购物车内无商品
  });
  const { TextArea } = Input;
  const [cartItems, setCartItems] = useState<Cart | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [submitLoad, setSubmitLoad] = useState<boolean>(false);

  useEffect(() => {
    const productIdsStr = searchParams.get("productIds");
    const amountsStr = searchParams.get("amounts");
    if (!productIdsStr || !amountsStr) {
      router.push("/not-found");
      return;
    }
    // 将字符串按逗号分割成数组
    const productIds = productIdsStr.split(",");
    const amounts = amountsStr.split(",");
    if (productIds.length !== amounts.length) {
      router.push("/not-found");
      return;
    }
    // 检查数组中的每个元素是否都是有效的数字
    const isValidProductIds = productIds.every((id) => !isNaN(Number(id)));
    const isValidAmounts = amounts.every((amount) => !isNaN(Number(amount)));
    if (!isValidProductIds || !isValidAmounts) {
      router.push("/not-found");
      return;
    }
    const numericProductIds = productIds.map(Number);
    const numericAmounts = amounts.map(Number);

    fetchAPI("/product-server/getOrderConfirmProduct", {
      method: "POST",
      body: JSON.stringify({
        product_id: numericProductIds,
      }),
    }).then((data) => {
      if(data.code===200){
        const products: product[] = data.data.products.map(
          (item: any, index: number) => ({
            id: item.id,
            name: item.name,
            cover: item.cover,
            price: item.price,
            amount: numericAmounts[index], // 设置购买数量
          })
        );
        // 更新 cartItems 状态
        setCartItems({
          productList: products,
        });
        setTotalPrice(calculateTotal(products));
      }else{
        message.error(data.msg)
      }
    });
  }, []);

  const calculateTotal = (products: product[]) => {
    return products.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  };

  const handleSubmitOrder = () => {
    setSubmitLoad(true);
    if (!cartItems || !selectedAddress) {
      message.error("请选择收货地址和商品");
      setSubmitLoad(false);
      return;
    }
    fetchAPI("/order-server/createOrder", {
      method: "POST",
      headers: {
        "Access-Token": getAccessToken() ?? "",
      },
      body: JSON.stringify({
        address: selectedAddress.address,
        detail: selectedAddress.detail,
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        note: note,
        orderItems: cartItems,
      }),
    }).then((data) => {
      if (data.code === 200) {
        router.push(
          `/payment?orderId=${data.data.orderId}&totalPrice=${totalPrice}&address=${selectedAddress.address}&detail=${selectedAddress.detail}&note=${note}`
        );
      } else {
        message.error(data.msg);
      }
      setSubmitLoad(false);
    });
  };

  const handleSelectAddress = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (!name || !address || !detail || !phone) {
      message.error("请填写完整地址信息");
      return;
    }
    // 保存地址信息
    const fullAddress = {
      name,
      phone,
      address: address.join(","),
      detail,
    };
    setSelectedAddress(fullAddress);
    clearModal();
    setOpen(false);
  };

  const handleCancel = () => {
    clearModal();
    setOpen(false);
  };

  const clearModal = () => {
    setAddress([]);
    setPhone("");
    setName("");
    setDetail("");
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };
  const handleNoteChange = (e: any) => {
    setNote(e.target.value);
  };

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
              <div className="text-[#999] text-[14px]">提交订单</div>
            </Breadcrumbs>
          </div>

          <div className="pl-[10px] pr-[10px]">
            {/* 收货地址 */}
            <div className="text-[18px] text-[#282828] font-custom">
              收货地址
            </div>
            <div className="w-[100%] mt-[5px] h-[5px] relative">
              <Image src="/images/tiao.png" fill={true} alt="tiao" />
            </div>
            <div className="mt-[20px] p-[20px]">
              {selectedAddress ? (
                <div
                  onClick={handleSelectAddress}
                  className="relative flex flex-col justify-center items-center w-[250px] h-[170px] border-2 border-[#e93323] cursor-pointer"
                >
                  <div className="text-[16px] text-[#282828] font-bold">
                    {selectedAddress.name} ({selectedAddress.phone})
                  </div>
                  <div className="text-[16px] text-[#282828]">
                    {selectedAddress.address}
                  </div>
                  <div className="text-[16px] text-[#282828]">
                    {selectedAddress.detail}
                  </div>
                  <div className="absolute bottom-0 right-1 text-[#e93323]">
                    <CheckCircleOutlined />
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleSelectAddress}
                  className="flex flex-col cursor-pointer justify-center items-center w-[250px] h-[170px] border border-[#eaeaea]"
                >
                  <AddIcon fontSize="large" />
                  <div className="text-[14px] text-[#c8c8c8]">选择收货地址</div>
                </div>
              )}
            </div>

            {/* 订单信息 */}
            <div className="text-[18px] mt-[20px] text-[#282828] font-custom">
              订单信息
            </div>
            <div className="flex flex-col mt-[10px] p-[30px] border border-[#efefef] w-full">
              {cartItems?.productList.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center w-full h-[90px] mb-[10px] border-b  border-[#efefef]"
                >
                  <div className="w-[60px] h-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${item.cover}`}
                      alt="pic"
                      width={60}
                      height={50}
                    />
                  </div>
                  <div className="flex flex-col justify-center w-[350px] ml-[20px]">
                    <div className="text-[#333333] text-[16px] line-clamp-2">
                      {item.name}
                    </div>
                    {/* <div className="text-[#919191] text-[16px] line-clamp-1">
                      {item.type_name}
                    </div> */}
                  </div>
                  <div className="flex flex-row items-center ml-auto text-[16px] text-[#282828]">
                    <div>&yen;{item.price}</div>
                    <div className="text-[14px] ml-[4px] mt-[2px] text-[#282828]">
                      &#215;{item.amount}
                    </div>
                    <div className="text-[18px] w-[100px] ml-[100px] text-[#e93323] font-bold">
                      &yen;{item.price * item.amount}
                    </div>
                  </div>
                </div>
              ))}

              {/* 买家留言 */}
              <div className="flex flex-row w-full h-[80px]">
                <div className="text-[18px] w-[100px] mt-[20px] text-[#282828] font-custom">
                  买家留言
                </div>
                <div className="ml-[50px] mt-[20px] w-[calc(100%-300px)] h-full">
                  <TextArea
                    value={note}
                    onChange={handleNoteChange}
                    className="w-full h-full bg-[#f7f7f7]"
                    placeholder="填写内容与商家协商并确认，限150字内~"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center mt-[20px] h-[70px] bg-[#f7f7f7]">
              <div className="ml-auto">应付总额：</div>
              <div className="text-[20px] ml-[10px] mr-[20px] text-[#e93323] font-bold">
                &yen;{totalPrice}
              </div>
            </div>

            {/* 提交订单按钮 */}
            <div className="flex flex-row">
              <Button
                sx={{
                  marginLeft: "auto",
                  marginTop: "20px",
                  width: "180px",
                }}
                variant="contained"
                color="primary"
                onClick={handleSubmitOrder}
                disabled={submitLoad}
              >
                {submitLoad ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress
                      color="primary"
                      size={24}
                      sx={{ marginRight: 2 }}
                    />
                    订单处理中
                  </Box>
                ) : (
                  "提交订单"
                )}
              </Button>
            </div>
          </div>
        </div>

        <BottomComponent />

        {/* 收货地址弹窗 */}
        <Modal
          title="添加收货地址"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <div className="flex flex-row gap-2">
            <Input
              value={name}
              onChange={handleNameChange}
              placeholder="姓名"
            />
            <Input
              value={phone}
              onChange={handlePhoneChange}
              placeholder="手机号"
            />
          </div>

          <div className="mt-[20px]">
            <Cascader
              className="w-full"
              options={labelCities}
              value={address}
              onChange={(value) => setAddress(value)}
              placeholder="请选择省/市/区"
            />
          </div>
          <div className="mt-[20px]">
            <TextArea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="详细地址"
            />
          </div>
        </Modal>
      </MainLayout>
    </div>
  );
}
