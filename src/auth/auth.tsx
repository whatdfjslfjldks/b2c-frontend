'use client';


import React, { createContext, useContext } from "react";
import { useDispatch } from 'react-redux';


const DispatchContext = createContext<any>(null);


export const DispatchProvider = (props: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  return (
    <DispatchContext.Provider value={dispatch}>
      {props.children}
    </DispatchContext.Provider>
  );
};

// 创建一个自定义 hook 来方便地访问 dispatch
export const useAppDispatch = () => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("useAppDispatch must be used within a DispatchProvider");
  }
  return dispatch;
};



