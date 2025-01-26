"use client";

export default function FeaturedRecComponent() {
  return (
    <div className="flex  flex-col p-[15px] w-full  h-[270px] mt-[20px]">
      <div className="flex flex-row  items-center">
        {/* 精品推荐图片 */}
        <img src="/images/tuijian.png" alt="pic" width="110px" height="30px" />
        <div className="text-[14px] text-[#8b8b8b] font-custom ml-[10px]">
          诚意推荐 品质商品
        </div>
        <div className="border border-[#c6c6c6] ml-auto text-[#818181] cursor-pointer w-[58px] h-[24px] text-[12px] flex justify-center items-center">
          更多&nbsp;{">"}
        </div>
      </div>
      {/* 推荐商品展示 */}

      <div className="flex flex-row  pt-[15px]  h-[240px] ">
        <div className="flex flex-row w-[550px] cursor-pointer  p-[10px] hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col w-[300px] p-[5px]">
            {/* 商品名称 */}
            <div className="text-[#282828] text-[18px] font-custom line-clamp-2">
              帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
              DI COLONIA克罗尼亚(香薰芯blabla)
            </div>
            {/* 介绍 */}
            <div className="text-[#a3a3a3] text-[16px] mt-[8px] font-custom line-clamp-1">
              帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
              DI COLONIA克罗尼亚(香薰芯)
            </div>
            {/* 价格 */}
            <div className="flex flex-row mt-[26px]">
              {/* 现在价格 */}
              <div className="text-[20px] font-bold text-[#e93323]">
                &yen;360.00
              </div>
              {/* 原价 */}
              <div className="ml-[12px] mt-[10px] text-[12px] text-[#a3a3a3] line-through">
                &yen;3600.00
              </div>
            </div>
          </div>

          {/* 商品图片 */}
          <div className="w-[180px] h-[180px]">
            <img
              src="/images/go.jpg"
              alt="pic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 第二个商品 */}
        <div className="flex flex-col w-[280px] ml-[25px] cursor-pointer p-[10px] hover:shadow-lg transition-all duration-300 ">
          <div className="text-[#282828] text-[18px] font-custom line-clamp-1">
            帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
            DI COLONIA克罗尼亚(香薰芯blabla)
          </div>
          {/* 价格 */}
          <div className="flex flex-col ">
            {/* 现在价格 */}
            <div className="text-[20px] font-bold text-[#e93323]">
              &yen;360.00
            </div>
          </div>
          {/* 图片 */}
          <div className="flex flex-row ">
            {/* 原价 */}
            <div className="text-[12px] text-[#a3a3a3] line-through">
              &yen;3600.00
            </div>
            <div className="w-[130px] h-[80px] ml-[40px] ">
              <img src="images/go.jpg" alt="pic" />
            </div>
          </div>
        </div>

        {/* 第三个商品 */}
        <div className="flex flex-col w-[280px] ml-[25px] cursor-pointer p-[10px] hover:shadow-lg transition-all duration-300 ">
          <div className="text-[#282828] text-[18px] font-custom line-clamp-1">
            帕尔玛之水（ACQUA DI PARMA）车载香薰固体香水之水加州桂 无花果 LUCE
            DI COLONIA克罗尼亚(香薰芯blabla)
          </div>
          {/* 价格 */}
          <div className="flex flex-col ">
            {/* 现在价格 */}
            <div className="text-[20px] font-bold text-[#e93323]">
              &yen;360.00
            </div>
          </div>
          {/* 图片 */}
          <div className="flex flex-row ">
            {/* 原价 */}
            <div className="text-[12px] text-[#a3a3a3] line-through">
              &yen;3600.00
            </div>
            <div className="w-[130px] h-[80px] ml-[40px] ">
              <img src="images/go.jpg" alt="pic" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
