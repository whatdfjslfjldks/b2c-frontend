import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {Popover } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/work/redux/store";
import { DownOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

export default function NavComponent() {
  const [region, setRegion] = useState("中国大陆");
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl2);
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userInfo) {
      setIsLogin(true);
    }
  }, []);
  function handleLogin() {
    router.push("/login");
  }

  function handleSelect(option: number) {
    // 根据选择的项做一些处理
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleHelpCenterClick(e: any) {
    setAnchorEl(e.currentTarget);
  }

  function handleInfoClick(e: React.MouseEvent<HTMLDivElement>) {
    setAnchorEl2(e.currentTarget);
  }

  function handleInfoClose() {
    setAnchorEl2(null);
  }

 const handleHelpSelect: MenuProps['onClick'] = (e) =>{
  // setHelpOption((e.domEvent.target as HTMLElement).innerText);
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '官方客服',
    },
    {
      key: '2',
      label: '消息中心',
    },
    {
      key: '3',
      label: '意见反馈',
    },
    {
      key: '4',
      label: '举报中心',
    },
  ];

  return (
    <div className="flex bg-[] text-[14px] flex-row w-full items-center h-[35px] pl-[48px] pr-[48px] border-b-[1px] border-[#ddd]">
      <div className="mr-[12px] text-[#1f1f1f] text-[14px] cursor-pointer hover:text-[#ff5000] ">
        <select defaultValue={region} className="cursor-pointer">
          <option value="CN">{region}</option>
        </select>
      </div>

      <div className="flex flex-row justify-center w-[150px] mr-[12px] text-[#1f1f1f]">
        {isLogin ? (
          <>
            <div
              onClick={handleInfoClick}
              className="flex flex-row items-center cursor-pointer hover:text-[#ff5000]"
            >
              {/* {userInfo?.avatarUrl 
            ?(
            <img
            src="/images/1.JPG"
            //  src={userInfo?.avatarUrl}
              alt="avatar"
               className="w-[30px] h-[30px]
                rounded-full mr-[5px]" />
            ):(
              <img
               src="/images/1.JPG" // default image
                alt="avatar"
                 className="w-[30px] h-[30px]
                  rounded-full mr-[5px]" />
            )
                } */}
              <span className="w-[115px] text-[14px] overflow-hidden whitespace-nowrap text-ellipsis">
                {userInfo?.username}
              </span>
            </div>

            <Popover
              open={open}
              anchorEl={anchorEl2}
              onClose={handleInfoClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              slotProps={{
                paper: {
                  style: {
                    width: "180px",
                    height: "125px",
                    borderRadius: "15px",
                  },
                },
              }}
            >
              <div>
                <div className="flex flex-row ">
                  <div className="mt-[15px] ml-[15px] cursor-pointer">
                    <img
                      src="/images/1.JPG"
                      alt="avatar"
                      className="w-[50px] h-[50px]
                rounded-full mr-[5px]"
                    />
                  </div>
                  <div className="flex flex-col mt-[15px] ml-[8px]">
                    <div className="w-[90px] text-[16px] font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                      {userInfo?.username}
                    </div>
                    <div className="flex flex-row justify-center items-center mt-[5px]">
                      <div className="text-[12px] text-[#1f1f1f] hover:text-[#ff5000] cursor-pointer">
                        账号管理
                      </div>
                      <div className="border-r-[1.5px] ml-[10px] border-[gray] h-[12px]"></div>
                      <div className="text-[12px] text-[#1f1f1f] ml-[10px] hover:text-[#ff5000] cursor-pointer">
                        退出
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex  justify-center items-center mt-[10px] ml-[15px] mr-[15px]">
                  <div className="flex justify-center items-center border-gray border-[1px] rounded-md w-[130px] h-[35px] text-[#1f1f1f] text-[14px] hover:text-[#ff5000] cursor-pointer">
                    查看你的专属权益
                  </div>
                </div>
              </div>
            </Popover>
          </>
        ) : (
          <>
            <div
              onClick={handleLogin}
              className="text-[#ff5000] text-[14px] mr-[4px] cursor-pointer "
            >
              亲，请登录
            </div>

            <div
              onClick={handleLogin}
              className="text-[#1f1f1f] text-[14px]  cursor-pointer hover:text-[#ff5000] "
            >
              免费注册
            </div>
          </>
        )}
      </div>

      <div className="text-[#1f1f1f] text-[14px] cursor-pointer">网页无障碍</div>

      <div className="flex flex-row ml-auto">
        <div onClick={()=>router.push("/shoppingCart")} className="text-[#1f1f1f] text-[14px] mr-[12px] cursor-pointer hover:text-[#ff5000]">
          <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
          购物车
        </div>
        <div className="text-[#1f1f1f] text-[14px]  mr-[12px] cursor-pointer hover:text-[#ff5000]">
          <StarBorderIcon sx={{ fontSize: 18 }} />
          收藏夹
        </div>
        <div className="cursor-pointer hover:text-[#ff5000]">
          {/* <div onClick={handleHelpCenterClick}>帮助中心</div> */}

          <Dropdown
                        menu={{ items, onClick: handleHelpSelect }} // 通过 onClick 获取 label
                        trigger={['hover']}
                    >
                        <div className="text-[#11192d] text-[14px] font-custom">
                            帮助中心 <DownOutlined />
                        </div>
                    </Dropdown>
        </div>
      </div>
    </div>
  );
}
