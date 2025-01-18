'use client'
import React from 'react'
import { Avatar, Box, Typography, Link } from '@mui/material'
import { useRouter } from 'next/navigation'
import GitHubIcon from '@mui/icons-material/GitHub';

export default function BottomComponent() {
  const router = useRouter()

  const handleAvatarClick = () => {
    router.push("/Pblog/Home")
  }

  return (
    <>
      <div style={{
        backgroundColor: "white",
        height: "80px",
        marginTop:"10px"
      }}>
        <Box sx={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "space-between", paddingX: "3vh" }}>
          
          {/* 左侧Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <Avatar
              variant="square"
              sx={{ width: 150, height: 50 }}
            //   src="/images/PBLOG.png"
              style={{ cursor: "pointer" }}
              onClick={handleAvatarClick}
            /> */}
          </Box>

          {/* 中间文本 */}
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="body1" color="textSecondary">
              &copy; 2025 Patrick. All Rights Reserved.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
  <Link href="https://github.com/whatdfjslfjldks" target="_blank" sx={{marginX: "10px", display: "flex", alignItems: "center" }}>
    <GitHubIcon sx={{ fontSize: 25, marginRight: 1 ,color:"#000"}} />
    <Typography variant="body2" color="black">GitHub</Typography>
  </Link>
</Box>

        </Box>
      </div>
    </>
  )
}
