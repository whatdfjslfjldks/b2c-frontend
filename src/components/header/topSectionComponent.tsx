"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    TextField,
    InputAdornment,
    Button,
    Popper,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { menuKeyTopSec } from "@/model/enum/enum";

export default function TopSectionComponent() {
    const [open, setOpen] = useState(false);
    const [historySearch, setHistorySearch] = useState<string[]>([
        "JavaScript",
        "React",
        "Next.js",
    ]); // 模拟历史搜索
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
    const [value, setValue] = useState<string>("");
    const router = useRouter();
    const [openAIDialog, setOpenAIDialog] = useState(false); // 控制 AI 弹窗的显示与隐藏

    // 聊天界面相关状态
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [abortController, setAbortController] = useState<AbortController | null>(null);

    function handleSearch() {
        router.push(`/search?keyword=${value}`);
    }

    function handleFocus(event: React.FocusEvent<HTMLElement>) {
        setOpen(true);
    }

    function handleBlur() {
        if (!isHovered) {
            setTimeout(() => {
                setOpen(false);
            }, 100);
        }
    }

    function clearHistorySearch() {
        setHistorySearch([]);
    }

    useEffect(() => {
        const val = window.location.pathname.split("/")[1];
        setSelectedMenu(menuKeyTopSec[val]);
    }, []);

    const handleOpenAIDialog = () => {
        setOpenAIDialog(true);
    };

    const handleCloseAIDialog = () => {
        setOpenAIDialog(false);
        setMessages([]);
        setMessageCount(0);
        setInput('');
        setLoading(false);
        if (abortController && !abortController.signal.aborted) {
            abortController.abort();
        }
    };

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
        <div className="flex flex-row w-full h-[96px] items-center pt-[16px] pb-[8px]">
            {/* Logo */}
            <div onClick={() => router.push("/")} className="flex mt-3 cursor-pointer">
                <img
                    src="/images/PBLOG.png"
                    alt="logo"
                    width={200}
                    height={200}
                />
            </div>

            {/* 导航栏 */}
            <div className="flex flex-row ml-[20px] w-[500px]">
                <div
                    onClick={() => router.push("/productClassify")}
                    className={`mr-[20px] cursor-pointer hover:text-[#ff5000] ${
                        selectedMenu === 1 && "text-[#ff5000]"
                    } `}
                >
                    产品分类
                </div>
                <div
                    onClick={() => router.push("/flashSale")}
                    className={`mr-[20px] cursor-pointer hover:text-[#ff5000] ${
                        selectedMenu === 2 && "text-[#ff5000]"
                    }`}
                >
                    限时秒杀
                </div>
                <div
                    onClick={() => router.push("/preSale")}
                    className={`mr-[20px] cursor-pointer hover:text-[#ff5000] ${
                        selectedMenu === 3 && "text-[#ff5000]"
                    }`}
                >
                    限时预售
                </div>
                <div
                    onClick={() => router.push("/newsList")}
                    className={`mr-[20px] cursor-pointer hover:text-[#ff5000] ${
                        selectedMenu === 4 && "text-[#ff5000]"
                    }`}
                >
                    新闻列表
                </div>
                <div
                    onClick={() => router.push("/aboutUs")}
                    className={`mr-[20px] cursor-pointer hover:text-[#ff5000] ${
                        selectedMenu === 5 && "text-[#ff5000]"
                    }`}
                >
                    关于我们
                </div>
            </div>

            {/* 搜索框 */}
            <div
                ref={containerRef}
                className="flex flex-row justify-center ml-[auto] items-center w-[400px]"
            >
                <TextField
                    variant="outlined"
                    placeholder="搜索..."
                    size="small"
                    onChange={(e) => setValue(e.target.value)}
                    sx={{
                        width: "100%",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                        },
                        "& .MuiInputBase-input": {
                            padding: "10px 15px",
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSearch}
                                    sx={{
                                        borderRadius: "10px",
                                    }}
                                >
                                    搜索
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpenAIDialog}
                                    sx={{
                                        marginLeft: "8px",
                                    }}
                                >
                                    AI推荐
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>

            {/* AI 弹窗 */}
            <Dialog open={openAIDialog} onClose={handleCloseAIDialog} maxWidth="md" fullWidth>
                <DialogTitle sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0', padding: '16px' }}>
                    AI 推荐
                </DialogTitle>
                <DialogContent sx={{ padding: '24px', backgroundColor: '#fafafa' }}>
                    <div className="flex flex-col h-[60vh] border border-gray-200 rounded-xl overflow-hidden shadow-md">
                        {/* 消息显示区域 */}
                        <div className="flex-1 overflow-y-auto p-6 bg-white">
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex items-start space-x-4 ${msg.sender === 'User' ? 'flex-row-reverse' : ''}`}>
                                            {msg.sender !== 'User' && <img src="/images/go.jpg" alt="Bot Avatar" className="w-12 h-12 rounded-full shadow-sm" />}
                                            <div className={`p-4 rounded-xl max-w-3xl ${msg.sender === 'User' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 border border-gray-300 shadow-sm'}`}
                                                style={{ transition: 'background-color 0.3s ease' }}>
                                                <p className="text-gray-800 text-sm">{msg.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 输入框和按钮区域 */}
                        <div className="flex items-center gap-4 p-6 bg-gray-50 border-t border-gray-200">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                placeholder="输入消息..."
                                disabled={loading || messageCount >= 10}
                            />
                            {loading ? (
                                <button
                                    onClick={handleAbortRequest}
                                    className="px-6 py-3 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300"
                                >
                                    中断回答
                                </button>
                            ) : (
                                <button
                                    onClick={handleSendMessage}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md disabled:bg-gray-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
                                    disabled={!input || messageCount >= 10}
                                >
                                    发送
                                </button>
                            )}
                        </div>

                        {/* 对话达到限制提示 */}
                        {messageCount >= 10 && (
                            <div className="text-center p-6 italic text-gray-600 bg-gray-50 border-t border-gray-200">
                                <p>对话已达到最大限制，点击刷新开始新对话</p>
                                <button
                                    onClick={handleResetChat}
                                    className="mt-4 px-6 py-3 border border-blue-500 rounded-xl text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
                                >
                                    刷新
                                </button>
                            </div>
                        )}
                    </div>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0', padding: '16px' }}>
                    <Button onClick={handleCloseAIDialog} sx={{ color: '#333', fontWeight: '600' }}>
                        关闭
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

      {/* 搜索建议框 */}
      {/* <Popper
        open={open}
        anchorEl={containerRef.current}
        placement="bottom-start"
        sx={{
          width: containerRef.current?.offsetWidth,
          zIndex: 10,
          marginTop: "5px",
        }}
      >
        <Paper
          sx={{ padding: "16px", backgroundColor: "#f5f5f5" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          历史搜索部分
          <div>
            <div className="font-semibold mb-2">历史搜索</div>
            <div className="flex flex-col">
              {historySearch.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>{item}</div>
                  <IconButton
                    onClick={() =>
                      setHistorySearch(
                        historySearch.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
            <Button
              onClick={clearHistorySearch}
              sx={{ mt: 1, fontSize: "12px" }}
              fullWidth
            >
              清除所有历史搜索
            </Button>
          </div>

          猜你想搜部分
          <div className="mt-4">
            <div className="font-semibold mb-2">猜你想搜</div>
            <div className="flex flex-col">
              <div>Vue.js</div>
              <div>Angular</div>
              <div>TypeScript</div>
            </div>
          </div>
        </Paper>
      </Popper> */}