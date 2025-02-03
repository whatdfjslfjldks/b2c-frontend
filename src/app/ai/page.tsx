'use client'
import React, { useState } from 'react';

export default function AI() {
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]); // 聊天消息
    const [input, setInput] = useState(''); // 用户输入
    const [loading, setLoading] = useState(false); // 控制加载状态
    const [messageCount, setMessageCount] = useState(0); // 记录当前消息数
    const [abortController, setAbortController] = useState<AbortController | null>(null); // 用于中断请求

    // 生成文本的异步函数
    async function generateText(prompt: any) {
        const controller = new AbortController();
        setAbortController(controller);

        try {
            const response = await fetch("http://localhost:8080/api/ai-server/talk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 处理流式响应
            if (response.body) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");

                let fullResponse = "";
                let done = false;

                while (!done) {
                    const { value, done: chunkDone } = await reader.read();
                    done = chunkDone;
                    console.log("Chunk:", value);

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split("\n\n");

                    for (const line of lines) {
                        if (line) {
                            fullResponse += line;
                            setMessages((prevMessages) => [
                                ...prevMessages.slice(0, prevMessages.length - 1),
                                { sender: "Bot", text: fullResponse },
                            ]);
                        }
                    }
                }
                setLoading(false);
            }
        } catch (error) {
            if (controller.signal.aborted) {
                console.log("Request aborted by user");
            } else {
                console.error("Error generating text:", error);
            }
            setLoading(false);
        }
    }

    const handleSendMessage = () => {
        if (!input || messageCount >= 10) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'User', text: input },
        ]);
        setInput('');
        setLoading(true);
        setMessageCount((prevCount) => prevCount + 1);

        generateText(input).catch((err) => {
            console.error("Error generating text:", err);
            setLoading(false);
        });

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'Bot', text: "正在思考..." }
        ]);
    };

    const handleAbortRequest = () => {
        if (abortController && !abortController.signal.aborted) {
            abortController.abort();
            setLoading(false);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'Bot', text: "回答已中断。" }
            ]);
        }
    };

    const handleResetChat = () => {
        setMessages([]);
        setMessageCount(0);
    };

    return (
        <div className="flex flex-col p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl h-[100vh] border border-gray-200 overflow-hidden">
            {/* 标题部分 */}
            <div className="text-center mb-6">
                <div className="text-3xl font-extrabold text-gray-900">聊天机器人</div>
            </div>

            {/* 消息显示区域 */}
            <div className="flex-1 overflow-y-auto mb-6 p-6 bg-gray-50 rounded-xl">
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex items-start space-x-4 ${msg.sender === 'User' ? 'flex-row-reverse' : ''}`}>
                                {msg.sender !== 'User' && <img src="/images/go.jpg" alt="Bot Avatar" className="w-12 h-12 rounded-full" />}
                                <div className={`p-4 rounded-2xl max-w-3xl ${msg.sender === 'User' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}>
                                    <p className="text-gray-800 text-lg">{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 输入框和按钮区域 */}
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-4 border border-gray-400 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="输入消息..."
                    disabled={loading || messageCount >= 10}
                />
                {loading ? (
                    <button
                        onClick={handleAbortRequest}
                        className="px-8 py-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        中断回答
                    </button>
                ) : (
                    <button
                        onClick={handleSendMessage}
                        className="px-8 py-4 bg-blue-500 text-white rounded-2xl disabled:bg-gray-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={!input || messageCount >= 10}
                    >
                        发送
                    </button>
                )}
            </div>

            {/* 对话达到限制提示 */}
            {messageCount >= 10 && (
                <div className="text-center mt-6 italic text-gray-600">
                    <p>对话已达到最大限制，点击刷新开始新对话</p>
                    <button
                        onClick={handleResetChat}
                        className="mt-4 px-8 py-4 border border-blue-500 rounded-2xl text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        刷新
                    </button>
                </div>
            )}
        </div>
    );
}