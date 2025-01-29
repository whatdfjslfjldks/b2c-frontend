'use client'
import { Box, CircularProgress } from "@mui/material";
import React from "react";
//加载组件
export default function Loading() {
  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh',
      textAlign: 'center',
    }}
  >
    <CircularProgress color="primary" size={50} />
    <p>加载中，请稍等...</p>
  </Box>
  );
}
