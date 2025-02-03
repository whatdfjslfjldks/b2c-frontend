// 'use client'
// import React, { useState } from 'react';

// export default function Chat() {
//     const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]); // 聊天消息
//     const [input, setInput] = useState(''); // 用户输入
//     const [loading, setLoading] = useState(false); // 控制加载状态
//     const [messageCount, setMessageCount] = useState(0); // 记录当前消息数
//     const [abortController, setAbortController] = useState<AbortController | null>(null); // 用于中断请求

//     // 生成文本的异步函数
//     async function generateText(prompt: any) {
//         const controller = new AbortController();
//         setAbortController(controller);

//         try {
//             const response = await fetch("http://localhost:8080/api/ai-server/talk", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     prompt: prompt,
//                 }),
//                 signal: controller.signal,
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             // 处理流式响应
//             if (response.body) {
//                 const reader = response.body.getReader();
//                 const decoder = new TextDecoder("utf-8");

//                 let fullResponse = "";
//                 let done = false;

//                 while (!done) {
//                     const { value, done: chunkDone } = await reader.read();
//                     done = chunkDone;

//                     const chunk = decoder.decode(value, { stream: true });
//                     const lines = chunk.split("\n\n");

//                     for (const line of lines) {
//                         if (line) {
//                             fullResponse += line;
//                             setMessages((prevMessages) => [
//                                 ...prevMessages.slice(0, prevMessages.length - 1),
//                                 { sender: "Bot", text: fullResponse },
//                             ]);
//                         }
//                     }
//                 }
//                 setLoading(false);
//             }
//         } catch (error) {
//             if (controller.signal.aborted) {
//                 console.log("Request aborted by user");
//             } else {
//                 console.error("Error generating text:", error);
//             }
//             setLoading(false);
//         }
//     }

//     const handleSendMessage = () => {
//         if (!input || messageCount >= 10) return;

//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: 'User', text: input },
//         ]);
//         setInput('');
//         setLoading(true);
//         setMessageCount((prevCount) => prevCount + 1);

//         generateText(input).catch((err) => {
//             console.error("Error generating text:", err);
//             setLoading(false);
//         });

//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: 'Bot', text: "正在思考..." }
//         ]);
//     };

//     const handleAbortRequest = () => {
//         if (abortController && !abortController.signal.aborted) {
//             abortController.abort();
//             setLoading(false);
//             setMessages((prevMessages) => [
//                 ...prevMessages,
//                 { sender: 'Bot', text: "回答已中断。" }
//             ]);
//         }
//     };

//     const handleResetChat = () => {
//         setMessages([]);
//         setMessageCount(0);
//     };

//     return (
//         <div className="flex flex-col p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg h-[550px]">
//             <div className="text-center mb-4">
//                 <div className="text-10xl font-semibold">聊天机器人</div>
//             </div>

//             <div className="flex-1 overflow-y-auto mb-4">
//                 <div className="space-y-4">
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
//                             <div className={`flex items-center space-x-3 ${msg.sender === 'User' ? 'flex-row-reverse' : ''}`}>
//                                 {msg.sender !== 'User' && <img src="/images/go.jpg" alt="Bot Avatar" className="w-10 h-10 rounded-full" />}
//                                 <div className={`p-3 rounded-xl max-w-xs ${msg.sender === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-1000'}`}>
//                                     <p>{msg.text}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex items-center gap-10 mt-4">
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     className="flex-1 p-10 border rounded-md shadow-sm focus:outline-none focus:ring-10 focus:ring-blue-500"
//                     placeholder="输入消息..."
//                     disabled={loading || messageCount >= 10}
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="px-4 py-10 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
//                     disabled={loading || messageCount >= 10}
//                 >
//                     发送
//                 </button>
//             </div>

//             {loading && (
//                 <div className="text-center mt-4">
//                     <button
//                         onClick={handleAbortRequest}
//                         className="px-4 py-10 border rounded-md text-blue-500 hover:bg-blue-100"
//                     >
//                         中断回答
//                     </button>
//                 </div>
//             )}

//             {messageCount >= 10 && (
//                 <div className="text-center mt-4 italic text-gray-600">
//                     <p>对话已达到最大限制，点击刷新开始新对话</p>
//                     <button
//                         onClick={handleResetChat}
//                         className="mt-10 px-4 py-10 border rounded-md text-blue-500 hover:bg-blue-100"
//                     >
//                         刷新
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }



'use client'

import { fetchAPI } from "@/api/fetchApi"
import { listenProductInfo } from "@/middleware/broadcast/sendPoductInfo"
import { Button } from "@mui/material"
import { useEffect } from "react"



// message UploadSecKillProductRequest{
//     string name = 1;
//     string description = 2;
//     double original_price = 3;
//     double price = 4;
//     int32 stock = 5;
//     string start_time = 6;
//     string duration = 7;
//     repeated Sec_img img = 8; // 图片列表 默认取第一张做封面
//     repeated Sec_type type = 9; // 类别列表
//     int32 session_id=10; // 场次,具体含义查看enums包
//     int32 category_id=11;
//   }
// request
// message Sec_type{
//     string type_name = 1;
//   }
//   message Sec_img{
//     string img_url = 1;
//   }
  
export default function Test() {

    const handleClick = () => {
        fetchAPI('/product-server/uploadSecKillProduct', {
            method: 'POST',
            body: JSON.stringify({
                name: "秒杀商品名称",                   // 商品名称
                description: "商品描述",               // 商品描述
                original_price: 99.99,                 // 原始价格
                price: 89.99,                          // 当前价格
                stock: 100,                            // 商品库存
                start_time: "2025-02-05T10:00:00Z",    // 秒杀开始时间
                duration: "3600",                      // 秒杀持续时间，单位秒
                img: [
                    { img_url: "https://example.com/img1.jpg" },  // 图片1
                    { img_url: "https://example.com/img2.jpg" },  // 图片2
                ],  
                type: [
                    { type_name: "电子产品" },  // 类别1
                    { type_name: "手机" },      // 类别2
                ], 
                session_id: 1,                         // 场次ID
                category_id: 101,                      // 类别ID
            })
        })
    }

    useEffect(()=>{
        listenProductInfo((data:any) => {
            if(data.type === "2"){
                console.log('New product added:', data.msg);
            }
        })
    })

    return (
        <div>
            <Button onClick={handleClick} variant="outlined">
                Test
            </Button>
        </div>
    )
}
