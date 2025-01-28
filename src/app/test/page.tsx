'use client'

import { fetchAPI } from "@/api/fetchApi"
import { Button } from "@mui/material"


export default function Test(){

    function handleClick(){
        fetchAPI("/ping")
        .then((data)=>{
            console.log(data)
        })
    }

    return (
        <div>
            <Button     variant="contained"  onClick={handleClick}>
                测试
            </Button>
        </div>
    )
}