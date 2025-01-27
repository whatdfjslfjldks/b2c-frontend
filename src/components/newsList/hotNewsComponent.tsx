'use client'


export default function HotNewsComponent() {
    return (
        <div className="flex flex-col w-full h-full">
            {/* 标题 */}
            <div className="flex font-semibold text-[18px] text-[#333] h-[70px] items-center">
                热点资讯
            </div>

            <div className="flex flex-row w-full h-[120px] p-2 border-b  border-[#efefef]">
                
                <div className="w-[10%] text-[16px] text-[#e93323] font-custom2 font-semibold ">
                    1.
                </div>
                <div className="w-[90%] h-full">
                    
                    <div className=" text-[16px] text-[#333] font-custom2 line-clamp-2">一只带着耳机的土拨鼠一只带着耳机的土拨鼠一只带着耳机的土拨鼠</div>

                    <div className="flex flex-row items-center mt-[20px]">
{/* 发布时间 */}
<div><img src="/images/clock.png" alt="pic"width={20} height={20} /></div>

<div className="ml-[6px] text-[#999] text-[14px] font-custom">2025-01-22 11:08</div>
</div>

                    </div>


            </div>


        </div>
    )
}