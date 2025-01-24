import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Menu, MenuItem, Typography } from "@mui/material";

export default function NavComponent() {
  const [region, setRegion] = useState("中国大陆");
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const router = useRouter();

  function handleLogin() {
    router.push("/login");
  }

  function handleSelect(option:number){
    // 根据选择的项做一些处理
  }

  function handleClose(){
    setAnchorEl(null)
  }

  function handleHelpCenterClick(e:any){
    setAnchorEl(e.currentTarget)
  }

  return (
    <div className="flex bg-[] text-[12px] flex-row w-full items-center h-[35px] pl-[48px] pr-[48px] border-b-[1px] border-[#ddd]">
      <div className="mr-[12px] text-[#1f1f1f] cursor-pointer hover:text-[#ff5000] ">
        <select defaultValue={region} className="cursor-pointer">
          <option value="CN">{region}</option>
        </select>
      </div>

      <div className="flex flex-row justify-center w-[115px] mr-[12px] text-[#1f1f1f]">
        {isLogin ? (
          <div>用户信息</div>
        ) : (
          <>
            <div
              onClick={handleLogin}
              className="text-[#ff5000] mr-[4px] cursor-pointer "
            >
              亲，请登录
            </div>

            <div
              onClick={handleLogin}
              className="text-[#1f1f1f] cursor-pointer hover:text-[#ff5000] "
            >
              免费注册
            </div>
          </>
        )}
      </div>

      <div className="text-[#1f1f1f] cursor-pointer">网页无障碍</div>

      <div className="flex flex-row ml-auto">
        <div className="text-[#1f1f1f] mr-[12px] cursor-pointer hover:text-[#ff5000]">
          <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
          购物车
        </div>
        <div className="text-[#1f1f1f] mr-[12px] cursor-pointer hover:text-[#ff5000]">
          <StarBorderIcon sx={{fontSize:18}} />
          收藏夹
        </div>
        <div className="cursor-pointer hover:text-[#ff5000]">
          <div onClick={handleHelpCenterClick}>
            帮助中心
          </div>
          <Menu
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose} 
          >
            {/* 菜单项 */}
            <MenuItem onClick={() => handleSelect(1)} sx={{ fontSize: '12px', color: '#333' }}>
              <Typography variant="body2" sx={{ fontSize: '12px' }}>
                官方客服
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleSelect(2)} sx={{ fontSize: '12px', color: '#333' }}>
              <Typography variant="body2" sx={{ fontSize: '12px' }}>
                消息中心
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleSelect(3)} sx={{ fontSize: '12px', color: '#333' }}>
              <Typography variant="body2" sx={{ fontSize: '12px' }}>
                意见反馈
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleSelect(4)} sx={{ fontSize: '12px', color: '#333' }}>
              <Typography variant="body2" sx={{ fontSize: '12px' }}>
                举报中心
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
