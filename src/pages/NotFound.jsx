import React from 'react'
import {Button, Container, Stack, Typography} from '@mui/material'

const NotFound = () => {
  return (
    <Container
    sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#f5f5f5"
    }}
    >

      <Stack>
        <Typography variant='h2'>404</Typography>
        <Typography variant='h5'>Page Not Found</Typography>
        <Stack mt={2}>
          <Button variant='outlined' onClick={()=>window.location.href="/"}>Back to Home</Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default NotFound