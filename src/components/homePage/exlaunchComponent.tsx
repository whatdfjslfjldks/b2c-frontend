"use client";

import { fetchAPI } from "@/api/fetchApi";
import { productsInfo } from "@/model/vo/productInfoVO";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExLaunchComponent() {
  const router = useRouter();
  const [productList, setProductList] = useState<productsInfo[]>([]);


  useEffect(()=>{
    fetchAPI("/product-server/getProductList?currentPage=1&pageSize=5&sort=2")
    .then((data)=>{
      if(data.code===200){
        setProductList(data.data.productList as productsInfo[]);
      }else{
      }
    })

  },[])


  return (
    <div className="flex  flex-col p-[15px] w-full  h-[380px] mt-[20px]">
      <div className="flex flex-row  items-center">
        {/* 首发新品图片 */}
        <img src="/images/shoufa.png" alt="pic" width="110px" height="30px" />
        <div className="text-[14px] text-[#8b8b8b] font-custom ml-[10px]">
          永远好奇，永远年轻
        </div>
        <div  onClick={()=>router.push('/productClassify')} className="border border-[#c6c6c6] ml-auto text-[#818181] cursor-pointer w-[58px] h-[24px] text-[12px] flex justify-center items-center">
          更多&nbsp;{">"}
        </div>
      </div>
      {/* 首发新品展示 */}

      <div className="flex flex-row  pt-[15px]  h-full ">

      {productList && productList.map((item, index) => (
  <div
  onClick={() => window.open(`/productDetail/${item.id}`, '_blank')}
    key={index}
    className="flex flex-col mr-[10px] xl:mr-[30px] pt-[15px] pl-[10px] pr-[10px] pb-[20px] w-[220px] cursor-pointer  p-[10px] hover:shadow-lg transition-all duration-300"
  >
    <div className="w-[190px] h-[190px]">
      <img
        src={item.pImg ? process.env.NEXT_PUBLIC_IMAGE_PREFIX+item.pImg[0].img_url : "/images/go.jpg"}
        alt={item.name || ""}
        className="w-full h-full object-cover"
      />
    </div>


    <div className="text-[#282828] text-[14px] mt-[12px] font-custom line-clamp-1">
      {item.name || ""}
    </div>

    <div className="flex flex-row mt-[10px] items-center">
            <div className="flex flex-row font-custom text-[12px] w-[45px] justify-center items-center h-[20px] leading-5 text-[#fff] bg-[url('/images/youhui.jpg')]">
              优惠价
            </div>
            <div className="text-[18px] ml-[10px] font-bold text-[#e93323]">
              &yen;{item.price}
            </div>
            <div className="text-[12px] ml-[10px]  text-[#a3a3a3] line-through">
              &yen;{item.original_price}
            </div>
          </div>
          <div className="text-[12px] mt-[14px] text-[#969696]">已抢 {item.sold ? item.sold : 0}件</div>

  </div>
))}


      </div>


    </div>
  );
}
