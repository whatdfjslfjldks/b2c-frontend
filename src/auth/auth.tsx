'use client';


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setUserInfo, setLoading, setError } from '../redux/userInfoSlice';




const Auth = ({ children }: { children: React.ReactNode }) => {

    const { userInfo, loading, error } = useSelector((state: RootState) => state.user);


    useEffect(()=>{
      // if (userInfo){
      //   console.log("12312:",userInfo)
      // }
      // console.log("12")
    },[])

  return (
    <div>
      {children}
    </div>
  );
};

export default Auth;

