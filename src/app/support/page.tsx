'use client'

import { useEffect, useRef, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import FaceIcon from '@mui/icons-material/Face'
import { fetchAPI } from '@/api/fetchApi'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/middleware/redux/store'
import { useRouter } from 'next/navigation'

interface Message {
  sender: string;
  text: string;
}
export default function Support() {
  const [inputMessage, setInputMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg,setMsg]=useState<Message[]>([])
  const { userInfo } = useSelector((state: RootState) => state.user);
  const router=useRouter()
  const socket=useRef<WebSocket | null>(null)

  useEffect(()=>{
    if(!userInfo || !userInfo?.userId || userInfo.userId===undefined){
      message.info("请先登录")
      router.push("/login")
    }
  },[userInfo])
  
  // 处理输入框的内容
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }

  // 处理表情选择
  const handleEmojiSelect = (emoji: any) => {
    setInputMessage(prev => prev + emoji.native)
    setShowEmojiPicker(false) // 选择表情后关闭选择器
  }

  // 发送消息
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const a={
        "sender":userInfo?.username,
        "text":inputMessage
      }
      setMsg((prev)=>[
        ...prev,
        {
          sender:userInfo!.username,
          text:inputMessage
        }
      ])
      setInputMessage('') // 清空输入框
      socket.current?.send(JSON.stringify(a))
    }
  }

  const handleFind=()=>{
    if(!userInfo || !userInfo?.userId || userInfo.userId===undefined){
      message.info("请先登录")
      router.push("/login")
    }
    fetch("http://localhost:8081/api/support-server/findSupport",{
      method:"POST"
    })
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      if(data.code===200){
        setMsg((prev)=>[
          ...prev,
          {
            sender:"tip",
            text: `${data.msg}: ${data.data}`
          }
        ])
        connect(userInfo!.userId,data.data)
      }else{
        setMsg((prev)=>[
          ...prev,
          {
            sender:"tip",
            text: `${data.msg}`
          }
        ])
      }
    })
  }

  const connect = (userid:number,id:string) => {
    socket.current = new WebSocket(`ws://localhost:8081/api/support-server/connect?userID=${userid}&supportID=${id}`);
  
    // 当 WebSocket 连接建立成功时
    socket.current.onopen = () => {
      console.log('WebSocket 连接成功');
      // message.info('连接成功');
      setMsg((prev)=>[
        ...prev,
        {
          sender:"tip",
          text: "连接成功"
        }
      ])
    };
  
    // 当收到服务器消息时
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMsg((prev)=>[
        ...prev,
        {
          sender:data.sender,
          text: data.text
        }
      ])
    };
  
    // 当 WebSocket 连接出错时
    socket.current.onerror = (error) => {
      console.error('WebSocket 错误:', error);
    };
  
    // 当 WebSocket 连接关闭时
    socket.current.onclose = () => {
      console.log('WebSocket 连接关闭');
    };
  };
  

  return (
    <div
      style={{
        backgroundSize: '100%,100%',
      }}
      className="flex justify-center items-center w-full min-h-screen bg-no-repeat bg-[url(/images/loginBk.jpg)]"
    >
      <div className="flex flex-col w-[800px] h-[590px] bg-white">
        {/* 标头 */}
        <div className="flex flex-row items-center h-[80px] bg-[#eee]">
          <img
            src="/images/go.jpg"
            className="ml-[20px] w-[60px] h-[60px] rounded-full"
            alt="support"
          />
          <div className="flex flex-col ml-[20px]">
            <div className="text-[16px] text-[#111]">土拨鼠客服</div>
            <div className="text-[12px] text-[#666666]">
              有问题请联系我哦~，鼠鼠会尽快为您分配客服！
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex flex-col overflow-y-auto p-4 space-y-3 ">
         {/* 显示所有消息 */}
      {msg && msg?.map((message, index) => (
        <div 
          key={index}
          className="flex flex-row bg-gray-100 rounded-xl p-3"
        >
          <div className='text-sm text-gray-900 mr-2'>
            {message.sender}
          </div>
          <div className="text-sm text-gray-900">
            
            {message.text}
          </div>
        </div>
      ))}
        
          {/* <div className="flex justify-start items-start bg-gray-100 rounded-xl p-3">
            <div className="text-sm text-gray-900">您好，如何帮您呢？</div>
          </div>  */}
        </div>

        {/* 输入栏 */}
        <div className="flex flex-row mt-auto h-[80px] bg-[#eee] p-4 items-center">
        
          {/* 表情按钮 */}
          <button
            className="mr-4 text-xl"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>

          {/* 输入框 */}
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="输入消息"
            className="flex-grow p-2 border border-gray-300 rounded-lg"
          />

          {/* 发送按钮 */}
          <button
            onClick={handleSendMessage}
            className="ml-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            发送
          </button>

          <div onClick={handleFind} className='cursor-pointer ml-[20px] hover:bg-gray-300 active:bg-gray-400 p-2 rounded-lg transition duration-300 ease-in-out'>
      <FaceIcon sx={{ fontSize: 24 }} className="mr-2" />
      <span className="text-[18px]">转人工</span>
    </div>

          {/* 表情选择器 */}
          {showEmojiPicker && (
            <div className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 z-10">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
