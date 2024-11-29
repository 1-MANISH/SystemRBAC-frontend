import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'


const Home = () => {


  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h5">Welcome to the SYSTEM_RBAC</Typography>
    </Box>
  )
}

export default AppLayout()(Home)