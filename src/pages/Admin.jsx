import React, { useEffect } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAllTasks, getAllUsers, getDashBoardStats } from '../redux/reducers/admin'
import LayoutLoader from '../components/layout/LayoutLoader'
import { Container, Paper, Stack, Typography } from '@mui/material'
import { DoughnutChart, LineChart } from '../components/specific/Chart'
import { 
    Person as PersonIcon,
    Task as TaskIcon,
    
  } from '@mui/icons-material'

const Admin = () => {

    const dispatch = useDispatch()

    const {isAdmin} = useSelector((store)=>store.authReducer)

    const {stats,loading} = useSelector((store)=>store.adminReducer)

    const taskChartData = stats?.taskChart
    const doughnutData = [stats?.taskCompleted , stats?.tasksCount - stats?.taskCompleted]

    
    useEffect(()=>{
        dispatch(getDashBoardStats())
        dispatch(getAllUsers())
        dispatch(getAllTasks())
    },[dispatch])

    const Widgets = (
        <Stack
        direction={{
            xs:"column",
            sm:"row"
          }}
          spacing="2rem"
          justifyContent={"space-between"}
          alignItems={"center"}
          margin={"2rem 0"}
        >   

            <Widget title="Total Users" value={stats?.usersCount} Icon={<PersonIcon />} />
            <Widget title="Total Tasks" value={stats?.tasksCount} Icon={<TaskIcon />} />

        </Stack>
    )



  return loading ? (
    <LayoutLoader />    
  ): (
    <Container
    component={"main"}
    sx={{
        padding:"2rem",
        height:"100vh"
    }}
    >

    <Stack
          direction={"row"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          gap={{
            xs:"2rem",
            sm:"1rem"
          }}
        >
             <Paper
                elevation={3}
                sx={{
                padding:"2rem 3.5rem",
                borderRadius:"1rem",
                width:"100%",
                maxWidth:"45rem",
                
                }}
          >

            <Typography
                variant="h4"
                textAlign="center"
                fontWeight={"bold"}

            >
                Last 7 Days Tasks
            </Typography>

            <LineChart valueArray={taskChartData || []} />

            </Paper>

            <Paper
            elevation={3}
            sx={{
              padding:"1rem",
              borderRadius:"1rem",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              width:{
                xs:"100%",
                sm:"50%"
              },
              position:"relative",
              width:"100%",
              maxWidth:"25rem",
             
            }}
          >
            <DoughnutChart
              labels={["Completed","Pending"]}
             valueArray={doughnutData || []} 
             />
            </Paper>

            <Stack>

                {
                    Widgets
                }


            </Stack>

    </Stack>

    </Container>
  )
}

export const Widget = ({title,value,Icon}) => {
    return (
      <Paper
      elevation={3}
      sx={{
        padding:"2rem",
        margin:"2rem 0",
        borderRadius:"1.5rem",
        width:"20rem",
      }}
        
      > 
        
       <Stack
          alignItems={"center"}
          spacing={"1rem"}
          
        >
  
          <Typography 
            variant='h6'
            sx={{
              color:"rgba(0,0,0,0.7)",
              borderRadius:"50%",
              border:"5px solid rgba(0,0,0,0.9)",
              width:"5rem",
              height:"5rem",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}
          >
            {value}
          </Typography>
          <Stack 
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
          >
              {Icon}
               <Typography>{title}</Typography>
          </Stack>
  
       </Stack>
  
      </Paper>
    )
}
  

export default AppLayout()(Admin) 