'use client';

import React, { useEffect } from 'react';
import { message } from 'antd';
import { listenMsg, sendMsg } from '@/middleware/broadcast/messager';

export const MessagerLayout = (props: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const handleMsg = (data: any) => {
      console.log('messagerLayout', data);
      if (data.type === 'msg') {
        messageApi.error(data.msg);
      }
    };

    // 调用 listenMsg 并传入回调函数
    listenMsg(handleMsg);

    // 返回一个清理函数，用于在组件卸载时取消监听
    return () => {
      // 假设 listenMsg 提供了一个取消监听的方法，例如 unlistenMsg
      // 如果没有，你需要自己实现一个取消监听的逻辑
    //   unlistenMsg(handleMsg);
    };
  }, [messageApi]);

  return (
    <div>
      {contextHolder}
      {props.children}
    </div>
  );
};