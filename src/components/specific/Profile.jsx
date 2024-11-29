import { Stack, Typography } from '@mui/material'
import React from 'react'
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon,
    AccountCircle as RoleIcon
  
  } from '@mui/icons-material'

  import moment from 'moment'

const Profile = ({user}) => {
  return (
   <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} style={{height:"100%"}}  >

        <ProfileCard text={user?.username} heading="Username" Icon={FaceIcon} />
        <ProfileCard text={user?.email} heading="Email" Icon={UserNameIcon} />
        <ProfileCard text={user?.role} heading="Role" Icon={RoleIcon}/>
        <ProfileCard heading={"joined"} text={moment(user?.createdAt).fromNow()} Icon={CalendarIcon}/>
   </Stack>
  )
}

const ProfileCard = ({text,Icon,heading})=>{
    return(
        <Stack
        direction={"row"} 
        alignItems={"center"} 
        spacing={"1rem"}
        color={"white"}
        textAlign={"center"}
        >
            {
                Icon && <Icon />
            }
            <Stack>
                <Typography variant="body1">{text}</Typography>
                <Typography variant="caption" color='gray'>{heading}</Typography>
            </Stack>

        </Stack>
    )
}

export default Profile