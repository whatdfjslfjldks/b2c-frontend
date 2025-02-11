'use client'
import React, { useEffect, useState } from 'react';

const SupportChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [supportID, setSupportID] = useState<string>(''); // 客服ID
  const socketRef = React.useRef<WebSocket | null>(null);

  useEffect(() => {
    // 获取 URL 参数中的 supportID
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('supportID');
    if (id) {
      setSupportID(id); // 设置客服 ID
    }

    // 确保 supportID 被正确获取，且连接 WebSocket
    if (supportID) {
      socketRef.current = new WebSocket(`ws://localhost:8081/support?supportID=${supportID}`);

      // 监听消息
      socketRef.current.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: msg.text }]);
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
    }
  }, [supportID]); // supportID 变化时重新建立连接

  // 发送消息
  const handleSendMessage = () => {
    if (message && socketRef.current) {
      const msg = { sender: 'support', text: message };
      socketRef.current.send(JSON.stringify(msg)); // 发送消息
      setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>客服聊天界面</h2>
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

export default SupportChat;
