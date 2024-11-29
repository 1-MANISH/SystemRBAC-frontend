import React from 'react'
import Title from './../../components/shared/Title'
import Header from './Header'
import { Grid2 as Grid, Skeleton } from '@mui/material'
import Profile from '../specific/Profile'
import { useSelector } from 'react-redux'

const AppLayout = ()=> WrappedComponent => {

  
  return (props)=>{

    const {user:currentUser} = useSelector((store)=>store.authReducer)

    return(
        <>
        
        <Title />
        <Header />

        <Grid container spacing={'0rem'}>
        <Grid 
            size={
                {
                    xs:12,
                    sm:6,
                    md:8
                }
            }
            height={"100%"}
            bgcolor={"#f5f5f5"}
        >
            <WrappedComponent {...props} />
        </Grid>
        <Grid
            size={
                {
                    sm:6,
                    md:4
                }
            }
            sx={
              {
                display: {
                    xs:"none",
                    sm:"block"
                  },
                padding:"2rem",
                bgcolor:"rgba(0,0,0,0.85)"
              }
            }
            height={"100vh"}
            bgcolor={"black"}
        >
            <Profile user={currentUser}/>
        </Grid>
      </Grid>

        </>
    )
  }
}

export default AppLayout