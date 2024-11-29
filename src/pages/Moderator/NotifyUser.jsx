import React, { useEffect, useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifyUserList, removeNotificationOfUser } from '../../redux/reducers/moderator'
import { Button, Skeleton } from '@mui/material'
import Table from '../../components/shared/Table'
import {
  Send as SendIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast'
import axios from 'axios'
import { serverUrl } from '../../constants/config'

const NotifyUser = () => {

  const dispatch = useDispatch()

  const [rows,setRows] = useState([])
  const [isSendEmailLoading,setIsSendEmailLoading] = useState(false)

  const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 300 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'email', 
        headerName: 'email', 
        width: 250 ,
        headerClassName: 'table-header',
    },
    { 
        field: 'taskDue', 
        headerName: 'Number of Task Due', 
        width: 150 ,
        headerClassName: 'table-header',
    },
   
    {
        field: 'action', 
        headerName: 'Action', 
        width: 350 ,
        headerClassName: 'table-header',
        renderCell:(params)=>{
            return (
              <Button variant="outlined" endIcon={<SendIcon />} disabled={isSendEmailLoading}
              onClick={()=>{
                sendEmailHandler(params.row)
              }}
              >
              Send Email
            </Button>
                )   
        }
    }
    
    
]

  useEffect(()=>{
    dispatch(getNotifyUserList())
  },[dispatch])

  const {notifications,loading} = useSelector((store)=>store.moderatorReducer)


  useEffect(()=>{

    setRows(notifications?.map((item)=>(
      {
        id:item?.userId,
        email:item?.userEmail,
        taskDue:item?.tasks.length

      })))
  },[notifications])


  const sendEmailHandler = async(data)=>{

    
    const toastId = toast.loading("Sending email...")
    try {

      setIsSendEmailLoading(true)

      // api call
      const {data : res} = await axios.post(`${serverUrl}/api/v1/moderator/sendNotificationEmail`,data,{withCredentials:true})

      // dispatch remove this user from notification
      toast.success(res?.message,{id:toastId})
      dispatch(removeNotificationOfUser({userId:data.id}))
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
    }finally{
      setIsSendEmailLoading(false)
    }
    
  }

  return loading ? (
    <Skeleton variant='rectangular' height={"100%"} />
  ): (
    <>
        <Table
            heading="Users To Be Notified"
            columns={columns}
            rows={rows}
        />
       
    </>
  )
}

export default AppLayout()(NotifyUser)