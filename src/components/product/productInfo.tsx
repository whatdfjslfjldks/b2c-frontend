'use client'

import { useState, useRef, useEffect } from "react";
import NavProductDetail from "./navProductDetail";
import Comments from "./comments";

interface ProductInfoProps {
  productId: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productId }) => {
  const [selectedKey, setSelectedKey] = useState(1);

  // 状态管理：跟踪每个区域是否加载
  const [isLoaded1, setIsLoaded1] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [isLoaded3, setIsLoaded3] = useState(false);

  // 使用 useRef 来获取对应位置的元素
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // 新增的标志位：判断是否是用户选择触发的滚动
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  // 使用 IntersectionObserver 来检测元素是否进入视图
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 进入视图后加载内容
          if (entry.target === section1Ref.current) {
            setIsLoaded1(true);
            setSelectedKey(1);
          }
          if (entry.target === section2Ref.current){
            setIsLoaded2(true);
            setSelectedKey(2);
          } 
          if (entry.target === section3Ref.current){
            setIsLoaded3(true);
            setSelectedKey(3);
          } 
        }
      });
    }, options);

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);
    if (section3Ref.current) observer.observe(section3Ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 根据 selectedKey 自动滚动到对应位置，避免刚进入页面时自动滚动
  useEffect(() => {
    if (hasUserScrolled) {
      if (selectedKey === 1 && section1Ref.current) {
        section1Ref.current.scrollIntoView({ behavior: "smooth" });
      } else if (selectedKey === 2 && section2Ref.current) {
        section2Ref.current.scrollIntoView({ behavior: "smooth" });
      } else if (selectedKey === 3 && section3Ref.current) {
        section3Ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedKey, hasUserScrolled]);

  const handleSelect = (key: number) => {
    setSelectedKey(key);
    setHasUserScrolled(true);  // 用户选择后，允许滚动
  };

  return (
    <div className="flex flex-col w-full h-full mt-[20px] ml-[20px]">
      {/* 导航栏 */}
      <div>
        <NavProductDetail selectedKey={selectedKey} setSelectedKey={handleSelect} />
      </div>

<div className="flex flex-row w-full h-full">

      {/* 具体内容 */}
      <div className="flex flex-col w-[50%] h-full mt-[20px]">
        <div
          ref={section1Ref}
          className="h-[1000px]"
        >
          {/* 内容区 1 */}
          {!isLoaded1 ? (
            <div className="flex justify-center items-center h-full">
              <p>加载中...</p>
            </div>
          ) : (
            // 用户评价
                <Comments productId={productId}/>
          )}
        </div>

        <div
          ref={section2Ref}
          className="h-[1000px] bg-gray-300"
        >
          {/* 内容区 2 */}
          {!isLoaded2 ? (
            <div className="flex justify-center items-center h-full">
              <p>加载中...</p>
            </div>
          ) : (
            <div>
              <h2>内容区 2</h2>
              <p>这里是内容区 2 的实际内容。</p>
            </div>
          )}
        </div>

        <div
          ref={section3Ref}
          className="h-[1000px] bg-gray-400"
        >
          {/* 内容区 3 */}
          {!isLoaded3 ? (
            <div className="flex justify-center items-center h-full">
              <p>加载中...</p>
            </div>
          ) : (
            <div>
              <h2>内容区 3</h2>
              <p>这里是内容区 3 的实际内容。</p>
            </div>
          )}
        </div>
      </div>

      {/* <div className="w-[50%] h-full bg-yellow-500"> 
      sdf
        </div> */}

      </div>
    </div>
  );
}

export default ProductInfo;
