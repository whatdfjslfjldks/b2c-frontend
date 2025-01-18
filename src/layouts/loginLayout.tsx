'use client'

export default function LoginLayout(){
    return (
        <div style={{
            display:"flex",
            width:"100%",
            height:"100px",
            backgroundColor:"white",
            // justifyContent:"center",
            alignItems:"center",
        }}>
      <div style={{
        marginLeft:"20px"
      }}>
     <img 
     src="/images/logo.png"
     alt="logo"
     width={120}
     />
        </div>
        <div style={{
            marginLeft:"20px"
        }}>
            亚🐎孙
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