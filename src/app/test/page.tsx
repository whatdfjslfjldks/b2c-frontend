// 'use client'


// import React, { useState, useRef } from 'react';
// import { Button, TextField, Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
// import { styled } from '@mui/system';

// const ChatContainer = styled(Box)({
//     display: 'flex',
//     flexDirection: 'column',
//     width: '400px',
//     margin: 'auto',
//     padding: '16px',
//     backgroundColor: '#f7f7f7',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
// });

// const MessageList = styled(List)({
//     maxHeight: '400px',
//     overflowY: 'auto',
//     marginBottom: '16px',
//     padding: '8px',
// });

// const ChatMessage = styled(ListItem)(({ sender }: { sender: string }) => ({
//     backgroundColor: sender === 'User' ? '#d1f7d1' : '#f0f0f0',
//     borderRadius: '8px',
//     marginBottom: '8px',
//     padding: '12px',
//     alignSelf: sender === 'User' ? 'flex-end' : 'flex-start',
//     maxWidth: '70%',
//     wordBreak: 'break-word',
// }));

// const InputContainer = styled(Box)({
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
// });

// const ChatFooter = styled(Box)({
//     marginTop: '16px',
//     textAlign: 'center',
//     fontStyle: 'italic',
//     color: '#888',
// });

// export default function AI() {
//     const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]); // 聊天消息
//     const [input, setInput] = useState(''); // 用户输入
//     const [loading, setLoading] = useState(false); // 控制加载状态
//     const [messageCount, setMessageCount] = useState(0); // 记录当前消息数
//     const [abortController, setAbortController] = useState<AbortController | null>(null); // 用于中断请求

//     // 生成文本的异步函数
//     async function generateText(prompt: string) {
//         const controller = new AbortController();
//         setAbortController(controller);

//         try {
//             const response = await fetch("http://localhost:11434/api/generate", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     model: "deepseek-r1:1.5b", // 模型名称和版本
//                     prompt: prompt, // 输入的提示
//                     stream: true, // 启用流式响应
//                 }),
//                 signal: controller.signal // 传递中断信号
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             // 处理流式响应
//             if (response.body) {
//                 const reader = response.body.getReader();
//                 const decoder = new TextDecoder("utf-8");

//                 // 读取流数据并逐块处理
//                 let fullResponse = "";
//                 reader.read().then(function processText({ done, value }) {
//                     if (done) {
//                         console.log("Stream complete");
//                         setLoading(false);
//                         return;
//                     }

//                     const chunk = decoder.decode(value, { stream: true });
//                     const parsedChunk = JSON.parse(chunk); // 解析每个块
//                     if (parsedChunk.response) {
//                         fullResponse += parsedChunk.response; // 只保留 response 字段
//                     }

//                     // 更新消息内容
//                     setMessages((prevMessages) => [
//                         ...prevMessages.slice(0, prevMessages.length - 1),
//                         { sender: 'Bot', text: fullResponse }
//                     ]);

//                     // 继续读取下一个数据块
//                     reader.read().then(processText);
//                 }).catch((error) => {
//                     if (controller.signal.aborted) {
//                         console.log("Request was aborted");
//                     } else {
//                         console.error("Stream reading error:", error);
//                     }
//                     setLoading(false);
//                 });
//             }
//         } catch (error) {
//             // 处理被中断的情况
//             if (controller.signal.aborted) {
//                 console.log("Request aborted by user");
//             } else {
//                 console.error("Error generating text:", error);
//             }
//             setLoading(false);
//         }
//     }

//     // 处理用户点击发送消息
//     const handleSendMessage = () => {
//         if (!input || messageCount >= 10) return; // 如果没有输入或已达到最大消息数，不执行

//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: 'User', text: input },
//         ]);
//         setInput('');
//         setLoading(true);
//         setMessageCount((prevCount) => prevCount + 1); // 增加消息计数

//         // 发送消息并获取回复
//         generateText(input).catch((err) => {
//             console.error("Error generating text:", err);
//             setLoading(false);
//         });

//         // 添加一个等待机器人的消息
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: 'Bot', text: "正在思考..." }
//         ]);
//     };

//     // 中断正在进行的请求
//     const handleAbortRequest = () => {
//         if (abortController && !abortController.signal.aborted) {
//             abortController.abort(); // 中断请求
//             setLoading(false); // 停止加载状态
//             setMessages((prevMessages) => [
//                 ...prevMessages,
//                 { sender: 'Bot', text: "回答已中断。" }
//             ]);
//         }
//     };

//     // 重置聊天
//     const handleResetChat = () => {
//         setMessages([]);
//         setMessageCount(0);
//     };

//     return (
//         <ChatContainer>
//             <Typography variant="h5" align="center" gutterBottom>聊天机器人</Typography>
//             <MessageList>
//                 {messages.map((msg, index) => (
//                     <ChatMessage key={index} sender={msg.sender}>
//                         <ListItemText primary={msg.text} />
//                     </ChatMessage>
//                 ))}
//             </MessageList>

//             {/* 输入框和发送按钮 */}
//             <InputContainer>
//                 <TextField
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     variant="outlined"
//                     fullWidth
//                     placeholder="输入消息..."
//                     sx={{ marginRight: 1 }}
//                     disabled={loading || messageCount >= 10}
//                 />
//                 <Button onClick={handleSendMessage} variant="contained" disabled={loading || messageCount >= 10}>
//                     发送
//                 </Button>
//             </InputContainer>

//             {/* 中断按钮 */}
//             {loading && (
//                 <Box sx={{ marginTop: 2, textAlign: 'center' }}>
//                     <Button variant="outlined" onClick={handleAbortRequest}>中断回答</Button>
//                 </Box>
//             )}

//             {/* 提示文本 */}
//             {messageCount >= 10 && (
//                 <ChatFooter>
//                     <Typography variant="body2" color="textSecondary">
//                         对话已达到最大限制，点击刷新开始新对话
//                     </Typography>
//                     <Button variant="outlined" onClick={handleResetChat}>刷新</Button>
//                 </ChatFooter>
//             )}

//             {loading && <Box sx={{ marginTop: 2, textAlign: 'center' }}>正在加载...</Box>}
//         </ChatContainer>
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
