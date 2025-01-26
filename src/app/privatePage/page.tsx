'use client'

import { useEffect, useState } from "react"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loadingComponents";
import { CircularProgress } from "@mui/material";


export default function PrivatePage(){
    const user= useSelector((state: RootState) => state.user);
    const router=useRouter();
    const [isPermited,setIsPermitted]=useState(false)
    const [selectedKey,setSelectedKey]=useState(0)
    useEffect(()=>{
        // if(!user || user.userInfo?.role!=="admin"){
        //     // TODO 受保护的页面，如果需要保卫改成token发请求判断，role没有服务器端确认可以直接被篡改
        //     router.push("/")
        // }else{
        //     setIsPermitted(true)
        // }
    },[])

    // if (!isPermited) return (
    //     <div>
    //         身份校验中...   <CircularProgress color="inherit" />
    //     </div>
    // )

    return (
        <div>
            受保护的页面，需要amdin身份



        </div>
    )
}