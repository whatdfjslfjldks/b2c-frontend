"use client";

import { useState } from "react";
import NavProductComponent from "./navProductComponent";
import Products from "./products";

export default function ProductList() {
  const [selectedKey, setSelectedKey] = useState(1); 

  return (
    <div className="flex  flex-col p-[15px] w-full h-[800px] mt-[20px]">
      {/* 导航栏 */}
      <NavProductComponent selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      <Products selectedKey={selectedKey} />
    </div>
  );
}
