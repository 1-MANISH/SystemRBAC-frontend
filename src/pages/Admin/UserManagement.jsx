import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { Chip, Skeleton, Stack, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../../components/shared/Table'
import axios from 'axios'
import toast from 'react-hot-toast'
import { serverUrl } from '../../constants/config'
import {updateUserRole as updateUserRoleInStore , getAllUsers, removeTaskDeleted,removeUserDeleted } from '../../redux/reducers/admin'


const UserManagement = () => {

  const dispatch = useDispatch()

  const [rows,setRows] = useState([])
  const [isRoleUpdateLoading,setIsRoleUpdateLoading] = useState(false)
  const [isUserDeleteLoading,setIsUserDeleteLoading] = useState(false)

  const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 200 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'username', 
        headerName: 'Username', 
        width: 150 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'email', 
        headerName: 'Email', 
        width: 150 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'role', 
        headerName: 'Role', 
        width: 150 ,
        headerClassName: 'table-header',
        renderCell:(params)=>{

          switch(params.row.role){
            case "admin": 
              return (
                  <Chip label={params.row.role} color="error" variant="outlined" />
              )
            case "user": 
              return (
                  <Chip label={params.row.role} color="success" variant="outlined" />
              )
            case "moderator": 
              return (
                  <Chip label={params.row.role} color="primary" variant="outlined" />
              )
          }
            
        }
    },
    { 
        field: 'joined', 
        headerName: 'Joined At', 
        width: 150 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'taskCount', 
        headerName: 'Task Asssigned', 
        width: 150 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'taskPending', 
        headerName: 'Task Pending', 
        width: 150 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'taskWorking', 
        headerName: 'Task Working', 
        width: 150 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'taskCompleted', 
        headerName: 'TaskCompleted', 
        width: 150 ,
        headerClassName: 'table-header',
    },

    {
        field: 'action', 
        headerName: 'Action', 
        width: 370 ,
        headerClassName: 'table-header',
        renderCell:(params)=>{


          const role = params.row.role
      
        
          switch(role){
            case "admin": return (
                <Chip label="Admin" disabled color="secondary" variant="outlined" sx={{cursor:"pointer"}} />
            )
            case "moderator": return (
                <Stack spacing={"1rem"} direction={"row"} alignItems={"center"} mt={1}>
                  <Chip label="Make Admin" color="secondary" variant="outlined" disabled={isRoleUpdateLoading} sx={{cursor:"pointer"}} onClick={()=>{
                    updateUserRole(params.row,"admin")
                    }} />
                  <Chip label="Make User" color="primary" variant="outlined" disabled={isRoleUpdateLoading} sx={{cursor:"pointer"}} onClick={()=>{
                    updateUserRole(params.row,"user")
                    }} />
                  <Tooltip title="If user has pending tasks then it will assign to random user">
                    <Chip label="Delete User" color="error" variant="outlined" disabled={isUserDeleteLoading} sx={{cursor:"pointer"}} onClick={()=>{
                        deleteUserHandler(params.row)
                      }} />
                  </Tooltip>
                </Stack>
            )
            case "user": return (
              <Stack spacing={"1rem"} direction={"row"} alignItems={"center"} mt={1}>
              <Chip label="Make moderator" color="secondary" variant="outlined" disabled={isRoleUpdateLoading} sx={{cursor:"pointer"}} onClick={()=>{
                updateUserRole(params.row,"moderator")
                }} />
              <Chip label="Make Admin" color="primary" variant="outlined" disabled={isRoleUpdateLoading} sx={{cursor:"pointer"}} onClick={()=>{
                updateUserRole(params.row,"admin")
                }} />
                <Tooltip title="If user has pending tasks then it will assign to random user">
                    <Chip label="Delete User" color="error" variant="outlined" disabled={isUserDeleteLoading} sx={{cursor:"pointer"}} onClick={()=>{
                        deleteUserHandler(params.row)
                      }} />
                  </Tooltip>
            </Stack>
            )
          }

           
        }
    }
    
    
  ]

  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])


  const {users,loading} = useSelector((store)=>store.adminReducer)

  useEffect(()=>{
    setRows(users?.map((user,index)=>{
        return {
            id:user._id,
            joined:user?.createdAt,
            ...user

        }
    }
    ))
  },[users])

  const updateUserRole =async (user,role)=>{

      const toastId = toast.loading("Updating user role...")
      try {
          setIsRoleUpdateLoading(true)
          const {data} = await axios.put(`${serverUrl}/api/v1/admin/update/role/${user.id}`,{role},{withCredentials:true})
          toast.success(data?.message,{id:toastId})
          setIsRoleUpdateLoading(false)
          dispatch(updateUserRoleInStore({userId:user.id,role:role}))
      } catch (error) {
           toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
      }
      finally{
        setIsRoleUpdateLoading(false)
      }
  }

  const deleteUserHandler = async (user)=>{
    const toastId = toast.loading("Deleting user...")
    console.log(user);
    try {
      setIsUserDeleteLoading(true)
      const {data} = await axios.delete(`${serverUrl}/api/v1/admin/delete/user/${user.id}`,{withCredentials:true})
      toast.success(data?.message,{id:toastId})
      setIsUserDeleteLoading(false)
      dispatch(removeUserDeleted({userId:user.id}))
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
    }
    finally{
      setIsUserDeleteLoading(false)
    }
  }

  return loading? (
    <Skeleton variant='rectangular' height={"100%"} />
  ): (
    <Table 
      rows={rows} 
      columns={columns} 
      heading="User Management" 
    />
  )
}

export default AppLayout()(UserManagement)