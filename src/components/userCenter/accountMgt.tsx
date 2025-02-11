'use client'

import { fetchAPI } from "@/api/fetchApi"
import { getAccessToken } from "@/api/token"
import { message } from "antd"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { removeUserFromLocalStorage } from "@/middleware/redux/userInfoSlice"

interface User{
    avatar_url: string;
    name:       string;
    email:      string;
    user_id:    number;
    bio:        string;
    create_at:  string;
}
export default function AccountMgt() {
    const [userInfo,setUserInfo]=useState<User|null>(null)
    const dispatch = useDispatch()
    function handleLogout() {
        message.info("退出登录成功")
        dispatch(removeUserFromLocalStorage());
      }

    useEffect(() => {
        fetchAPI("/user-server/getUserInfoByUserId",{
            method:'POST',
            headers:{
                'Access-Token': getAccessToken() ?? ''
            }
        })
        .then((data)=>{
            if(data.code===200){
                setUserInfo(data.data)
            }else{
                message.error(data.msg)
            }
        })
    }, [])

    const handleAvatarChange=()=>{
        
    }


  return (
    <div className="flex flex-col overflow-auto">
        <div className="border-b h-[50px] border-[#ececec] text-[18px] text-[#282828] font-custom">
            账号管理
        </div>

        <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[120px]">
            <div className="text-[16px] w-[70px] text-[#777]">
            我的头像:
            </div>
            <div className="ml-[40px] w-[100px] h-[85px] relative">
                {userInfo?.avatar_url &&
                                <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${userInfo?.avatar_url}`}
                                alt="avatar"
                                fill={true}
                                />
                }
                <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 w-[100px] h-[85px] opacity-0 cursor-pointer"
                    />
            </div>

        </div>

        <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
            <div className="text-[16px] w-[70px] text-[#777]">
            我的昵称:
            </div>
            <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                {userInfo?.name}
            </div>
            <div className="ml-auto text-[#e93323] mt-[20px] font-custom text-[16px] cursor-pointer">
                修改
            </div>
        </div>

        <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
            <div className="text-[16px] w-[70px] text-[#777]">
            简介:
            </div>
            <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                {userInfo?.bio}
            </div>
            <div className="ml-auto text-[#e93323] mt-[20px] font-custom text-[16px] cursor-pointer">
                修改
            </div>
        </div>

        <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
            <div className="text-[16px] w-[70px] text-[#777]">
            邮箱:
            </div>
            <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                {userInfo?.email}
            </div>
            <div className="ml-auto text-[#e93323] mt-[20px] font-custom text-[16px] cursor-pointer">
                修改
            </div>
        </div>

        <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
            <div className="text-[16px] w-[70px] text-[#777]">
            我的ID:
            </div>
            <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                {userInfo?.user_id}
            </div>
        </div>

        <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
            <div className="text-[16px] w-[70px] text-[#777]">
            密码设置:
            </div>
            <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                {`******`}
            </div>
            <div className="ml-auto text-[#e93323] mt-[20px] font-custom text-[16px] cursor-pointer">
                修改密码
            </div>
        </div>

        <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
            <div className="text-[16px] w-[70px] text-[#777]">
            创建时间:
            </div>
            <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
               {userInfo?.create_at}
            </div>
        </div>

        <div className="mt-[20px] ml-auto">
            <Button onClick={handleLogout} variant="contained" color="primary" >
                退出登录
            </Button>
        </div>

    
    </div>
  )
}