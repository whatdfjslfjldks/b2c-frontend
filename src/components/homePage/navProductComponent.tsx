import React from 'react';
import { useRouter } from 'next/navigation';
import { menuItemsHomePage } from '@/types/enum/enum';

interface NavbarProps {
  selectedKey: number;          
  setSelectedKey: (key: number) => void;  
}

const NavProductComponent: React.FC<NavbarProps> = ({ selectedKey, setSelectedKey }) => {
 const router = useRouter();

  return (
    <div className="flex flex-row w-full h-[40px] justify-center items-center">
      {menuItemsHomePage.map((item) => (
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
