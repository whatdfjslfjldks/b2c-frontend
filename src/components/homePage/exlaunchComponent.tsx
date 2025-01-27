"use client";

import { useRouter } from "next/navigation";

export default function ExLaunchComponent() {
  const router = useRouter();
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
        <div className="flex flex-col pt-[15px] pl-[10px] pr-[10px] pb-[20px] w-[220px] cursor-pointer  p-[10px] hover:shadow-lg transition-all duration-300">
          {/* 商品图片 */}
          <div className="w-[190px] h-[190px]">
            <img
              src="/images/go.jpg"
              alt="pic"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 商品名称 */}
          <div className="text-[#282828] text-[14px] mt-[12px] font-custom line-clamp-1">
            帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
            DI COLONIA克罗尼亚(香薰芯)
          </div>
          <div className="flex flex-row mt-[10px] items-center">
            <div className="flex flex-row font-custom text-[12px] w-[45px] justify-center items-center h-[20px] leading-5 text-[#fff] bg-[url('/images/youhui.jpg')]">
              优惠价
            </div>
            <div className="text-[18px] ml-[10px] font-bold text-[#e93323]">
              &yen;360.00
            </div>
            <div className="text-[12px] ml-[10px]  text-[#a3a3a3] line-through">
              &yen;3600.00
            </div>
          </div>
          <div className="text-[12px] mt-[14px] text-[#969696]">已抢 999件</div>
        </div>
        <div className="flex flex-col ml-[17.5px] pt-[15px] pl-[10px] pr-[10px] pb-[20px] w-[220px] cursor-pointer  p-[10px] hover:shadow-lg transition-all duration-300">
          {/* 商品图片 */}
          <div className="w-[190px] h-[190px]">
            <img
              src="/images/go.jpg"
              alt="pic"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 商品名称 */}
          <div className="text-[#282828] text-[14px] mt-[12px] font-custom line-clamp-1">
            帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
            DI COLONIA克罗尼亚(香薰芯)
          </div>
          <div className="flex flex-row mt-[10px] items-center">
            <div className="flex flex-row font-custom text-[12px] w-[45px] justify-center items-center h-[20px] leading-5 text-[#fff] bg-[url('/images/youhui.jpg')]">
              优惠价
            </div>
            <div className="text-[18px] ml-[10px] font-bold text-[#e93323]">
              &yen;360.00
            </div>
            <div className="text-[12px] ml-[10px]  text-[#a3a3a3] line-through">
              &yen;3600.00
            </div>
          </div>
          <div className="text-[12px] mt-[14px] text-[#969696]">已抢 999件</div>
        </div>
        <div className="flex flex-col ml-[17.5px] pt-[15px] pl-[10px] pr-[10px] pb-[20px] w-[220px] cursor-pointer  p-[10px] hover:shadow-lg transition-all duration-300">
          {/* 商品图片 */}
          <div className="w-[190px] h-[190px]">
            <img
              src="/images/go.jpg"
              alt="pic"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 商品名称 */}
          <div className="text-[#282828] text-[14px] mt-[12px] font-custom line-clamp-1">
            帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
            DI COLONIA克罗尼亚(香薰芯)
          </div>
          <div className="flex flex-row mt-[10px] items-center">
            <div className="flex flex-row font-custom text-[12px] w-[45px] justify-center items-center h-[20px] leading-5 text-[#fff] bg-[url('/images/youhui.jpg')]">
              优惠价
            </div>
            <div className="text-[18px] ml-[10px] font-bold text-[#e93323]">
              &yen;360.00
            </div>
            <div className="text-[12px] ml-[10px]  text-[#a3a3a3] line-through">
              &yen;3600.00
            </div>
          </div>
          <div className="text-[12px] mt-[14px] text-[#969696]">已抢 999件</div>
        </div>
        <div className="flex flex-col ml-[17.5px] pt-[15px] pl-[10px] pr-[10px] pb-[20px] w-[220px] cursor-pointer  p-[10px] hover:shadow-lg transition-all duration-300">
          {/* 商品图片 */}
          <div className="w-[190px] h-[190px]">
            <img
              src="/images/go.jpg"
              alt="pic"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 商品名称 */}
          <div className="text-[#282828] text-[14px] mt-[12px] font-custom line-clamp-1">
            帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
            DI COLONIA克罗尼亚(香薰芯)
          </div>
          <div className="flex flex-row mt-[10px] items-center">
            <div className="flex flex-row font-custom text-[12px] w-[45px] justify-center items-center h-[20px] leading-5 text-[#fff] bg-[url('/images/youhui.jpg')]">
              优惠价
            </div>
            <div className="text-[18px] ml-[10px] font-bold text-[#e93323]">
              &yen;360.00
            </div>
            <div className="text-[12px] ml-[10px]  text-[#a3a3a3] line-through">
              &yen;3600.00
            </div>
          </div>
          <div className="text-[12px] mt-[14px] text-[#969696]">已抢 999件</div>
        </div>
        <div className="flex flex-col ml-[17.5px] pt-[15px] pl-[10px] pr-[10px] pb-[20px] w-[220px] cursor-pointer  p-[10px] hover:shadow-lg transition-all duration-300">
          {/* 商品图片 */}
          <div className="w-[190px] h-[190px]">
            <img
              src="/images/go.jpg"
              alt="pic"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 商品名称 */}
          <div className="text-[#282828] text-[14px] mt-[12px] font-custom line-clamp-1">
            帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
            DI COLONIA克罗尼亚(香薰芯)
          </div>
          <div className="flex flex-row mt-[10px] items-center">
            <div className="flex flex-row font-custom text-[12px] w-[45px] justify-center items-center h-[20px] leading-5 text-[#fff] bg-[url('/images/youhui.jpg')]">
              优惠价
            </div>
            <div className="text-[18px] ml-[10px] font-bold text-[#e93323]">
              &yen;360.00
            </div>
            <div className="text-[12px] ml-[10px]  text-[#a3a3a3] line-through">
              &yen;3600.00
            </div>
          </div>
          <div className="text-[12px] mt-[14px] text-[#969696]">已抢 999件</div>
        </div>
      </div>
    </div>
  );
}
