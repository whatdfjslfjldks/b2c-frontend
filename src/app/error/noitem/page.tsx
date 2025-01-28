'use client'


export default function NoItem() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">商品不存在</h1>
      <p className="text-lg text-gray-600">
       目标商品不存在！
      </p>
    </div>
  );
}