"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function SliderComponent() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          bottom: "4px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <ul style={{ display: "flex", padding: "0", margin: "0" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={{
          width: "20px",
          height: "4px",
          borderRadius: "10%",
          backgroundColor: "rgba(255, 255, 255, 0.6)", 
          transition: "background-color 0.3s ease, transform 0.3s ease",
          margin: "0 20px", // 增加左右间距
          cursor: "pointer",
        }}
      ></div>
    ),
  };

  return (
    <div className="mx-auto w-full h-[100%] mt-2 p-[15px] relative">
      <Slider {...sliderSettings}>
        <div>
          <Image
            src="/images/1.JPG"
            alt="this is a image"
            width={800} // 调整图片宽度
            height={300} // 调整图片高度
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            priority
          />
        </div>
        <div>
          <Image
            src="/images/1.JPG"
            alt="this is a image"
            width={800} // 调整图片宽度
            height={300} // 调整图片高度
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            priority
          />
        </div>
        <div>
          <Image
            src="/images/1.JPG"
            alt="this is a image"
            width={800} // 调整图片宽度
            height={300} // 调整图片高度
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            priority
          />
        </div>
      </Slider>
    </div>
  );
}
