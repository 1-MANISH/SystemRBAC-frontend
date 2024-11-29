import {  Button, Chip, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../shared/Table'
import {getMyTask} from "../../redux/reducers/task"
import AppLayout from '../layout/AppLayout'
import {Done as DoneIcon} from "@mui/icons-material"
import toast from 'react-hot-toast'
import axios from 'axios'
import { serverUrl } from '../../constants/config'
import { updateTaskStatus as updateTaskStatusInStore } from '../../redux/reducers/task'

const UserTask = () => {


    const[isTaskStatusUpdateLoading,setIsTaskStatusUpdateLoading] = useState(false)

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 200 ,
            headerClassName: 'table-header',
        },
        { 
            field: 'title', 
            headerName: 'Title', 
            width: 150 ,
            headerClassName: 'table-header',
        },
        { 
            field: 'description', 
            headerName: 'Description', 
            width: 150 ,
            headerClassName: 'table-header',
        },
        { 
            field: 'assignedBy', 
            headerName: 'Assigned By', 
            width: 150 ,
            headerClassName: 'table-header',
            renderCell:(params)=>{
                return (
                    <Chip label={params.row.assignedBy.username} />
                )
            }
        },
        { 
            field: 'createdAt', 
            headerName: 'Created At', 
            width: 250 ,
            headerClassName: 'table-header',
        },
        { 
            field: 'deadline', 
            headerName: 'Deadline', 
            width: 250 ,
            headerClassName: 'table-header',
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 130 ,
            headerClassName: 'table-header',
            renderCell:(params)=>{
    
                let color = "red"
                let variant = ""
                switch(params.row.status){
                    case "pending":
                        color = "primary"
                        variant = "outlined"
                        break;
                    case "working":
                        color = "primary"
                        variant =""
                        break;
                    case "completed":
                        color = "success"
                        break;
                    default:
                }
                return (
                    <Chip label={params.row.status} color={color} variant={variant} />
                )
            }
        },
        {
            field: 'action', 
            headerName: 'Action', 
            width: 300 ,
            headerClassName: 'table-header',
            renderCell:(params)=>{

                if(params.row.status === "completed"){
                    return (
                        <span style={{color:"green", display:"flex",alignItems:"center",gap:"0.5rem"}} >
                        
                            <DoneIcon sx={{color:"green"}} /> Task Completed
                        </span>
                    )
                        
                }
    
                return (
                   
                    params.row.status === "pending" ? (
                        <>
                        Update Status To 
                        <Button color="secondary" disabled={
                            params.row.status === "completed" || isTaskStatusUpdateLoading
                        } onClick={()=>{
                            updateTaskStatus("working", params.row)
                        }}>Working</Button>
                        </>
                    ):(
                        <>
                         Update Status To 
                        <Button color="primary" disabled={
                            params.row.status === "completed" || isTaskStatusUpdateLoading
                        } onClick={()=>{
                            updateTaskStatus("completed", params.row)
                        }}>Competed</Button>
                        </>
                    )
                   
                )
            }
        }
        
        
    ]

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getMyTask())
    },[dispatch])


    const [rows,setRaws] = useState([])
    const {tasks,loading} = useSelector((store)=>store.taskReducer)

 
   
    useEffect(()=>{
        setRaws(tasks?.map((task)=>{
            return {
                ...task,
                id:task._id
            }
        }))
    },[tasks])

    const updateTaskStatus = async(status,task)=>{

        let toastId = toast.loading("Updating task status...")
        try {
            const taskId = task._id
            setIsTaskStatusUpdateLoading(true)

            const {data} = await axios.put(`${serverUrl}/api/v1/task/update/${taskId}`,{status},{withCredentials:true})

            toast.success(data?.message,{id:toastId})
            setIsTaskStatusUpdateLoading(false)
            dispatch(updateTaskStatusInStore({taskId:taskId,status:status}))

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
        }finally{
            setIsTaskStatusUpdateLoading(false)
        }
        
    }

    

  return  loading ? (
    <Skeleton variant='rectangular' height={"100%"} />
  ):(
    <>
        <Table 
            heading="My Task"
            columns={columns}
            rows={rows}
        />
       
    </>
  )
}

export default AppLayout()(UserTask) 