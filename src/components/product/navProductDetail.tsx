import React from 'react';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: number;
  label: string;
}


interface NavbarProps {
  selectedKey: number;          
  setSelectedKey: (key: number) => void;  
}

const NavProductDetail: React.FC<NavbarProps> = ({ selectedKey, setSelectedKey }) => {
 const router = useRouter();
  const menuItems: MenuItem[] = [
    { id: 1, label: '用户评价'},
    { id: 2, label: '图文详情' },
    { id: 3, label: '猜你喜欢'},
  ];

  return (
    <div className="flex flex-row w-full h-[40px] items-center">
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelectedKey(item.id)}
          className={`flex flex-row mr-[32px] cursor-pointer justify-center items-center w-[90px] h-[40px] ${
            selectedKey === item.id ? 'shadow-[0_2px_0_0_#ff5000]' : ''
          }`}
        >
          <div
            className={`text-[16px] ${selectedKey === item.id ? 'font-custom text-[#ff5000] font-bold' : 'text-[#1f1f1f]'}`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavProductDetail;
