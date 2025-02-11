'use client'
import React, { useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = React.useRef<WebSocket | null>(null);
  const searchParams = useSearchParams();
  const userID = searchParams.get('userID');

  useEffect(() => {
    // 创建 WebSocket 连接
    socketRef.current = new WebSocket(`ws://localhost:8081/chat?userID=${userID}`);

    // 监听消息
    socketRef.current.onmessage = (event) => {
        console.log('消息:', event.data);
      const msg = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, { sender: msg.sender, text: msg.text }]);
    };

    // WebSocket 连接打开时
    socketRef.current.onopen = () => {
      console.log('Connected to server');
    };

    // WebSocket 连接关闭时
    socketRef.current.onclose = () => {
      console.log('Disconnected from server');
    };

    // 清理函数
    return () => {
      socketRef.current?.close();
    };
  }, [userID]);

  // 发送消息
  const handleSendMessage = () => {
    if (message && socketRef.current) {
      const msg = { sender: 'user', text: message };
      socketRef.current.send(JSON.stringify(msg)); // 发送消息
      setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>与客服聊天</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.sender}: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="输入消息..."
      />
      <button onClick={handleSendMessage}>发送</button>
    </div>
  );
};

export default UserChat;
