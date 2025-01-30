'use client'
import { fetchAPI } from '@/api/fetchApi';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import useSWR from 'swr'

export default function Test(){
    function handleClick(){
        fetchAPI("/product-server/getSecKillList?currentPage=1&pageSize=10&time=1")
        .then((data)=>{
            console.log("data: ",data);
        })
    }

//     function handleClick() {
//     // 假设这些数据已经在页面中获取到或填充
//     const secName = "11111";
//     const secDescription = "商品描述";
//     const secPrice = 99.99;
//     const secStock = 100;
//     const secStartTime = "2025-02-01T00:00:00Z";  // 格式示例: ISO 8601 日期时间
//     const secEndTime = "2025-02-01T23:59:59Z";    // 格式示例: ISO 8601 日期时间
//     const time=1;

//     // 假设这些数据来自用户输入或已有的图片和类型列表
//     const productImgs = [
//         {img_url: "/images/1.jpg" },
//         { img_url: "/images/2.jpg" },
//     ];

//     const productTypes = [
//         {  type_name: "电子产品" },
//         {  type_name: "手机配件" },
//     ];

//     // 构建请求体
//     const requestBody = {
//         sec_name: secName,
//         sec_description: secDescription,
//         sec_price: secPrice,
//         sec_original_price: secPrice,
//         sec_stock: secStock,
//         sec_start_time: secStartTime,
//         sec_end_time: secEndTime,
//         sec_img: productImgs,
//         sec_type: productTypes,
//         time:time,
//     };

//     // 发送POST请求
//     fetchAPI("/product-server/uploadSecKillProduct", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//     })
//     .then((data) => {
//         console.log("Response Data: ", data);
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });
// }

    

    return (
        <div>
<Button onClick={handleClick} variant='contained'>
    test
</Button>
        </div>

    )
}




// function handleClick() {
//     // 假设这些数据已经在页面中获取到或填充
//     const secName = "11111";
//     const secDescription = "商品描述";
//     const secPrice = 99.99;
//     const secStock = 100;
//     const secStartTime = "2025-02-01T00:00:00Z";  // 格式示例: ISO 8601 日期时间
//     const secEndTime = "2025-02-01T23:59:59Z";    // 格式示例: ISO 8601 日期时间
//     const time=1;

//     // 假设这些数据来自用户输入或已有的图片和类型列表
//     const productImgs = [
//         {img_url: "/images/1.jpg" },
//         { img_url: "/images/2.jpg" },
//     ];

//     const productTypes = [
//         {  type_name: "电子产品" },
//         {  type_name: "手机配件" },
//     ];

//     // 构建请求体
//     const requestBody = {
//         sec_name: secName,
//         sec_description: secDescription,
//         sec_price: secPrice,
//         sec_original_price: secPrice,
//         sec_stock: secStock,
//         sec_start_time: secStartTime,
//         sec_end_time: secEndTime,
//         product_img: productImgs,
//         product_type: productTypes,
//         time:time,
//     };

//     // 发送POST请求
//     fetchAPI("/product-server/uploadSecKillProduct", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//     })
//     .then((data) => {
//         console.log("Response Data: ", data);
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });
// }

 
// const fetcher = (url: string) => fetch(url).then(
//     (res)=>{
//         console.log('res:', res);
//         return res.json()
//     }
// )
// export default function Profile() {
//   const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/ping`, 
//   fetcher,
//   {
//     dedupingInterval: 30*1000,  // 30秒内不会重复请求相同url
// staleTime: 1*60*1000,  // 数据缓存时间1分钟
// revalidateOnMount:false,
// revalidateIfStale: true,  // 数据过期时才会重新请求
//   }
//   )
//  useEffect(()=>{
//     if(data){
//         console.log("fuck: ",data)
//     }
//  },[data])
//   if (error) return <div>failed to load</div>
//   if (isLoading) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }

// export default function Test(){

//     function handleUpload(e:any) {
//         // console.log(e.target.files[0]);
//         const formData=new FormData();
//         formData.append("file",e.target.files[0]);
//         fetchAPI("/product-server/uploadProductByExcel",{
//             method:"POST",
//             body:formData
//         })
//         .then((data)=>{
//             console.log("data: ",data);
//         })
//     }

//     return (
//         <div>
//             <input onChange={handleUpload} type="file" />
//         </div>
//     )
// }