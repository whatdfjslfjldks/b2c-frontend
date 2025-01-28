"use client";

import BottomComponent from "@/components/bottom/bottomComponent";
import ProductInfo from "@/components/product/productInfo";
import MainLayout from "@/layouts/mainLayout";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const id = useParams().id;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExist,setIsExist]=useState<boolean>(false);
  const [productId, setProductId] = useState<number | null>(null);


    const [zoomPosition, setZoomPosition] = useState({
    x: 0,
    y: 0,
    showZoom: false,
  });

  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleMouseMove = (e: any) => {
    const image = e.target;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const zoomX = Math.min(Math.max((x / width) * 100, 0), 100);
    const zoomY = Math.min(Math.max((y / height) * 100, 0), 100);

    setZoomPosition({
      x: zoomX,
      y: zoomY,
      showZoom: true,
    });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ ...zoomPosition, showZoom: false });
  };


  //TODO react钩子只能以相同的顺序调用，中间不能用类似下面if渲染分割
//   判断商品是否存在
  useEffect(()=>{
    try{
       const decodedId = decodeURIComponent(id as string);  

       const pid = parseInt(decodedId);  
       setProductId(pid);
       if(Number.isNaN(pid) || pid===null){
           setIsExist(false);
           router.push("/error/noitem");
       }else{
           console.log("DSfsdf: ",pid)
           setIsExist(true)
       }
    }catch(error){
        if(process.env.NODE_ENV === "development"){
            console.error("Error decoding ID:", error);
        }
        router.push("/error/noitem");
    }
  },[id,router])

  if (!isExist) {
    return (
        <div>
            正在查找商品
        </div>
    );
  }


return (
    <div>
      <MainLayout>
        <div className="flex flex-col pl-[60px] pr-[60px] mt-[20px] w-full">
          <div className="flex flex-row w-full h-[550px]">
            {/* 图片 */}
            <div className="flex flex-row w-[45%] h-full p-2 relative">
              {/* 图片列表 */}
              <div className="flex flex-col w-[20%] p-1 h-full">
                {Array(5)
                  .fill("")
                  .map((_, index) => (
                    <div
                      key={index}
                      className="border rounded-md border-[#e3e3e3] w-full h-[18%] mt-[5px] cursor-pointer"
                    >
                      <img
                        src="/images/go.jpg"
                        alt="pic"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
              </div>

              {/* 图片大图 */}
              <div
                ref={containerRef}
                className="flex w-[80%] p-1 h-full relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="/images/go.jpg"
                  alt="Product Image"
                  className="border rounded-md border-[#e3e3e3] w-full h-full object-cover cursor-move"
                />
                {zoomPosition.showZoom && (
                  <div
                    className="absolute border border-[black] bg-[#fff] opacity-70"
                    style={{
                      left: `${zoomPosition.x}%`,
                      top: `${zoomPosition.y}%`,
                      width: "150px",
                      height: "150px",
                      pointerEvents: "none",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </div>
            </div>

            {/* 商品购买 */}
            <div className="flex flex-col w-[calc(55%-20px)] h-full ml-[20px] mt-[5px] p-2">
              {/* 商品名称 */}
              <div className="flex flex-row w-full line-clamp-2 text-[#11192d] font-semibold text-[24px] font-custom">
                卡姿兰大眼睛超级无敌带耳机的土拨鼠
              </div>

              {/* 价格 */}
              <div className="flex flex-row items-center w-full mt-[10px]">
                <div className="text-[16px] text-[#ff5000] font-semibold">
                  &yen;
                </div>
                <div className="text-[28px] ml-[2px] text-[#ff5000] font-semibold">
                  30.00
                </div>
                <div className="text-[#7a7a7a] ml-[10px] text-[14px] font-normal">
                  已售999+
                </div>
              </div>

              {/* 分类 */}
              <div className="flex flex-row w-full mt-[10px] ">
                <div className="text-[20px] tracking-widest text-[#7c889c] font-normal mt-[10px] ">
                  分&nbsp;&nbsp;类:
                </div>
                {/* 具体类别 */}
                <div className="flex flex-col ml-[10px] h-[300px] w-[500px] overflow-y-scroll scrollbar-hide ">
                  <div className="flex border w-[450px] mb-[10px] border-[#dadde0] bg-[#fff] text-[20px] rounded-sm font-custom p-2 hover:text-[#ff5000] hover:border hover:border-[#ff5000] cursor-pointer">
                    <div className="text-[16px] font-custom text-[#11192d] line-clamp-1">
                      是到付哈的说法都是开发哈德数据库是到付哈的说法都是开发哈德数据库是到付哈的说法都是开发哈德数据库
                    </div>
                  </div>
                </div>
              </div>

              {/* 数量 */}
              <div className="flex flex-row w-full mt-[10px] ">
                <div className="text-[20px] tracking-widest text-[#7c889c] font-normal mt-[10px] ">
                  数&nbsp;&nbsp;量:
                </div>

                <div className="flex ml-[10px] items-center justify-center space-x-4">
                  {/* 减号按钮 */}
                  <button
                    onClick={handleDecrement}
                    disabled={count <= 1}
                    className="px-3 py-2 text-xl border rounded-full bg-[#f0f0f0] hover:bg-[#e0e0e0] disabled:bg-[#d3d3d3] disabled:cursor-not-allowed"
                  >
                    -
                  </button>

                  {/* 数量显示 */}
                  <span className="text-lg font-semibold">{count}</span>

                  {/* 加号按钮 */}
                  <button
                    onClick={handleIncrement}
                    className="px-3 py-2 text-xl border rounded-full bg-[#f0f0f0] hover:bg-[#e0e0e0]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 加入购物车和购买按钮 */}
              <div className="flex flex-row items-center w-full mt-[20px] h-[50px]">
                <div className="flex items-center w-[100px] justify-center bg-[#e93323] border border-[#e93323] h-[50px] p-2 rounded-md cursor-pointer">
                  <div className="text-[14px] text-[#fff]">加入购物车</div>
                </div>

                <div className="flex items-center w-[100px] ml-[40px] justify-center bg-[#fff] border border-[#e93323] h-[50px] p-2 rounded-md cursor-pointer">
                  <div className="text-[14px] text-[#e93323]">立即购买</div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧放大的区域，悬浮在大图右边 */}
          {zoomPosition.showZoom && (
            <div
              className="absolute border rounded-md border-[#e3e3e3] top-[200px] left-[calc(45%+10px)] w-[450px] h-[450px] z-10"
              style={{
                backgroundImage: `url(/images/go.jpg)`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: "250%",
                pointerEvents: "none",
              }}
            />
          )}


{/* 商品详情部分，用户评价等 */}
<ProductInfo productId={productId as number}/>


        </div>
      </MainLayout>

      <BottomComponent />
    </div>
  );
}

