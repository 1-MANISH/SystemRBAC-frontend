import { AppBar, Box, Toolbar, Tooltip, Typography,IconButton } from '@mui/material'
import React from 'react'
import {
    EditNotifications as NotifyIcon,
    Logout as LogoutIcon,
    Assignment as AssignmentIcon,
    AdminPanelSettings as DashboardIcon,
    Create as CreateIcon
} from '@mui/icons-material'
import {orange} from "./../../constants/color"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import { serverUrl } from '../../constants/config'
import { useNavigate } from 'react-router-dom'
import SpeedDialBox from '../specific/SpeedDialBox'

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user,isAdmin,isModerator,isUser} = useSelector((store)=>store.authReducer)

    const logoutHandler = async ()=>{
        try {

            const {data} = await axios.get(`${serverUrl}/api/v1/user/logout`,{withCredentials:true})
            toast.success(data?.message)
            dispatch(userNotExists())
            navigate("/login")

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    const userOnClick = () =>{
        navigate("/user")
    }

    const onDashboardClick = () =>{
        navigate("/admin")
    }
    const notifyUserOnClick = () =>{
        navigate("/moderator/notify")
    }
    const createTaskOnClick = () =>{
        navigate("/admin/createTask")
    }
  return (
    <Box
        sx={{flexGrow:1}}
        height={"4rem"}
    
    >

        <AppBar
            position='static'
            height={"4rem"}
            sx={{
                bgcolor:orange,
                color:"white",
            }}
       >

       <Toolbar>

        <Typography
            variant='h6'
            onClick={()=>navigate("/")}  
            sx={{cursor:"pointer"}} 
        >

            SYSTEM_RBAC
        </Typography>

        <Box 
            sx={{flexGrow:1}}
        />

        <Box>

            {
              ( isUser || isModerator) && <IconBtn
                    title={"My Tasks"}
                    icon={<AssignmentIcon/>}
                    onClick={userOnClick}
                />
            }
            {
                isModerator && (
                    <IconBtn
                        title="Add Task"
                        icon={<NotifyIcon/>}
                        onClick={notifyUserOnClick}
                    />
                )
            }
            {
                isAdmin && (
                    <IconBtn
                        title="Create Task"
                        icon={<CreateIcon/>}
                        onClick={createTaskOnClick}
                    />
                )
            }
            {
                isAdmin && (
                    <IconBtn
                        title="Dashboard"
                        icon={<DashboardIcon/>}
                        onClick={onDashboardClick}
                    />
                )
            }
            <IconBtn
                title="Logout"
                icon={<LogoutIcon/>}
                onClick={logoutHandler}
            />
            {
                isAdmin && (
                    <SpeedDialBox/>
                )
            }


        </Box>

       </Toolbar>
    </AppBar>

    </Box>
  )
}


const IconBtn = ({title,icon,onClick})=>{
    return(
        <Tooltip title={title}>
            <IconButton
                color="inherit"
                size="large"
                onClick={onClick}
            >
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default Header