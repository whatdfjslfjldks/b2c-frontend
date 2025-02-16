'use client'
import { createSlice } from '@reduxjs/toolkit';

// 定义 User 信息的接口
interface User {
  userId: number;
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  avatarUrl: string;
  email: string;
  bio:string;
  createdAt:string;
}

// 定义状态类型
interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}

// 从 localStorage 获取用户信息，确保格式符合 User 接口
export const getUserFromLocalStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    // 只有在浏览器环境中才执行
    // console.log("here from redux")
    const user = localStorage.getItem('userInfo');
    return user ? JSON.parse(user) : null;
  }
  return null; // 在服务器端返回 null
};

export const isLogin = (): boolean => {
  const user = getUserFromLocalStorage();
  return !!user;
};

// 初始状态，尝试从 localStorage 加载数据
const initialState: UserState = {
  userInfo: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

// 创建 slice，定义 reducers（不包含异步的 thunk）
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置用户信息
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      // 每次设置用户信息时，存储到 localStorage
      if (action.payload) {
        // 确保存储的数据符合 User 接口格式
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('userInfo');
      }
    },
    // 设置 loading 状态
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // 设置错误信息
    setError: (state, action) => {
      state.error = action.payload;
    },
    // 从 localStorage 获取数据并存入状态
    loadUserFromLocalStorage: (state) => {
      // console.log("here from redux")
      const user = getUserFromLocalStorage();
      if (user) {
        state.userInfo = user;
      }
      // console.log("userInfo",state.userInfo)
    },
    removeUserFromLocalStorage: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
     // 修改头像 URL
     updateAvatarUrl: (state, action) => {
      if (state.userInfo) {
        state.userInfo.avatarUrl = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      }
    },
        // 修改用户名
        updateUsername: (state, action) => {
          if (state.userInfo) {
            state.userInfo.username = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
          }
        },
  },
});

// 导出 actions
export const { setUserInfo, setLoading, setError, loadUserFromLocalStorage,removeUserFromLocalStorage,updateAvatarUrl,updateUsername } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;
