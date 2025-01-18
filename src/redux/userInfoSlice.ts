import { createSlice } from '@reduxjs/toolkit';

// 定义 User 信息的接口
interface User {
  userId: number;
  userName: string;
  role: string;
  accessToken:string;
  refreshToken:string;
  avatar: string;
}

// 定义状态类型
interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}

// 从 localStorage 获取用户信息，确保格式符合 User 接口
const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem('userInfo');
  return user ? JSON.parse(user) : null;
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
  },
});

// 导出 actions
export const { setUserInfo, setLoading, setError } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;
