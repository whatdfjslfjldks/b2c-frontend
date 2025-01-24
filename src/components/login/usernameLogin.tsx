'use client'

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Container, Paper, InputAdornment, CircularProgress } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { fetchAPI } from '@/api/fetchApi';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userInfoSlice';
import { useRouter } from 'next/navigation'

export default function UsernameLogin() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router=useRouter()
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // TODO 先不加格式判断
      if (username && password) {
        setLoading(true);

        fetchAPI('/user-server/loginByPassword',{
          method:'POST',
          body: JSON.stringify({ 
            username: username, 
            password:password 
          }),
        })
        .then((data) => {
          if(data.code === 200){
            // console.log('Response:', data);
            setError("");
            dispatch(setUserInfo(data.data))
            router.push("/")
            // localStorage.setItem("userInfo",JSON.stringify(data.data))
          }else{
            setError(data.msg);
          }
          setLoading(false);
        })

      } else {
        setError('用户名和密码不能为空');
      }
    };
  
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  return (
<Paper
  sx={{
    padding: 4,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // 使其居中
  }}
>
          <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3, fontWeight: 600 }}>
            登录
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="用户名"
                  variant="outlined"
                  placeholder="请输入用户名"
                  fullWidth
                  required
                  value={username}
                  onChange={handleUsernameChange}
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="密码"
                  variant="outlined"
                  placeholder="请输入密码"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              {error &&
               <Typography 
               sx={{ 
                position: 'absolute',
                color: 'red', 
               fontSize: '14px',
                textAlign: 'center', 
                marginTop: -1,
                }}>{error}</Typography>}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  sx={{
                     marginTop: 2,
                     }}
                  disabled={loading}
                >
                  
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} sx={{ marginRight: 2 }} />
                      登录中...
                    </Box>
                  ) : (
                    '登录'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
  )
}