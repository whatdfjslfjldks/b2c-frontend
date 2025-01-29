"use client";

import { fetchAPI } from "@/api/fetchApi";
import BottomComponent from "@/components/bottom/bottomComponent";
import Loading from "@/components/loading/loadingComponents";
import ProductInfo from "@/components/product/productInfo";
import MainLayout from "@/layouts/mainLayout";
import { pImg, productDetail } from "@/model/vo/productInfoVO";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const id = useParams().id;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExist, setIsExist] = useState<boolean>(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [productInfo, setProductInfo]=useState<productDetail|null>(null)
  const [selectImg,setSelectImg]=useState<pImg|null>(null)
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


  // TODO 利用swr优化数据获取
  const getProductDetail = async (id: number): Promise<productDetail | null> => {
    try {
      const data = await fetchAPI(`/product-server/getProductDetailById?productId=${id}`);
      if (data.code === 200) {
        // 返回商品详情
        return data.data as productDetail;
      } else {
        if (process.env.NODE_ENV === "development") {
          console.log('error:', data);
        }
        return null;
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log('error:', error);
      }
      return null;
    }
  };

  //TODO react钩子只能以相同的顺序调用，中间不能用类似下面if渲染分割
  //   判断商品是否存在
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const decodedId = decodeURIComponent(id as string);  // 解码商品 ID
        const pid = parseInt(decodedId);  // 转换为数字类型

        setProductId(pid);

        if (Number.isNaN(pid) || pid === null) {
          setIsExist(false); // 如果 ID 无效，则设置商品不存在
          router.push("/error/noitem"); // 跳转到错误页面
        } else {
          // 获取商品详情
          const result = await getProductDetail(pid);

          if (result !== null) {
            setProductInfo(result); // 设置商品详情
            // 默认大图为第一张
            setSelectImg(result.product_img[0])
            setIsExist(true); // 商品存在
          } else {
            setIsExist(false); // 商品不存在
            router.push("/error/noitem"); // 跳转到错误页面
          }
        }
      } catch (error) {
        // console.error("解码商品 ID 时出错:", error);
        router.push("/error/noitem"); // 错误跳转
      }
    };

    fetchProductDetail(); // 调用异步方法
  }, [id, router]); 

  function handleImgClick(item: pImg){
    // console.log(item)
    setSelectImg(item)
  }


  if (!isExist) {
    return (
      <div>
        <Loading />
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
              <div className="flex flex-col items-center w-[20%] p-1 h-full">
                {productInfo?.product_img.map((item, index) => (
                    <div
                    onClick={()=>handleImgClick(item)}
                      key={index}
                      className="border rounded-md border-[#e3e3e3] overflow-hidden w-[90px] h-[90px] mt-[5px] cursor-pointer"
                    >
                 <Image
                    src={`http://localhost:9000/${item.img_url}`}
                    alt="product"
                   width={90}
                   height={90}
                    objectFit="cover"
                    className="rounded-lg"
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
                  // src="/images/go.jpg"
                  src={`http://localhost:9000/${selectImg?.img_url}`}
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
                backgroundImage: `url(http://localhost:9000/${selectImg?.img_url})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: "250%",
                pointerEvents: "none",
              }}
            />
          )}

          {/* 商品详情部分，用户评价等 */}
          <ProductInfo productId={productId as number} />
        </div>
      </MainLayout>

      <BottomComponent />
    </div>
  );
}
