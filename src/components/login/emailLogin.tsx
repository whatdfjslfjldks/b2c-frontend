'use client'

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper, InputAdornment, CircularProgress, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { Mail, Security } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function EmailLogin() {
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState("login");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("@qq.com");
  const [verifyCode, setVerifyCode] = useState("");
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [sendVerificationState, setSendVerificationState] = useState({ submitting: false });

  const handleEmailPrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailPrefix(e.target.value);
  };

  const handleDomainChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedDomain(e.target.value as string);
  };

  const handleSendVerificationCode = () => {
    if (!emailPrefix || !selectedDomain) {
      setError("请输入完整的邮箱地址");
      return;
    }
    setSendVerificationState({ submitting: true });
    let timer = 60;
    setRemainingTime(timer);
    const interval = setInterval(() => {
      timer -= 1;
      setRemainingTime(timer);
      if (timer <= 0) clearInterval(interval);
    }, 1000);
  };

  const handleSubmit = () => {
    if (!emailPrefix || !verifyCode) {
      setError("请填写完整的邮箱和验证码");
      return;
    }
    console.log("提交成功");
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
      {error && <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: 2 }}>{error}</Typography>}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

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
                  <div style={{ cursor: "pointer" }} onClick={handleSendVerificationCode}>
                    <LoadingButton
                      style={{
                        borderRadius: "20px",
                        color: "#5360FE",
                        backgroundColor: "rgba(238, 239, 255, 1)",
                      }}
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
