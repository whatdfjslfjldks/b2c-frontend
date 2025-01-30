'use client'
import { useRouter } from "next/navigation";

export default function NoNetwork() {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">网络连接失败</h1>
      <p className="text-lg text-gray-600">
        似乎您的网络连接出现问题，无法加载页面。
      </p>
      <div className="mt-6">
        <button
          onClick={() => router.back()} 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          重试
        </button>
      </div>
    </div>
  );
}
