'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import LoginLayout from '@/components/login/LoginHeaderComponent';
import FootLayout from '@/components/bottom/bottomComponent';
import { ToastContainer } from 'react-toastify';
const UsernameLogin = React.lazy(() => import('@/components/login/usernameLogin'));
const EmailLogin = React.lazy(() => import('@/components/login/emailLogin'));

const LoginForm: React.FC = () => {
  const [isUsernameLogin, setIsUsernameLogin] = useState(true);

  const toggleLoginMethod = () => {
    setIsUsernameLogin((prev) => !prev); // 切换登录方式
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // 子元素按列排列
        minHeight: '100vh', // 高度占满整个视口
        width: '100%', // 宽度占满整个视口
      }}
    >
      <LoginLayout />
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url(/images/loginBk.jpg)', 
          backgroundSize: 'cover', // 背景图片自适应
          backgroundPosition: 'center', // 背景居中显示
          position: 'relative', // 让 Paper 层级在背景之上
        }}
      >
                  {isUsernameLogin ? <UsernameLogin /> : <EmailLogin />}
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 40,
            left: '50%', // 水平居中
            transform: 'translateX(-50%)', // 根据宽度调整位置，使其完全居中

            zIndex:999,
          }}
        >
          <div
            onClick={toggleLoginMethod}
            style={{
              color: 'blue',
              fontSize: '16px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isUsernameLogin ? '邮箱登录' : '密码登录'}
          </div>
        </Box>
      </div>
      <FootLayout />
    </div>
  );
};

export default LoginForm;
