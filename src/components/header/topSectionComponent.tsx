"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  TextField,
  InputAdornment,
  Button,
  Popper,
  Paper,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete"; // 导入垃圾桶图标
import { useRouter } from "next/navigation";
export default function TopSectionComponent() {
  const [open, setOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState<string[]>([
    "JavaScript",
    "React",
    "Next.js",
  ]); // 模拟历史搜索
  const [isHovered, setIsHovered] = useState(false); // 用于检测鼠标是否悬停
  const containerRef = useRef<HTMLDivElement>(null); // 获取搜索框外部容器的引用
  const router=useRouter();
  function handleSearch() {
    console.log("Search");
  }

  function handleFocus(event: React.FocusEvent<HTMLElement>) {
    setOpen(true);
  }

  function handleBlur() {
    if (!isHovered) {
      // 延时隐藏弹出框，以便点击框内的元素不触发失去焦点
      setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  }

  function clearHistorySearch() {
    setHistorySearch([]); // 清空历史搜索
  }

  return (
    <div className="flex flex-row w-full h-[96px] items-center pt-[16px] pb-[8px]">
      {/* Logo */}
      <div onClick={() => router.push('/')} className="flex mt-2 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={200}
          height={0}
          layout="intrinsic"
        />
      </div>

      {/* 导航栏 */}
      <div className="flex flex-row ml-[20px] w-[500px]">
        <div className="mr-[20px] cursor-pointer hover:text-[#ff5000]">
          产品分类
        </div>
        <div className="mr-[20px] cursor-pointer hover:text-[#ff5000]">
          限时秒杀
        </div>
        <div className="mr-[20px] cursor-pointer hover:text-[#ff5000]">
          限时预售
        </div>
        <div className="mr-[20px] cursor-pointer hover:text-[#ff5000]">
          新闻列表
        </div>
        <div className="mr-[20px] cursor-pointer hover:text-[#ff5000]">
          关于我们
        </div>
      </div>

      {/* 搜索框 */}
      <div
        ref={containerRef}
        className="flex flex-row justify-center ml-[80px] items-center w-[400px]"
      >
        <TextField
          variant="outlined"
          placeholder="搜索..."
          size="small"
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
                  sx={{
                    borderRadius: "10px",
                  }}
                  onClick={handleSearch}
                >
                  搜索
                </Button>
              </InputAdornment>
            ),
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {/* 搜索建议框 */}
      <Popper
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
          {/* 历史搜索部分 */}
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

          {/* 猜你想搜部分 */}
          <div className="mt-4">
            <div className="font-semibold mb-2">猜你想搜</div>
            <div className="flex flex-col">
              <div>Vue.js</div>
              <div>Angular</div>
              <div>TypeScript</div>
            </div>
          </div>
        </Paper>
      </Popper>
    </div>
  );
}
