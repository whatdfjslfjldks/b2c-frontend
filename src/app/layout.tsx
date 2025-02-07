'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../middleware/redux/store';
import { TokenChecker } from "@/auth/auth";
import "../styles/globals.css"
// 邪了门了，我是react18.3.1 他说部分功能19用不了，无视风险强制按照补丁包，嘿，好了
import '@ant-design/v5-patch-for-react-19'; // 我是补丁包


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /iphone|ipod|android|windows phone|blackberry|mobile|tablet/.test(userAgent);
    setIsMobile(mobile);
    if (mobile){
      return;
    }
  }, []);

  if (isMobile) {
    return (
      <html>
        <body>
        <div>
        暂时不支持移动端访问！
      </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <TokenChecker>
            {children}
            </TokenChecker>
        </Provider>
      </body>
    </html>
  );
}



