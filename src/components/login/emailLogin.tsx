'use client'

import React, { useCallback, useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper, InputAdornment, CircularProgress, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { Mail, Security } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchAPI } from '@/api/fetchApi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../middleware/redux/userInfoSlice';

export default function EmailLogin() {
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState("login");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("@qq.com");
  const [verifyCode, setVerifyCode] = useState("");
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [sendVerificationState, setSendVerificationState] = useState({ submitting: false });
  const router=useRouter();
  const dispatch = useDispatch();
  const handleEmailPrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailPrefix(e.target.value);
  };

  const handleDomainChange = (e: any) => {
    setSelectedDomain(e.target.value as string);
  };

  const handleSendVerificationCode = () => {
    if (!emailPrefix || !selectedDomain) {
      setError("请输入完整的邮箱地址");
      return;
    }
    setError("")
    handleRemainingTime();

    // 发送验证码
    fetchAPI('/user-server/sendVerifyCode',{
      method:'POST',
      body:JSON.stringify({
        email:emailPrefix+selectedDomain,
      })
    })
    .then((data)=>{
      if(data.code===200){
        setError("")
      }else{
        setError(data.msg)
      }
    })
  };

  const handleRemainingTime = () => {
    setRemainingTime(60);

    const countdownInterval = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      setRemainingTime(null);
    }, 60000);
  };
  //TODO 解决的问题 callback写计时器，callback不会因为组件的重新渲染而重新创建，除非它的依赖发生变化。

  //倒计时
  const updateRemainingTime = useCallback(() => {
    setRemainingTime((prevRemainingTime) => {
      if (prevRemainingTime === null) {
        return null;
      } else if (prevRemainingTime === 0) {
        return null;
      } else {
        return prevRemainingTime - 1;
      }
    });
  }, []);

  

  const handleSubmit = (e:any) => {
    e.preventDefault(); 
    //TODO 之后加格式校验
    if (!emailPrefix || !verifyCode) {
      setError("请填写完整的邮箱和验证码");
      return;
    }
    setError("")

    fetchAPI('/user-server/checkVerifyCode',{
      method:'POST',
      body:JSON.stringify({
        email:emailPrefix+selectedDomain,
        verify_code:verifyCode
      })
    })
    .then((data)=>{
      if(data.code===200){
        dispatch(setUserInfo(data.data))
        router.push("/")
      }else{
        setError(data.msg)
      }
    })

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
        邮箱登录
      </Typography>
      <form onSubmit={(e) => {handleSubmit(e); }}>

        <Grid container spacing={2}>

        <Grid
              item xs={12}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={2}
        >
          <Grid item xs={12}>
            <TextField
              label="邮箱前缀"
              variant="outlined"
              placeholder="请输入邮箱前缀"
              required
              type="text"
              fullWidth
              value={emailPrefix}
              onChange={handleEmailPrefixChange}
              error={!!error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "blue",
                  },
                  "& .MuiInputLabel-root.Mui-error": {
                    color: "red",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>选择邮箱域名</InputLabel>
              <Select
                value={selectedDomain}
                onChange={handleDomainChange}
                label="选择邮箱域名"
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="@qq.com">@qq.com</MenuItem>
                <MenuItem value="@gmail.com">@gmail.com</MenuItem>
                <MenuItem value="@163.com">@163.com</MenuItem>
              </Select>
            </FormControl>
            
          </Grid>

          </Grid>

          <Grid item xs={12}>
            <TextField
              label="验证码"
              placeholder="请输入验证码"
              required
              variant="outlined"
              fullWidth
              value={verifyCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setVerifyCode(value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Security />
                  </InputAdornment>
                ),
                endAdornment: (
                  <div style={{ cursor: "pointer" }}>
                    <LoadingButton
                      style={{
                        borderRadius: "20px",
                        color: "#5360FE",
                        backgroundColor: "rgba(238, 239, 255, 1)",
                      }}
                      onClick={handleSendVerificationCode}
                      loading={sendVerificationState.submitting}
                      disabled={remainingTime !== null && remainingTime > 0}
                    >
                      <Box sx={{ display: "inline-block", whiteSpace: "nowrap", mx: 1 }}>
                        {remainingTime !== null ? `${remainingTime} 秒后重新发送` : "发送验证码"}
                      </Box>
                    </LoadingButton>
                  </div>
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
              sx={{ marginTop: 2 }}
            >
              登录/注册
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
