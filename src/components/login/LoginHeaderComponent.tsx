'use client'

import { useRouter } from "next/navigation"

export default function LoginHeaderComponent(){
    const router=useRouter()
    return (
        <div 
        style={{
            display:"flex",
            width:"100%",
            height:"100px",
            backgroundColor:"white",
            // justifyContent:"center",
            alignItems:"center",
        }}>
      <div
      onClick={() => {router.push("/")}}
       style={{
        marginLeft:"20px",
        cursor:"pointer",
      }}>
     <img 
     src="/images/PBLOG.png"
     alt="logo"
     width={240}
     />
        </div>

        <div style={{
            marginLeft:"auto",
            marginRight:"20px",
            display:"flex",
           gap:"20px",
        }}>
            <div>
            品种齐全
            </div>

            <div>
            低价畅选
            </div>

            <div>
            正品行货
            </div>
        </div>



        </div>
    )
}