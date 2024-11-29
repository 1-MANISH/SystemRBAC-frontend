import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
   Dashboard as DashboardIcon ,
   PeopleAlt as PeopleAltIcon,
   Task as TaskIcon,
   ExitToApp as ExitToAppIcon

  } from '@mui/icons-material';
import { userNotExists } from '../../redux/reducers/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { serverUrl } from '../../constants/config';

const SpeedDialBox = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const logoutHandler = async ()=>{
      try {

          const {data} = await axios.get(`${serverUrl}/api/v1/user/logout`,{withCredentials:true})
          toast.success(data?.message)
          dispatch(userNotExists())

      } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message || "Something went wrong")
      }
  }

    const options = [
      {
        icon:<PeopleAltIcon />,
        name:"Users",
        func: () => {
          navigate("/admin/users")
        }
      },
      {
        icon:<TaskIcon />,
        name:"Task",
        func: () => {
          navigate("/admin/tasks")
        }
      },
      {
        icon:<ExitToAppIcon />,
        name:"logout",
        func: logoutHandler
      }
    ]

  return (
    <Fragment>
        {/* <Backdrop open={true} style={{zIndex:"9"}} /> */}
        <SpeedDial
            ariaLabel="SpeedDial"
            sx={{ position: 'fixed', top: 66, right: 16 }}
            icon={<DashboardIcon />}
            direction="down"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            className='speedDial'
            style={{zIndex:"99"}}
        
        >

          {
                options.map((item)=>{
                    return(
                        <SpeedDialAction
                            key={item.name}
                            icon={item.icon}
                            tooltipTitle={item.name}
                            onClick={item.func}
                            tooltipOpen={window.innerWidth <= 600 ? true : false}
                        />
                    )
                })
            }       

        </SpeedDial>
    </Fragment>
  )
}

export default SpeedDialBox