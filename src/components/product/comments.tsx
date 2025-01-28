'use client'

import { useState } from "react";
import { Menu, Dropdown } from "antd";
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface CommentsProps {
    productId: number;
}

const Comments: React.FC<CommentsProps> = ({ productId }) => {
    const [shaixuan, setShaixuan] = useState<number | null>(1);
    const [sortOption, setSortOption] = useState<string>('默认排序');

    // 选择排序方式
    const handleSortSelect: MenuProps['onClick'] = (e) => {
        // 获取选中的label
        setSortOption((e.domEvent.target as HTMLElement).innerText);
    };

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: '默认排序',
        },
        {
          key: '2',
          label: '时间排序',
        },
    ];

    return (
        <div className="flex flex-col p-2 w-full h-full">
            <div className="text-[20px] h-[20px] mt-[10px] text-[#11192d] font-semibold font-custom3">
                用户评价
            </div>

            {/* 评论筛选导航栏 */}
            <div className="flex flex-row items-center mt-[10px] w-full h-[50px] ">
                <div onClick={() => { setShaixuan(1) }} className={`text-[#666] text-[16px] font-normal font-custom3 cursor-pointer ${shaixuan === 1 ? 'text-[#1a1a1a] font-semibold' : '' }`}>
                    全部(1万+)
                </div>
                <div onClick={() => { setShaixuan(2) }} className={`text-[#666] ml-[20px] text-[16px] font-normal font-custom3 cursor-pointer ${shaixuan === 2 ? 'text-[#1a1a1a] font-semibold' : '' }`}>
                    有图/视频(400+)
                </div>
                <div onClick={() => { setShaixuan(3) }} className={`text-[#666] ml-[20px] text-[16px] font-normal font-custom3 cursor-pointer ${shaixuan === 3 ? 'text-[#1a1a1a] font-semibold' : '' }`}>
                    追评(100+)
                </div>

                <div className="flex justify-center items-center ml-[auto] bg-[#fff] border border-[#dadde0] h-[32px] w-[92px] rounded-md hover:bg-[#f3f6f8] cursor-pointer">
                    <Dropdown
                        menu={{ items, onClick: handleSortSelect }} // 通过 onClick 获取 label
                        trigger={['click']}
                    >
                        <div className="text-[#11192d] text-[14px] font-custom">
                            {sortOption} <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </div>

            {/* 用户评论，分页 */}
            <div className="flex flex-col w-full h-[calc(100%-90px)]">

                <div className="flex flex-row w-full h-[200px] shadow-[0_1px_0_0_#efefef]">

                    {/* 头像 */}
                    <div className="flex flex-col border border-[#7a7a7a] rounded-full items-center w-[60px] h-[60px] mt-[10px]">
                        <img 
                        src="/images/go.jpg"
                         alt="pic"
                          width={60}
                           height={60}
                           className="rounded-full object-contain"
                            />
                    </div>
                    {/* 名字评论 */}
                    <div className="flex flex-col ml-[10px] w-[calc(100%-90px)] h-full">
                        
                        <div className="text-[#11192d] text-[16px] font-medium font-custom3 line-clamp-1">
                            一只戴耳机的土拨鼠还有俩大门牙
                        </div>
                        <div className="text-[#50607a] mt-[2px] font-custom4 text-[14px]">
                        2024年12月7日
                        </div>
                        {/* 评论 */}
                        <div className="text-[#11192d] text-[14px] font-custom4 mt-[5px] line-clamp-3">
                        一只戴耳机的土拨鼠还有俩大门牙  一只戴耳机的土拨鼠还有俩大门牙  一只戴耳机的土拨鼠还有俩大门牙
                        </div>
                        {/* 图片列表 */}
                        <div className="flex flex-row mt-[10px]">
                            <img 
                            className="border border-[#7a7a7a] rounded-xl"
                            src="/images/go.jpg"
                             alt=""
                             width={80}
                             height={80}
                              />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Comments;
