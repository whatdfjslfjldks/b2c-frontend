// tokenUtils.ts
import { setUserInfo } from '../middleware/redux/userInfoSlice'; // 你的 Redux action

const api_prefix = 'http://localhost:8080/api/user-server';

// 获取本地存储中的访问令牌和刷新令牌
const getAccessToken = () => {
  if (typeof window === 'undefined') return undefined;
  const localStorageItem = localStorage.getItem('userInfo');
  if (!localStorageItem) return undefined;
  const parseResult = JSON.parse(localStorageItem);
  return parseResult ? parseResult['accessToken'] : undefined;
};

const getRefreshToken = () => {
  if (typeof window === 'undefined') return undefined;
  const localStorageItem = localStorage.getItem('userInfo');
  if (!localStorageItem) return undefined;
  const parseResult = JSON.parse(localStorageItem);
  return parseResult ? parseResult['refreshToken'] : undefined;
};


export const isTokenValid=async ()=>{
  if(await checkAccessToken()){
    return true;
  }else{
    return await checkRefreshToken();
  }
}
// 检查访问令牌是否有效
 const checkAccessToken = async () => {
  const result = await fetch(`${api_prefix}/testAccessToken`, {
    headers: {
      'Access-Token': getAccessToken() ?? '',
    },
    method: 'POST',
  }).then((res) => res.text());

  if (result && result === 'ok') {
    return true;
  } else {
    return false;
  }
};

// 检查刷新令牌
const checkRefreshToken = async () => {
  try {
    const res = await fetch(`${api_prefix}/testRefreshToken`, {
      headers: {
        'Refresh-Token': getRefreshToken() ?? '',
      },
      method: 'POST',
    });

    const data = await res.json();

    if (data.code === 200) {
      localStorage.setItem('userInfo', JSON.stringify({
        ...JSON.parse(localStorage.getItem('userInfo') || '{}'),
        ...data.data,
      }));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
};
