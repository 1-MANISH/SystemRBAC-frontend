import React, { useEffect, useState } from 'react'
import AppLayout from '../layout/AppLayout'
import { Button, Container, InputLabel, MenuItem, Paper, Select, Stack, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import LayoutLoader from '../layout/LayoutLoader';
import toast from 'react-hot-toast';
import axios from 'axios';
import { serverUrl } from '../../constants/config';
import { Navigate } from 'react-router-dom';
import { getAllUsers } from '../../redux/reducers/admin';

const CreateTask = () => {

    const dispatch = useDispatch()

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [assignedTo,setAssignedTo] = useState("")
    const [deadline,setDeadline] = useState(dayjs('2022-04-17T15:30'))


    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])

    const [isTaskCreateLoading,setIsTaskCreateLoading] = useState(false)

    const {users,loading,isAdmin} = useSelector((store)=>store.adminReducer)


    const handleCreateTask = async(e) => {
        e.preventDefault()
        let toastID = toast.loading("Creating task...")
        try {
            setIsTaskCreateLoading(true)
            const dataConfig = {
                title,
                description,
                assignedTo,
                deadline:deadline.toISOString()
            }
            
            const config = {
                headers: {
                    "Content-Type":"application/json"
                },
                withCredentials:true
            }

            const {data} = await axios.post(`${serverUrl}/api/v1/task/create`,dataConfig,config)
            toast.success(data?.message,{id:toastID})
            setIsTaskCreateLoading(false)
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong",{id:toastID})
        }finally{
            setIsTaskCreateLoading(false)
        }
    }

    const handleSelectFieldChange = (e) => {
        setAssignedTo(e.target.value)
        
    }


  return loading ? (
    <LayoutLoader />
  ): (
    <Container
        sx={{
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"     
        }}

    >
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                width:"800px",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding:"2rem",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    width:"100%",
                    height:"100%"
                }}
            >
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                         width:"100%",
                        height:"100%"
                    }}
                >
            
                    <h1>Create Task</h1>
        
                    <form
                        style={{
                            width:"100%",
                            marginTop:"1rem",
                            display:"flex",
                            flexDirection:"column",
                            gap:"1rem"
                        }}
                        onSubmit={handleCreateTask}
                    >

                        <TextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            required
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />

                        <InputLabel
                            id="demo-simple-select-label"
                        >Assigned To</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Assigned To"
                            fullWidth
                            value={assignedTo}
                            onChange={handleSelectFieldChange}
                        >

                            {
                                users?.map((user,index)=>{
                                    return <MenuItem key={index} value={user._id}>{user.username}</MenuItem>
                                })
                            }
                    

                        </Select>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                            <DateTimePicker
                            label="Deadline"
                            value={deadline}
                            onChange={(newValue) => {
                                setDeadline(newValue);
                            }}
                
                            >

                            </DateTimePicker>

                        </DemoContainer>

                        </LocalizationProvider>

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isTaskCreateLoading}
                        >Create Task</Button>

                    </form>
        
                </Stack>
            </Paper>
        </Stack>
    </Container>
  )
}

export default AppLayout()(CreateTask)