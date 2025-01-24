"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Image from "next/image";

export default function SliderComponents() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };

  return (
      <div className="mx-auto w-full h-[100%] mt-2 p-[15px] "> 
        <Slider
        // className="border-[5px]  rounded-lg"
         {...sliderSettings}>
          <div>
            <Image
              src="/images/1.JPG"
              alt="this is a image"
              width={800} // 调整图片宽度
              height={300} // 调整图片高度
              style={{ objectFit: "cover", width: "100%", height: "100%" }} // 设置图片自适应填充
              priority
            />
          </div>
          <div>
            <Image
        src="/images/1.JPG"
              alt="this is a image"
              width={800} // 调整图片宽度
              height={300} // 调整图片高度
              style={{ objectFit: "cover", width: "100%", height: "100%" }} // 设置图片自适应填充
              priority
            />
          </div>
          <div>
            <Image
                src="/images/1.JPG"
              alt="this is a image"
              width={800} // 调整图片宽度
              height={300} // 调整图片高度
              style={{ objectFit: "cover", width: "100%", height: "100%" }} // 设置图片自适应填充
              priority
            />
          </div>
        </Slider>
      </div>
  );
}
