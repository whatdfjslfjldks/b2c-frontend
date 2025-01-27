import React from 'react';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: number;
  label: string;
  icon: string;
}


interface NavbarProps {
  selectedKey: number;          
  setSelectedKey: (key: number) => void;  
}

const NavProductComponent: React.FC<NavbarProps> = ({ selectedKey, setSelectedKey }) => {
 const router = useRouter();
  const menuItems: MenuItem[] = [
    { id: 1, label: '猜你喜欢', icon: '/images/like.png' },
    { id: 2, label: '运动户外', icon: '/images/sport.png' },
    { id: 3, label: '馋嘴零食', icon: '/images/food.png' },
    { id: 4, label: '潮电数码', icon: '/images/phone.png' },
    { id: 5, label: '服饰时尚', icon: '/images/clothes.png' },
    { id: 6, label: '家装建材', icon: '/images/chatou.png' },
    { id: 7, label: '办公文具', icon: '/images/work.png' },
  ];

  return (
    <div className="flex flex-row w-full h-[40px] justify-center items-center">
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelectedKey(item.id)}
          className={`flex flex-row mr-[32px] cursor-pointer items-center w-[90px] h-[40px] ${
            selectedKey === item.id ? 'shadow-[0_2px_0_0_#ff5000]' : ''
          }`}
        >
          <div className="w-[24px] h-[24px]">
            <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
          </div>
          <div
            className={`text-[16px] ${selectedKey === item.id ? 'font-custom text-[#ff5000] font-bold' : 'text-[#1f1f1f]'}`}
          >
            {item.label}
          </div>
        </div>
      ))}
      <div onClick={()=>router.push("/productClassify")} className="border border-[#c6c6c6] ml-auto text-[#818181] cursor-pointer w-[58px] h-[24px] text-[12px] flex justify-center items-center">
        更多&nbsp;{">"}
      </div>
    </div>
  );
};

export default NavProductComponent;
