"use client";

import MainLayout from "@/layouts/mainLayout";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@mui/material";
import {useEffect, useState } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import BottomComponent from "@/components/bottom/bottomComponent";
import useSWR from 'swr'
import { fetchAPI } from "@/api/fetchApi";
import { APIResponse } from "@/types/dto/fetchApiDTO";
import { productsInfo } from "@/types/vo/productInfoVO";
import { menuItemsClassify } from "@/types/enum/enum";
import { productsList } from "@/types/dto/product";


 // 模拟加载更多的商品数据
  const loadMoreProducts = async (url:string)=> {
    return fetchAPI(url).then((data: APIResponse)=>{
      if(data.code===200){
        return data.data as productsList;
      }else{
        if (process.env.NODE_ENV === "development"){
        console.log('error:', data);
        }
        return null;
      }
    })
  };


export default function ProductClassify() {

  const [state,setState]=useState({
    selectedKey:0, //商品分类
    shaixuan:0, // 排序方式 0:all, 1:price, 2:time
    currentPage:1,
    pageSize:10,
    isSame:true, //和上一次更改是否为同一种类，默认为true
    isSort:false //是否是排序
  })
  const router = useRouter();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [productList, setProductList]=useState<productsInfo[]>([])
  const [totalPage,setTotalPage]=useState<number>(1)

  function handleNextPage(){
    // console.log(state.currentPage)
    setState({
      ...state,
      currentPage:state.currentPage+1,
      isSame:true,
      isSort:false
    })
  }

  // currentPage=${state.currentPage}&pageSize=${state.pageSize}&categoryId=${state.selectedKey}&sort=${state.shaixuan}
  const { data, error, isLoading } = 
  useSWR(`/product-server/getProductList?currentPage=${state.currentPage}&pageSize=${state.pageSize}&categoryId=${state.selectedKey}&sort=${state.shaixuan}`,
   loadMoreProducts,
   {
    dedupingInterval: 10*5000,  // 5秒内不会重复请求相同url
    staleTime: 1*60*1000,  // 数据缓存时间1分钟
   }
   )

   // TODO 因为data初始值会超发一次请求（第一次，data为undefined）
   useEffect(() => {
    // console.log("isSame: ",state.isSame)
    // 排除掉data初始undefined情况
    if(data!==undefined){
      if(data===null){
        return
      }
      // 判断是否是同一种类
      if(state.isSame){
        if (state.isSort){
          if (data.productList===null){
            setHasMore(false)
            setProductList([])
          }else{
            setHasMore(true)
            setProductList(data.productList)
          }
          return
        }
        const total=Math.ceil(data.totalItems/state.pageSize)
        setTotalPage(total)
        if(data.currentPage>total){
          setHasMore(false)
          return
        }
        setProductList((prev)=>[...prev,...data.productList])
        setHasMore(true)
        return
      }else{
        if (data.productList===null){
          setHasMore(false)
          setProductList([])
        }else{
          setHasMore(true)
          setProductList(data.productList)
        }
      }

    }
  }, [data]);  
  



  return (
    <div>
      <MainLayout>
        <div className="pl-[28px] pr-[28px]">
          {/* 面包屑导航 */}
          <div className="flex flex-row items-center bg-[#f5f5f5] w-full h-[46px] mt-[10px] pl-[10px]">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <div
                onClick={() => {
                  router.push("/");
                }}
                className="text-[#282828] text-[14px] cursor-pointer"
              >
                首页
              </div>
              <div className="text-[#999] text-[14px]">产品详情</div>
            </Breadcrumbs>
          </div>

          {/* 商品分类导航栏 */}
          <div className="flex flex-row items-center bg-[#f5f5f5] w-full h-[50px] mt-[10px] pl-[10px]">
            {menuItemsClassify.map((item) => (
              <div
                key={item.id}
                onClick={() => setState({
                  ...state,
                  selectedKey:item.id,
                  currentPage:1,
                  isSame:false,
                  isSort:false
                })}
                className={`flex flex-row mr-[32px] cursor-pointer items-center justify-center w-[60px] h-[35px] ${
                  state.selectedKey === item.id ? "shadow-[0_2px_0_0_#e93323]" : ""
                }`}
              >
                <div
                  className={`text-[14px] hover:text-[#e93323]  ${
                    state.selectedKey === item.id
                      ? "font-custom text-[#e93323] "
                      : "text-[#282828]"
                  }`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* 排序 */}
          <div className="flex flex-row  items-center bg-[#f5f5f5] w-full h-[40px] mt-[5px] pl-[10px]">
            <div className="text-[#969696] text-[14px] font-custom">排序：</div>
            <div
              onClick={() => setState({
                ...state,
                shaixuan:0,
                isSame:true,
                isSort:true
              })}
              className={`cursor-pointer hover:text-[#e93323] text-[14px] font-custom ml-[10px] ${
                state.shaixuan === 0 ? " text-[#e93323]" : "text-[#282828]"
              }`}
            >
              默认
            </div>

            <div
              onClick={() => setState({
                ...state,
                shaixuan:1,
                isSame:true,
                isSort:true
              })}
              className={`cursor-pointer hover:text-[#e93323] text-[14px] font-custom ml-[20px] ${
                state.shaixuan === 1 ? "text-[#e93323]" : "text-[#282828]"
              }`}
            >
              价格
            </div>

            <div
              onClick={() => setState({
                ...state,
                shaixuan:2,
                isSame:true,
                isSort:true
              })}
              className={`cursor-pointer hover:text-[#e93323]  text-[14px] font-custom ml-[20px] ${
                state.shaixuan === 2 ? " text-[#e93323]" : "text-[#282828]"
              }`}
            >
              上架时间
            </div>
          </div>

{/* 商品展示 */}

{/* {isLoading ? <div>
  <Loading/>
</div>: */}
<div>
      <InfiniteScroll
        dataLength={productList?.length}
        // next={loadMoreProducts}
        next={handleNextPage}
        hasMore={hasMore}
        loader={<div className="text-center py-4">加载中...</div>}
        endMessage={<div className="text-center py-4">没有更多商品了！</div>}
      >
        <div className="flex flex-wrap w-full ">
          {productList?.map((product, index) => (
            <div key={index} className="flex-none w-[20%] h-[300px] p-2">
              <div onClick={()=>{
                window.open(`/productDetail/${product.product_id}`, '_blank');
              }} className="w-full h-full p-1 rounded-lg cursor-pointer border-[1px] border-transparent hover:border-[1px] hover:border-[#ff5050] box-border">
                <div className="w-full h-[180px] rounded-lg relative">
                  <Image
                    src={`http://localhost:9000/${product.product_cover}`}
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-[5px] text-[16px] font-medium text-[#282828] font-custom line-clamp-1">
                  {/* 帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果
                  LUCE DI COLONIA克罗尼亚(香薰芯) */}
                  {product.product_name}
                </div>
                <div className="mt-[2px] text-[#ff5000] font-custom text-[14px]">
                  包邮
                </div>
                <div className="flex flex-row items-center">
                  <div className="text-[20px] font-custom2 text-[#ff5000] font-bold">
                    &yen;{product.product_price}
                  </div>
                  <div className="ml-[8px] mt-[5px] text-[14px] text-[#7a7a7a] font-custom2">
                    999+人购买
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <BottomComponent />
    </div>


{/* } */}
        </div>
      </MainLayout>
    </div>
  );
}
