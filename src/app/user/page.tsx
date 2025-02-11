"use client";

import { Layout, Breadcrumb, Menu, Avatar, Typography, message } from "antd";
import BottomComponent from "@/components/bottom/bottomComponent";
import MainLayout from "@/layouts/mainLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isLogin } from "@/middleware/redux/userInfoSlice";
import AccountMgt from "@/components/userCenter/accountMgt";
import { useSelector } from "react-redux";
import { RootState } from "@/middleware/redux/store";

const { Sider, Content } = Layout;

export default function User() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState(0);
  const [breadcrumb, setBreadcrumb] = useState(["首页", "个人中心"]);
  const [ok, setOk] = useState(false);
const [userInfo, setUserInfo] = useState<any | null>(null); // 明确指定类型
const { userInfo: reduxUserInfo } = useSelector((state: RootState) => state.user);

useEffect(() => {
  if (typeof window !== 'undefined') {
    setUserInfo(reduxUserInfo); 
  }
}, [reduxUserInfo]);

  useEffect(() => {
    if (!isLogin()) {
      message.error("请先登录");
      setOk(false);
      return;
    }
    changeBread()
    setOk(true);
  }, [searchParams]);

  const changeBread=()=>{
    const pageType = searchParams.get("page_type") || "0";
    setActivePage(parseInt(pageType));
    // 动态更新面包屑导航
    switch (pageType) {
      case "0":
        setBreadcrumb(["首页", "个人中心", "账号管理"]);
        break;
      case "1":
        setBreadcrumb(["首页", "个人中心", "我的订单"]);
        break;
      case "2":
        setBreadcrumb(["首页", "个人中心", "站内信"]);
        break;
      case "3":
        setBreadcrumb(["首页", "个人中心", "我的优惠券"]);
        break;
      case "4":
        setBreadcrumb(["首页", "个人中心", "我的余额"]);
        break;
      case "5":
        setBreadcrumb(["首页", "个人中心", "我的收藏"]);
        break;
      case "6":
        setBreadcrumb(["首页", "个人中心", "地址管理"]);
        break;
      case "7":
        setBreadcrumb(["首页", "个人中心", "领取优惠券"]);
        break;
      default:
        setBreadcrumb(["首页", "个人中心"]);
    }
  }

  const handleNavigation = (pageType: number) => {
    router.push(`?page_type=${pageType}`);
    setActivePage(pageType);
  };

  const breadcrumbItems = breadcrumb.map((item, index) => ({
    title: item,
    key: index.toString(),
  }));

  return (
    <div>
      <MainLayout>
        <div className="pl-[28px] pr-[28px]">
          {/* 面包屑导航 */}
          <div className="flex flex-row items-center w-full h-[46px] mt-[10px] pl-[10px]">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <Layout className="min-h-screen p-[20px] mt-[10px]">
            <Sider width={240} className="bg-white h-[520px]"
            >
              <div className="p-5 text-center">
                <Avatar size={80} src={`${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${userInfo?.avatarUrl}`} />
                <Typography.Title level={5}>{userInfo?.username}</Typography.Title>
              </div>
              <Menu
                mode="inline"
                selectedKeys={[`${activePage}`]}
                onClick={({ key }) => handleNavigation(parseInt(key))}
                items={[
                  { key: "0", label: "账号管理" },
                  { key: "1", label: "我的订单" },
                  { key: "2", label: "站内信" },
                  { key: "3", label: "我的优惠券" },
                  { key: "4", label: "我的余额" },
                  { key: "5", label: "我的收藏" },
                  { key: "6", label: "地址管理" },
                  { key: "7", label: "领取优惠券" },
                ]}
                className="text-[16px] h-[440px] space-y-[10px] font-custom2 mt-[10px]" 
              />
            </Sider>
            <Layout className="ml-[10px] h-auto">
              <Content className="p-6 m-0 bg-white flex justify-center items-start">
                {/* 内容区展示 */}
                {ok ? (
                  <div className="w-full p-5">
                    {activePage === 0 && <div>
                       <AccountMgt/>
                        </div>}
                    {activePage === 1 && <div>这里展示我的订单内容</div>}
                    {activePage === 2 && <div>这里展示站内信内容</div>}
                    {activePage === 3 && <div>这里展示我的优惠券内容</div>}
                    {activePage === 4 && <div>这里展示我的余额内容</div>}
                    {activePage === 5 && <div>这里展示我的收藏内容</div>}
                    {activePage === 6 && <div>这里展示地址管理内容</div>}
                    {activePage === 7 && <div>这里展示领取优惠券内容</div>}
                  </div>
                ) : (
                  <div className="flex text-[48px] justify-center items-center h-full">
                    <p>请先登录</p>
                  </div>
                )}
              </Content>
            </Layout>
          </Layout>
          <BottomComponent />
        </div>
      </MainLayout>
    </div>
  );
}
