"use client";

import { fetchAPI } from "@/api/fetchApi";
import BottomComponent from "@/components/bottom/bottomComponent";
import Loading from "@/components/loading/loadingComponents";
import ProductInfo from "@/components/product/productInfo";
import MainLayout from "@/layouts/mainLayout";
import { PImg, productsInfo2 } from "@/model/vo/productInfoVO";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import {message} from 'antd'
import { useDispatch } from 'react-redux';
import { setCartInfo } from "@/middleware/redux/cartSlice";

type ProductDetailResponse = {
  code: number;
  isExist: boolean;
  result?: productsInfo2;
};
type pDetail = {
  code: number;
  product?: productsInfo2;
};

type State = {
  count: number;
  selectImg: selectImg | null;
  // selectType: selectType | null;
};

type selectImg = {
  index: number;
  img_url: string;
};
type selectType={
  index:number;
  type_name: string;
}

const getProductDetail = async (id: number): Promise<pDetail> => {
  try {
    const data = await fetchAPI(
      `/product-server/getProductById?productId=${id}`
    );
    if (data.code === 200) {
      return {
        code: data.code,
        product: data.data.product,
      };
    } else {
      if (process.env.NODE_ENV === "development") {
        console.log("error:", data);
      }
      return {
        code: data.code,
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log("error:", error);
    }
    return {
      code: 408,
    };
  }
};

const fetchProductDetail = async (
  id: string
): Promise<ProductDetailResponse | null> => {
  // console.log("id:",id)
  const decodedId = decodeURIComponent(id as string); // 解码商品 ID
  const pid = parseInt(decodedId); // 转换为数字类型
  // console.log("pid:",pid)
  if (Number.isNaN(pid) || pid === null) {
    return {
      code: 404,
      isExist: false,
    };
  } else {
    // 获取商品详情
    const result = await getProductDetail(pid);
    if (result.code === 200) {
      // console.log("11111111111: ",result)
      return {
        code: result.code,
        isExist: true,
        result: result.product,
      };
    } else {
      return {
        code: result.code,
        isExist: false,
      };
    }
  }
};
export default function ProductDetail() {
  const router = useRouter();
  const id = useParams().id;
  const containerRef = useRef<HTMLDivElement>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [isExist, setIsExist] = useState<boolean>(false);
  const [productInfo, setProductInfo] = useState<productsInfo2 | null>(null);
  const [state,setState]=useState<State>({
    count:1,
    selectImg:null,
    // selectType:null,
  });
  const [zoomPosition, setZoomPosition] = useState({
    x: 0,
    y: 0,
    showZoom: false,
  });
  const [messageApi, contextHolder]=message.useMessage();
  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (state.count > 1) {
      setState({
        ...state,
        count: state.count - 1,
      });
    }
  };

  const handleIncrement = () => {
    setState({
      ...state,
      count: state.count + 1,
    });
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

  const { data, error, isLoading } = useSWR(id, fetchProductDetail, {
    // dedupingInterval: 5 * 1000,
    // staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      if (data.code === 200 && data.result) {
        setIsExist(true);
        setProductInfo(data.result as productsInfo2);
        // if(!data.result.pImg || !data.result.pType || data.result.pType.length<=0 || data.result.pType.length<=0){
        //   return;
        // }
        if(!data.result.pImg){
          return;
        }
        setState({
          ...state,
          selectImg: {
            index: 0,
            img_url: data.result.pImg[0].img_url,
          },
          // selectType: {
          //   index: 0,
          //   type_name: data.result.pType[0].type_name,
          // },
        });

      } else if (data.code === 404) {
        setIsExist(false);
        router.push("/error/noitem");
      } else {
        setIsExist(false);
        router.push("/error/nonetwork");
      }
    }
  }, [data]);

  function handleImgClick(item: PImg, index: number) {
    setState({
      ...state,
      selectImg: {
        index: index,
        img_url: item.img_url,
      },
    });
  }
  // function handleTypeClick(item: PPType, index: number) {
  //   setState({
  //     ...state,
  //     // selectType: {
  //     //   index: index,
  //     //   type_name: item.type_name,
  //     // },
  //   });
  // }
  function addToCart(product: productsInfo2){
    const a={
      id:product.id,
      name:product.name,
      cover:product.pImg[0].img_url,
      // type_name:state.selectType?.type_name,
      price:product.price,
      amount:state.count,
      }
      console.log("a:",a)
    dispatch(setCartInfo(a))
    messageApi.success("加入购物车成功")
  }

  // function handlePurchase(product: productsInfo2){
  //   router.push(`/orderConfirm?productIds=${productInfo?.id}&amounts=${state.count}`)
  // }


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
        {contextHolder}
        <div className="flex flex-col pl-[60px] pr-[60px] mt-[20px] w-full">
          <div className="flex flex-row w-full h-[550px]">
            {/* 图片 */}
            <div className="flex flex-row w-[45%] h-full p-2 relative">
              {/* 图片列表 */}
              <div className="flex flex-col items-center w-[20%] p-1 h-full">
                {productInfo?.pImg && productInfo.pImg.length > 0 ? (
                  <div>
                    {productInfo?.pImg.map((item, index) => (
                      <div
                        onClick={() => handleImgClick(item, index)}
                        key={index}
                        className={`${
                          state.selectImg?.index === index
                            ? "border border-[#ff5000] rounded-md"
                            : ""
                        }border rounded-md border-[#e3e3e3] overflow-hidden w-[90px] h-[90px] mt-[5px] cursor-pointer hover:border hover:border-[#ff5000] hover:rounded-md`}
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
                ) : (
                  <div>还没有上传图片介绍</div>
                )}
              </div>

              {/* 图片大图 */}
              <div
                ref={containerRef}
                className="flex w-[80%] p-1 h-full relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={`http://localhost:9000/${state.selectImg?.img_url}`}
                  alt="product"
                  fill={true}
                  className="rounded-lg"
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
                {productInfo?.name}
                {/* 卡姿兰大眼睛超级无敌带耳机的土拨鼠 */}
              </div>

              {/* 价格 */}
              <div className="flex flex-row items-center w-full mt-[10px]">
                <div className="text-[16px] text-[#ff5000] font-semibold">
                  &yen;
                </div>
                <div className="text-[28px] ml-[2px] text-[#ff5000] font-semibold">
                  {productInfo?.price}
                </div>
                <div className="text-[#7a7a7a] ml-[10px] text-[14px] font-normal">
                  已有{productInfo?.sold ? `${productInfo?.sold}` : `0`}人购买
                </div>
              </div>

              {productInfo?.kind_id === 2 ? (
                <div>
                  <div>开始时间： {productInfo?.start_time}</div>
                  <div>持续时间： {productInfo?.duration}</div>
                  <div>场次： {productInfo?.session_id}</div>
                </div>
              ) : (
                <div></div>
              )}

              {/* 分类 */}
              <div className="flex flex-row w-full mt-[10px] ">
                <div className="text-[20px] tracking-widest text-[#7c889c] font-normal mt-[10px] ">
                  分&nbsp;&nbsp;类:
                </div>
                <div className="flex flex-col ml-[10px] h-[300px] w-[500px] overflow-y-scroll scrollbar-hide ">
                  分类未上传
                  </div>

                {/* 具体类别 */}
                {/* <div className="flex flex-col ml-[10px] h-[300px] w-[500px] overflow-y-scroll scrollbar-hide ">
                  {productInfo?.pType && productInfo.pType.length > 0 ? (
                    <div>
                      {productInfo?.pType.map((item, index) => (
                        <div
                        onClick={() => handleTypeClick(item, index)}
                          key={index}
                          className={`${state.selectType?.index===index ?'border border-[#ff5000] ':''} flex border w-[450px] mb-[10px] border-[#dadde0] bg-[#fff] text-[20px] rounded-sm font-custom p-2 hover:text-[#ff5000] hover:border hover:border-[#ff5000] cursor-pointer`}                        >
                          <div className="text-[16px] font-custom text-[#11192d] line-clamp-1">
                            {item.type_name}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>还没有上传商品分类</div>
                  )}
                </div> */}
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
                    disabled={state.count <= 1}
                    className="px-3 py-2 text-xl border rounded-full bg-[#f0f0f0] hover:bg-[#e0e0e0] disabled:bg-[#d3d3d3] disabled:cursor-not-allowed"
                  >
                    -
                  </button>

                  {/* 数量显示 */}
                  <span className="text-lg font-semibold">{state.count}</span>

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
                {productInfo?.kind_id === 1 ? (
                  <>
                    <div
                      onClick={() => addToCart(productInfo)}
                      className="flex items-center w-[100px] justify-center bg-[#e93323] border border-[#e93323] h-[50px] p-2 rounded-md cursor-pointer"
                    >
                      {/* hover:bg-[#fab6b6]  */}
                      <div className="text-[14px] text-[#fff]">加入购物车</div>
                    </div>

                    <div
                    //  onClick={()=>handlePurchase(productInfo)}
                      className="flex items-center w-[100px] ml-[40px] justify-center bg-[#fff] border border-[#e93323] h-[50px] p-2 rounded-md cursor-pointer">
                      <div className="text-[14px] text-[#e93323]">立即购买</div>
                    </div>
                  </>
                ) : (
                  <div 
                  // onClick={()=>handlePurchase(productInfo)}
                   className="flex items-center w-[100px] justify-center bg-[#fff] border border-[#e93323] h-[50px] p-2 rounded-md cursor-pointer">
                    <div className="text-[14px] text-[#e93323]">立即购买</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧放大的区域，悬浮在大图右边 */}
          {zoomPosition.showZoom && (
            <div
              className="absolute border rounded-md border-[#e3e3e3] top-[200px] left-[calc(45%+10px)] w-[450px] h-[450px] z-10"
              style={{
                backgroundImage: `url(http://localhost:9000/${state.selectImg?.img_url})`,
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
