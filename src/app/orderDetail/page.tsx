'use client'
import React, { useEffect, useState } from 'react';
import { Steps, message, Card, Row, Col, Button, Skeleton, Spin, Divider } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, TruckOutlined, CheckCircleOutlined, StarOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/layouts/mainLayout';
import BottomComponent from '@/components/bottom/bottomComponent';
import { Breadcrumbs } from '@mui/material';
import { paymentMethodDescriptions, paymentStatusDescriptions, statusDescriptions } from '@/model/enum/enum';
import { fetchAPI } from '@/api/fetchApi';
import { getAccessToken } from '@/api/token';

export default function OrderDetail() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [productInfo, setProductInfo] = useState<any[]>([]);

  const orderId = useSearchParams().get("orderId");

  const { Step } = Steps;
  const steps = [
    { title: '待付款', icon: <HomeOutlined /> },
    { title: '待发货', icon: <ShoppingCartOutlined /> },
    { title: '待收货', icon: <TruckOutlined /> },
    { title: '待评价', icon: <StarOutlined /> },
    { title: '已完成', icon: <CheckCircleOutlined /> },
  ];

  useEffect(() => {
    setLoaded(false);
    fetchAPI("/order-server/getOrderDetail", {
      method: "POST",
      headers: {
        'Access-Token': getAccessToken() ?? ''
      },
      body: JSON.stringify({
        order_id: orderId
      })
    })
      .then((data) => {
        if (data.code === 200) {
          setCurrent(data.data.orderStatus);
          setOrderInfo({
            orderId: data.data.orderId,
            orderDate: data.data.orderDate,
            paymentStatus: data.data.paymentStatus,
            paymentMethod: data.data.paymentMethod,
            totalPrice: data.data.paymentPrice
          });
          setShippingInfo({
            name: data.data.name,
            phone: data.data.phone,
            address: data.data.address,
            detail: data.data.detail
          });

          // 合并商品信息
          const combinedProductInfo = data.data.productAmount.map((amount: number, index: number) => ({
            productId: data.data.productId[index],
            typeName: data.data.typeName[index],
            productAmount: amount
          }));
          setProductInfo(combinedProductInfo);

        } else {
          message.error(data.msg);
        }
        setLoaded(true);
      })
      .catch(() => {
        message.error("订单信息加载失败");
        setLoaded(true);
      });
  }, [orderId]);

  return (
    <div>
      <MainLayout>
        <div className="px-[30px] pb-[30px]">
          {/* 面包屑导航 */}
          <div className="flex flex-row items-center w-full h-[46px] mt-[20px] pl-[10px]">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <div
                onClick={() => router.push("/")}
                className="text-[#282828] text-[16px] cursor-pointer"
              >
                首页
              </div>
              <div className="text-[#999] text-[16px]">订单详情</div>
            </Breadcrumbs>
          </div>

          <div className="text-[22px] text-[#282828] p-2 mt-[30px] font-custom">
            订单状态:&nbsp;&nbsp;{statusDescriptions[current!]}
          </div>

          {/* 步骤条 */}
          <div className="mt-[20px] mx-[30px] h-[20px]">
            {loaded ? (
              <Steps current={current!} size="default" responsive>
                {steps.map((item, index) => (
                  <Step key={index} title={item.title} icon={item.icon} />
                ))}
              </Steps>
            ) : (
              <Spin size="large" />
            )}
          </div>

          <Divider className="mt-[30px]" />

          {/* 订单信息卡片 */}
          <Card
            title="订单信息"
            className="mt-[20px] h-[180px] shadow-lg rounded-lg"
            bordered={true}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Skeleton loading={!loaded} active>
                  <div><strong>订单编号：</strong>{orderInfo?.orderId}</div>
                  <div><strong>订单日期：</strong>{orderInfo?.orderDate}</div>
                  <div><strong>支付状态：</strong>{paymentStatusDescriptions[orderInfo?.paymentStatus]}</div>
                </Skeleton>
              </Col>
              <Col span={12}>
                <Skeleton loading={!loaded} active>
                  <div><strong>支付方式：</strong>{paymentMethodDescriptions[orderInfo?.paymentMethod]}</div>
                  <div><strong>订单金额：</strong>{orderInfo?.totalPrice}</div>
                </Skeleton>
              </Col>
            </Row>
          </Card>

          {/* 收货信息卡片 */}
          <Card
            title="收货信息"
            className="mt-[20px] h-[150px] shadow-lg rounded-lg"
            bordered={true}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Skeleton loading={!loaded} active>
                  <div><strong>收货人：</strong>{shippingInfo?.name}</div>
                  <div><strong>联系电话：</strong>{shippingInfo?.phone}</div>
                </Skeleton>
              </Col>
              <Col span={12}>
                <Skeleton loading={!loaded} active>
                  <div><strong>收货地址：</strong>{shippingInfo?.address}&nbsp;&nbsp;{shippingInfo?.detail}</div>
                </Skeleton>
              </Col>
            </Row>
          </Card>

          {/* 商品信息卡片 */}
          <Card
            title="商品信息"
            className="mt-[20px] shadow-lg rounded-lg"
            bordered={true}
          >
            {productInfo?.map((product, index) => (
              <Row key={index} gutter={24} className="mb-[15px]">
                <Col span={8}>
                  <Skeleton loading={!loaded} active>
                    <div><strong>商品类型：</strong>{product.typeName}</div>
                  </Skeleton>
                </Col>
                <Col span={8}>
                  <Skeleton loading={!loaded} active>
                    <div><strong>数量：</strong>{product.productAmount}</div>
                  </Skeleton>
                </Col>
                <Col span={8}>
                  <Skeleton loading={!loaded} active>
                    <div><strong>商品ID：</strong>{product.productId}</div>
                  </Skeleton>
                </Col>
              </Row>
            ))}
          </Card>

          <BottomComponent />
        </div>
      </MainLayout>
    </div>
  );
}
