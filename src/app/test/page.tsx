'use client'
import { useEffect } from 'react';
import useSWR from 'swr'
 
const fetcher = (url: string) => fetch(url).then(
    (res)=>{
        console.log('res:', res);
        return res.json()
    }
)
export default function Profile() {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/ping`, fetcher)
 useEffect(()=>{
    if(data){
        console.log("fuck: ",data)
    }
 },[data])
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}