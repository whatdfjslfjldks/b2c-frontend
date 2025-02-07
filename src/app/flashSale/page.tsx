"use client";

import MainLayout from "@/layouts/mainLayout";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import BottomComponent from "@/components/bottom/bottomComponent";
import useSWR from "swr";
import { fetchAPI } from "@/api/fetchApi";
import { APIResponse } from "@/model/dto/fetchApiDTO";
import { productsInfo } from "@/model/vo/productInfoVO";
import { productsList } from "@/model/dto/product";



export default function FlashSale() {
  const [state,setState]=useState({
    currentPage:1,
    pageSize:8,
    sessionId:1
  });
  const [productList, setProductList] = useState<productsInfo[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const deadline = "2025-01-31T23:59:00+08:00";
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();

  const loadMoreProducts=async(url:string)=>{
   return  fetchAPI(url).then((data: APIResponse)=>{
            if(data.code===200){
        return data.data as productsList;
      }else{
        if (process.env.NODE_ENV === "development"){
        console.log('error:', data);
        }
        return null;
      }
    })
  }


  const { data, error, isLoading }=useSWR(
    `/product-server/getSecKillList?currentPage=${state.currentPage}&pageSize=${state.pageSize}&sessionId=${state.sessionId}`,
    loadMoreProducts,
    {
      dedupingInterval: 10*5000,  
staleTime: 1*60*1000,  
    }
  )

  useEffect(()=>{
    console.log("data: ",data)
    if (data === undefined) return;
  
    if (data === null) {
      setHasMore(false);
      setProductList([]);
      return;
    }

  
    const totalPages = Math.ceil(data.totalItems / state.pageSize); // 计算总页数
    const isLastPage = data.currentPage === totalPages; // 判断是否已经是最后一页
  
    // 设置 hasMore 标志
    const shouldHaveMore = !isLastPage;
  
    // 如果数据为空，清空商品列表并设置没有更多商品
    if (data.productList === null || data.productList.length === 0) {
      setHasMore(false);
      setProductList([]);
      return;
    }
        setHasMore(shouldHaveMore);
        setProductList((prev) => [...prev, ...data.productList]);
  },[data])

  
  function handleNextPage(){
    // console.log("handleNextPage")
      setState({
        ...state,
        currentPage:state.currentPage+1,
      })
  }
  useEffect(() => {
    const deadlineTime = moment(deadline).tz("Asia/Shanghai").valueOf();

    // 每秒更新剩余时间
    const timer = setInterval(() => {
      // 获取当前的北京时间
      const currentTime = moment().tz("Asia/Shanghai").valueOf();
      // 计算剩余时间
      const remainingTime = deadlineTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(timer); // 时间到达后停止定时器
        setTimeLeft(0);
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    // 清除定时器
    return () => clearInterval(timer);
  }, [deadline]);

  const formatTime = (milliseconds: any) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(remainingMinutes).padStart(2, "0"),
      seconds: String(remainingSeconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  function handleProductClick(product:any){
    window.open( `/productDetail/${product.id}`,'_blank')
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
              <div className="text-[#999] text-[14px]">限时秒杀</div>
            </Breadcrumbs>
          </div>

          {/* 限时秒杀图片 */}
          <div className="flex flex-row justify-center items-center w-full h-[128px] bg-[url('/images/seckill-back.png')]">
            <Image
            src="/images/seckill-title.png"
             alt="pic"
             width={200}
             height={48}
              />
          </div>
          {/* 倒计时 */}
          <div className="flex flex-row w-full h-[80px]">
            <div className="flex flex-row items-center bg-no-repeat w-[300px] h-[80px] bg-[url('/images/seckill-slide-back.png')]">
              {/* 闹钟图片 */}
              <div className="ml-[26px] text-[24px] text-[#fff] font-bold bg-no-repeat w-[61px] h-[60px] bg-[url('/images/seckill-slide-clock.png')]">
                <div className="mt-[12px]">00:00</div>
              </div>

              {/* 倒计时 */}
              <div className="flex flex-col ml-[25px] ">
                <div className="text-[14px] text-[#fff] font-custom">
                  距结束
                </div>
                {/* 倒计时数字 */}

                <div className="flex flex-row justify-center text-white mt-[8px]">
                  <div className="flex items-center bg-black p-[5px] w-[28px] h-[28px] text-white font-bold">
                    {hours}
                  </div>
                  <div className="text-white text-[16px] ml-[5px] mr-[5px]">
                    :
                  </div>
                  <div className="flex items-center bg-black p-[5px] w-[28px] h-[28px] text-white font-bold">
                    {minutes}
                  </div>
                  <div className="text-white text-[16px] ml-[5px] mr-[5px]">
                    :
                  </div>
                  <div className="flex items-center bg-black p-[5px] w-[28px] h-[28px] text-white font-bold">
                    {seconds}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 秒杀商品列表 */}
          <div>
            <InfiniteScroll
              dataLength={productList.length}
              next={handleNextPage}
              hasMore={hasMore}
              loader={<div className="text-center py-4">加载中...</div>}
              endMessage={
                <div className="text-center py-4">没有更多商品了！</div>
              }
            >
              <div className="flex flex-wrap w-full ">
                {productList?.map((product, index) => (
                  <div onClick={()=>handleProductClick(product)} key={index} className="flex-none w-[25%] h-[390px] p-2">
                    <div className="w-full h-full p-1 rounded-lg cursor-pointer hover:shadow-lg box-border">
                      <div className="w-full h-[240px] rounded-lg relative">
                        {/* <Image
                          src="/images/test.jpg"
                          alt="product"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        /> */}
                {product.pImg && product.pImg.length > 0 && product.pImg[0]?.img_url ? (
                <Image
                    src={`http://localhost:9000/${product.pImg[0]?.img_url}`}
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            ) : (
                <Image
                    src="/images/test.jpg" 
                    alt="Default Product Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            )}
                      </div>
                      <div className="mt-[5px] text-[16px] font-medium text-[#282828] font-custom line-clamp-2">
                        {product.name}
                        {/* 帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂
                        无花果 LUCE DI COLONIA克罗尼亚(香薰芯) */}
                      </div>

                      <div className="flex flex-row mt-[10px]">
                        <div className="flex flex-col">
                          <div className="flex flex-row items-center">
                            <div className="text-[22px] font-custom2 text-[#ff5000] font-bold">
                              &yen;{product?.price ? `${product?.price}`:0 }
                            </div>
                            <div className="ml-[8px] mt-[5px] text-[12px] text-[#969696] line-through font-custom2">
                              &yen;{product?.original_price? `${product?.original_price}`:0}
                            </div>
                          </div>

                          {/* 购买人数进度条 */}
                          <div className="flex flex-row mt-[2px] items-center">
  <div className="text-[12px] text-[#969696]">
    已抢{product?.sold && product.stock ?(((product.sold / product.stock) * 100).toFixed(0)):0  }%
  </div>
  {/* 进度条 */}
  <div className="flex flex-row w-[80px] ml-[12px] h-[8px] bg-[#e2e2e2] rounded">
    {/* 已抢购进度条，动态计算宽度 */}
    <div
      className={`h-[8px] bg-[#e93323] rounded`}
      style={{ width: `${(product.sold/product.stock)*80}px` }}
    ></div>
  </div>
</div>

                        </div>

                        {/* 抢购中 */}
                        <div className="flex ml-auto mr-[5px] mt-[10px] text-[14px] rounded bg-[#e93323] justify-center items-center text-[#fff] w-[70px] h-[38px]">
                          抢购中
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
            <BottomComponent />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
