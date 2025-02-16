'use client'

import { fetchAPI } from "@/api/fetchApi"
import { getAccessToken } from "@/api/token"
import { message, Modal, Input } from "antd"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { removeUserFromLocalStorage, setUserInfo, updateAvatarUrl, updateUsername } from "@/middleware/redux/userInfoSlice"

interface User {
    avatar_url: string;
    name: string;
    email: string;
    user_id: number;
    bio: string;
    create_at: string;
}

export default function AccountMgt() {
    const userInfo = useSelector((state: any) => state.user.userInfo)
    const dispatch = useDispatch()

    // 昵称修改模态框状态
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [newName, setNewName] = useState('');

    // 简介修改模态框状态
    const [isBioModalOpen, setIsBioModalOpen] = useState(false);
    const [newBio, setNewBio] = useState('');

    // 邮箱修改模态框状态
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    // 密码修改模态框状态
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    function handleLogout() {
        message.info("退出登录成功")
        dispatch(removeUserFromLocalStorage());
    }

    const handleAvatarChange = (e: any) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        fetchAPI("/user-server/uploadAvatar", {
            method: 'POST',
            headers: {
                'Access-Token': getAccessToken() ?? '',
            },
            body: formData
        })
           .then((data) => {
                if (data.code === 200) {
                    message.success("头像修改成功")
                    dispatch(updateAvatarUrl(data.data.avatar_url))
                } else {
                    message.error(data.msg)
                }
            })
    }

    const handleNameChange = () => {
        setIsNameModalOpen(true);
        setNewName(userInfo?.username || '');
    };

    const handleNameOk = () => {
        // 调用 API 修改昵称
        fetchAPI("/user-server/updateName", {
            method: 'POST',
            headers: {
                'Access-Token': getAccessToken() ?? '',
            },
            body: JSON.stringify({ name: newName })
        })
           .then((data) => {
                if (data.code === 200) {
                    message.success("昵称修改成功")
                    // 更新 Redux 中的用户信息
                    dispatch(updateUsername(data.data.name));
                } else {
                    message.error(data.msg)
                }
            })
        setIsNameModalOpen(false);
    };

    const handleNameCancel = () => {
        setIsNameModalOpen(false);
    };

    const handleBioChange = () => {
        setIsBioModalOpen(true);
        setNewBio(userInfo?.bio || '');
    };

    const handleBioOk = () => {
        // 调用 API 修改简介
        fetchAPI("/user-server/updateBio", {
            method: 'POST',
            headers: {
                'Access-Token': getAccessToken() ?? '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bio: newBio })
        })
           .then((data) => {
                if (data.code === 200) {
                    message.success("简介修改成功")
                    // 更新 Redux 中的用户信息
                    dispatch(setUserInfo({ ...userInfo, bio: newBio }));
                } else {
                    message.error(data.msg)
                }
            })
        setIsBioModalOpen(false);
    };

    const handleBioCancel = () => {
        setIsBioModalOpen(false);
    };

    const handleEmailChange = () => {
        setIsEmailModalOpen(true);
        setNewEmail(userInfo?.email || '');
    };

    const handleEmailOk = () => {
        // 调用 API 修改邮箱
        // fetchAPI("/user-server/updateEmail", {
        //     method: 'POST',
        //     headers: {
        //         'Access-Token': getAccessToken() ?? '',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: newEmail })
        // })
        //    .then((data) => {
        //         if (data.code === 200) {
        //             message.success("邮箱修改成功")
        //             // 更新 Redux 中的用户信息
        //             dispatch(setUserInfo({ ...userInfo, email: newEmail }));
        //         } else {
        //             message.error(data.msg)
        //         }
        //     })
        setIsEmailModalOpen(false);
    };

    const handleEmailCancel = () => {
        setIsEmailModalOpen(false);
    };

    const handlePasswordChange = () => {
        setIsPasswordModalOpen(true);
    };

    const handlePasswordOk = () => {
        // 调用 API 修改密码
        // fetchAPI("/user-server/updatePassword", {
        //     method: 'POST',
        //     headers: {
        //         'Access-Token': getAccessToken() ?? '',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ password: newPassword })
        // })
        //    .then((data) => {
        //         if (data.code === 200) {
        //             message.success("密码修改成功")
        //         } else {
        //             message.error(data.msg)
        //         }
        //     })
        setIsPasswordModalOpen(false);
    };

    const handlePasswordCancel = () => {
        setIsPasswordModalOpen(false);
    };

    return (
        <div className="flex flex-col overflow-auto">
            <div className="border-b h-[50px] border-[#ececec] text-[18px] text-[#282828] font-custom">
                账号管理
            </div>

            <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[120px]">
                <div className="text-[16px] w-[70px] text-[#777]">
                    我的头像:
                </div>
                <div className="ml-[40px] w-[100px] h-[85px] relative">
                    {userInfo?.avatarUrl &&
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${userInfo?.avatarUrl}`}
                            alt="avatar"
                            fill={true}
                        />
                    }
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 w-[100px] h-[85px] opacity-0 cursor-pointer"
                    />
                </div>

            </div>

            <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
                <div className="text-[16px] w-[70px] text-[#777]">
                    我的昵称:
                </div>
                <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                    {userInfo?.username}
                </div>
                <div onClick={handleNameChange} className="ml-auto text-[#e93323] mt-[20px] font-custom text-[16px] cursor-pointer">
                    修改
                </div>
            </div>

            <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
                <div className="text-[16px] w-[70px] text-[#777]">
                    简介:
                </div>
                <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                    {userInfo?.bio}
                </div>
                <div onClick={handleBioChange} className="ml-auto text-[#e93323] mt-[20px] font-custom text-[16px] cursor-pointer">
                    修改
                </div>
            </div>

            <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
                <div className="text-[16px] w-[70px] text-[#777]">
                    邮箱:
                </div>
                <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                    {userInfo?.email}
                </div>
                <div onClick={handleEmailChange} className="ml-auto text-[#e93323] mt-[20px] font-custom text-[16px] cursor-pointer">
                    修改
                </div>
            </div>

            <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
                <div className="text-[16px] w-[70px] text-[#777]">
                    我的ID:
                </div>
                <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                    {userInfo?.userId}
                </div>
            </div>

            <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
                <div className="text-[16px] w-[70px] text-[#777]">
                    密码设置:
                </div>
                <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                    {`******`}
                </div>
                <div onClick={handlePasswordChange} className="ml-auto text-[#e93323] mt-[20px] font-custom text-[16px] cursor-pointer">
                    修改密码
                </div>
            </div>

            <div className="flex flex-row border-b border-dotted border-[#ececec] mt-[20px] items-center h-[80px]">
                <div className="text-[16px] w-[70px] text-[#777]">
                    创建时间:
                </div>
                <div className="ml-[40px] text-[16px] text-[#282828] font-semibold">
                    {userInfo?.createAt}
                </div>
            </div>

            <div className="mt-[20px] ml-auto">
                <Button onClick={handleLogout} variant="contained" color="primary">
                    退出登录
                </Button>
            </div>

            <Modal
                title="修改昵称"
                open={isNameModalOpen}
                onOk={handleNameOk}
                onCancel={handleNameCancel}
                cancelText="取消"
                okText="确定"
            >
                <Input
                    placeholder="请输入新的昵称"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
            </Modal>

            <Modal
                title="修改简介"
                open={isBioModalOpen}
                onOk={handleBioOk}
                onCancel={handleBioCancel}
                cancelText="取消"
                okText="确定"
            >
                <Input.TextArea
                    placeholder="请输入新的简介"
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                />
            </Modal>

            <Modal
                title="修改邮箱"
                open={isEmailModalOpen}
                onOk={handleEmailOk}
                onCancel={handleEmailCancel}
                cancelText="取消"
                okText="确定"
            >
                <Input
                    placeholder="请输入新的邮箱"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
            </Modal>

            <Modal
                title="修改密码"
                open={isPasswordModalOpen}
                onOk={handlePasswordOk}
                onCancel={handlePasswordCancel}
                cancelText="取消"
                okText="确定"
            >
                <Input.Password
                    placeholder="请输入新的密码"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </Modal>
        </div>
    )
}