'use client';


import React, {  useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from '@/work/redux/userInfoSlice';



export const DispatchProvider = (props: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUserFromLocalStorage());
  },[])

  return (
    <div>
      {props.children}
    </div>
  );
};


