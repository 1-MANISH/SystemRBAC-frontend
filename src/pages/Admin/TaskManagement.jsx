import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { Button, Chip, Skeleton } from '@mui/material'
import {Delete as DeleteIcon} from '@mui/icons-material'
import { getAllTasks, removeTaskDeleted } from '../../redux/reducers/admin'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../../components/shared/Table'
import toast from 'react-hot-toast'
import { serverUrl } from '../../constants/config'
import axios from 'axios'

const TaskManagement = () => {

  const dispatch = useDispatch()

  const [rows,setRows] = useState([])
  const [isTaskDeleteLoading,setIsTaskDeleteLoading] = useState(false)

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
        width: 250 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'status', 
        headerName: 'Status', 
        width: 150 ,
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
        field: 'assignedBy', 
        headerName: 'Assigned By', 
        width: 150 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'assignedTo', 
        headerName: 'Assigned To', 
        width: 150 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'deadline', 
        headerName: 'Deadline', 
        width: 250 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'createdAt', 
        headerName: 'Created At', 
        width: 250 ,
        headerClassName: 'table-header',
    },
    

    {
        field: 'action', 
        headerName: 'Action', 
        width: 300 ,
        headerClassName: 'table-header',
        renderCell:(params)=>{

            return (
                <Button variant="outlined" color="primary" disabled={isTaskDeleteLoading} startIcon={<DeleteIcon/>}
                  onClick={()=>deleteTaskHandler(params.row)}
                >Delete</Button>
            )
        }
    }
    
    
  ]

  useEffect(()=>{
    dispatch(getAllTasks())
  },[])

  const {tasks,loading} = useSelector((store)=>store.adminReducer)



  useEffect(()=>{
    setRows(tasks?.map((task,index)=>{
        return {
            id:task?._id,
            assignedBy:task?.assignedBy?.email,
            assignedTo:task?.assignedTo?.email,
            title:task?.title,
            description:task?.description,
            status:task?.status,
            deadline:task?.deadline,
            createdAt:task?.createdAt
            
        }
    }
    ))
  },[tasks])


  const deleteTaskHandler = async(task)=>{


    const toastId = toast.loading("Deleting task...")
    try {
      setIsTaskDeleteLoading(true)

      const {data}  = await axios.delete(`${serverUrl}/api/v1/admin/delete/task/${task.id}`,{withCredentials:true})

      toast.success(data?.message,{id:toastId})
      setIsTaskDeleteLoading(false)
      dispatch(removeTaskDeleted({taskId:task.id}))
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
    }finally{
      setIsTaskDeleteLoading(false)
    }
  }


  return loading ? (
    <Skeleton variant='rectangular' height={"100%"} />
  ) :(
    <Table
      rows={rows} 
      columns={columns} 
      heading="Tasks Management" 
    />
  )
}

export default AppLayout()(TaskManagement)