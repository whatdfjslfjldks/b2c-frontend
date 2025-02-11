'use client';

import React, {  useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getUserFromLocalStorage, isLogin, loadUserFromLocalStorage, removeUserFromLocalStorage } from '../middleware/redux/userInfoSlice';
import { isTokenValid } from "@/api/token";
import {message} from 'antd'
import useSWR from "swr";


// 无感登录
export const TokenChecker = (props: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const auth =async()=>{
    if (!isLogin()){
      return
    }
    isTokenValid().then((res)=>{
      // 双token过期
     if (!res){
      messageApi.error("登录过期，请重新登录")
      dispatch(removeUserFromLocalStorage());
      // console.log("token is expired")
     }else{
      // console.log("token is ok")
     }
    })
  }

  const {data,error,isLoading}=useSWR(
    "token-check",
    auth,
    {
      refreshInterval: 5*1000, // 5s一次 
    }

  )


  return (
    <div>
      {contextHolder}
      {props.children}
    </div>
  );
};


