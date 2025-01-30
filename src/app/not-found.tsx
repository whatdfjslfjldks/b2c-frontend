export default function NotFound() {
    return (
      <div className="flex items-center justify-center h-screen text-black">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold mb-4">404</h1>
          <p className="text-xl mb-4">当前界面不存在！</p>
          <p className="text-lg">抱歉，我们找不到你请求的页面。</p>
          <a href="/" className="mt-6 inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
            返回首页
          </a>
        </div>
      </div>
    );
  }
  