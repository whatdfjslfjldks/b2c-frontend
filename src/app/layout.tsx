'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import  Auth  from '../auth/auth';
import "../styles/globals.css"
import MainLayout from '@/layouts/mainLayout';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 判断设备是否是手机
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /iphone|ipod|android|windows phone|blackberry|mobile|tablet/.test(userAgent);
    setIsMobile(mobile);
    if (mobile){
      return;
    }
    // if (userInfo){
    //   console.log("12312")
    // }
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
          <Auth>
            <MainLayout>
            {children}
            </MainLayout>
            </Auth>
            {/* </main> */}
        </Provider>
      </body>
    </html>
  );
}



