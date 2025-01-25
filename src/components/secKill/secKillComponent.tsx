'use client'

import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

export default function SecKillComponent() {
  const deadline = "2025-01-25T14:30:00+08:00"; // 设置截止时间

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const deadlineTime = moment(deadline).tz('Asia/Shanghai').valueOf();

    // 每秒更新剩余时间
    const timer = setInterval(() => {
      // 获取当前的北京时间
      const currentTime = moment().tz('Asia/Shanghai').valueOf();
      // 计算剩余时间
      const remainingTime = deadlineTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(timer); // 时间到达后停止定时器
        setTimeLeft(0);
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    // 清除定时器
    return () => clearInterval(timer);
  }, [deadline]);

  const formatTime = (milliseconds: any) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(remainingMinutes).padStart(2, '0'),
      seconds: String(remainingSeconds).padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="flex flex-row items-center p-[15px] w-full h-[270px] mt-[20px]">
     {/* 倒计时 */}
      <div className="flex flex-col items-center w-[208px] h-[266px] bg-[url('/images/skillBg.jpg')]">
        <div className="text-white text-[28px] font-bold mt-[30px]">
          限时秒杀
        </div>
        <div className="text-white text-[16px] mt-[20px]">
          <span className="font-bold">00:00</span> 点场
        </div>
        <div className="border-t-2 border-white w-[20px] mt-[10px]"></div>
        <div className="text-white text-[16px] mt-[10px]">
          距离结束还剩
        </div>
        <div className="flex flex-row justify-center text-white mt-[20px]">
          <div className="flex items-center bg-black p-[5px] w-[28px] h-[28px] text-white font-bold">
            {hours}
          </div>
          <div className="text-white text-[16px] ml-[5px] mr-[5px]">:</div>
          <div className="flex items-center bg-black p-[5px] w-[28px] h-[28px] text-white font-bold">
            {minutes}
          </div>
          <div className="text-white text-[16px] ml-[5px] mr-[5px]">:</div>
          <div className="flex items-center bg-black p-[5px] w-[28px] h-[28px] text-white font-bold">
            {seconds}
          </div>
        </div>
      </div>

{/* 限时秒杀商品 */}
<div className='flex flex-row flex-grow items-center p-[15px] h-[266px]'>
    {/* 第一个商品 */}
    <div className='flex flex-col items-center pt-[21px] w-[248px] h-[266px] cursor-pointer '>
        <div
        className='border-2 w-[164px] h-[164px]'> 
        <img
         src="/images/go.jpg"
          alt="" className='object-cover' />
        </div>

        <div className='mt-[05px] text-[#282828] w-[164px] text-[14px] overflow-hidden whitespace-nowrap text-ellipsis'>
    一只戴眼镜的可爱老鼠哈哈哈
</div>
<div className='flex flex-row items-center mt-[10px]'>
<div className='text-[#e93323] text-[16px] font-bold'>
    $20
</div>
<div className='text-[14px] text-[#a3a3a3] line-through ml-[6px]'>
    $250
</div>
</div>
    </div>
{/* ----------------- */}
    {/* 第一个商品 */}
    <div className='flex flex-col items-center pt-[21px] w-[248px] h-[266px] cursor-pointer '>
        <div
        className='border-2 w-[164px] h-[164px]'> 
        <img
         src="/images/go.jpg"
          alt="" className='object-cover' />
        </div>

        <div className='mt-[05px] text-[#282828] w-[164px] text-[14px] overflow-hidden whitespace-nowrap text-ellipsis'>
    一只戴眼镜的可爱老鼠哈哈哈
</div>
<div className='flex flex-row items-center mt-[10px]'>
<div className='text-[#e93323] text-[16px] font-bold'>
    $20
</div>
<div className='text-[14px] text-[#a3a3a3] line-through ml-[6px]'>
    $250
</div>
</div>
    </div>
{/* ----------------- */}

    {/* 第一个商品 */}
    <div className='flex flex-col items-center pt-[21px] w-[248px] h-[266px] cursor-pointer  '>
        <div
        className='border-2 w-[164px] h-[164px]'> 
        <img
         src="/images/go.jpg"
          alt="" className='object-cover' />
        </div>

        <div className='mt-[05px] text-[#282828] w-[164px] text-[14px] overflow-hidden whitespace-nowrap text-ellipsis'>
    一只戴眼镜的可爱老鼠哈哈哈
</div>
<div className='flex flex-row items-center mt-[10px]'>
<div className='text-[#e93323] text-[16px] font-bold'>
    $20
</div>
<div className='text-[14px] text-[#a3a3a3] line-through ml-[6px]'>
    $250
</div>
</div>
    </div>
{/* ----------------- */}

        {/* 更多按钮 */}
        <div className="flex items-center ml-[20px] text-[#007bff] cursor-pointer hover:text-[#0056b3]">
          <span>查看更多</span>
        </div>


    </div>


    </div>
  );
}
