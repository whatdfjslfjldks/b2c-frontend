'use client'

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FaceIcon from '@mui/icons-material/Face'
import { Tooltip } from "@mui/material";

export default function FloatMenuComponent() {
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
      {/* 悬浮侧边栏 */}
      <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-tl-xl rounded-bl-xl w-[50px] h-auto p-2 space-y-3">
        {/* 购物车图标 */}
        <Tooltip title="购物车" arrow placement="right">
          <div className="text-[#1f1f1f] hover:bg-[#f0f0f0] p-2 rounded-lg transition-colors cursor-pointer">
            <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
          </div>
        </Tooltip>

        {/* 收藏夹图标 */}
        <Tooltip title="收藏夹" arrow placement="right">
          <div className="text-[#1f1f1f] hover:bg-[#f0f0f0] p-2 rounded-lg transition-colors cursor-pointer">
            <StarBorderIcon sx={{ fontSize: 24 }} />
          </div>
        </Tooltip>


    {/* AI 机器人图标 */}
    <Tooltip title="智能客服" arrow placement="right">
      <div className="text-[#1f1f1f] hover:bg-[#f0f0f0] p-2 rounded-lg transition-colors cursor-pointer">
        <FaceIcon  sx={{ fontSize: 24 }} />
      </div>
    </Tooltip>

      </div>
    </div>
  )
}
