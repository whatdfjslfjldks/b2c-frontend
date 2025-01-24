'use client'
import { Box, CircularProgress } from "@mui/material";
import React from "react";
//加载组件
export default function Loading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "30vh" }}>
      <CircularProgress color="inherit" />
    </Box>
  );
}
