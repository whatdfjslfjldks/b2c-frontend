'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../work/redux/store';
import { DispatchProvider } from "@/auth/auth";
import "../styles/globals.css"




export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // console.log("useEffect");
    // 判断设备是否是手机
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
          {/* <main> */}
          <DispatchProvider>
            {children}
            </DispatchProvider>
            {/* </main> */}
        </Provider>
      </body>
    </html>
  );
}



