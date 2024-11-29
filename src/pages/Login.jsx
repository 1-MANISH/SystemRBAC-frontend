import React, { useState } from 'react'
import {useInputValidation} from "6pp"
import { bgGradient } from '../constants/color'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import Title from '../components/shared/Title'
import toast from 'react-hot-toast'
import axios from 'axios'
import { serverUrl } from '../constants/config'
import { useDispatch } from 'react-redux'
import { userExists } from '../redux/reducers/auth'

const Login = () => {

    const dispatch = useDispatch()

    const [isLogin,setIsLogin] = useState(true)
    const [isLoading,setIsLoading] = useState(false)

    const username = useInputValidation()
    const email = useInputValidation()
    const password = useInputValidation()

    const handleToggle = () => {
        setIsLogin(!isLogin)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const toastId = toast.loading("Login into application...")
        try {
            setIsLoading(true)

            const formData = {
                email:email.value,
                password:password.value
            }
            const config = {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            }

            const {data} =  await axios.post(`${serverUrl}/api/v1/user/login`,formData,config)
            // dispatch
            dispatch(userExists(data?.user))
            toast.success(data?.message,{id:toastId})
            setIsLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
        }finally{
            setIsLoading(false)
        }
    }
    const handleRegister = async (e) => {  
        e.preventDefault()
        const toastId = toast.loading("Registering into application...")
        try {
            setIsLoading(true)

            const formData = {
                username:username.value,
                email:email.value,
                password:password.value
            }
            const config = {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            }

            const {data} =  await axios.post(`${serverUrl}/api/v1/user/register`,formData,config)
            // dispatch
            dispatch(userExists(data?.user))
            toast.success(data?.message,{id:toastId})
            setIsLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId})
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div
        style={{
            backgroundImage:bgGradient
        }}
    >
        <Container
            component={"main"}
            maxWidth={"xs"}
            sx={{
                height:"100vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}
        >

            <Title title='SYSTEMRBAC Login' />
            <Paper
                elevation={3}
                sx={{
                    padding:"2rem",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                }}
            >
                {
                    isLogin
                    ?
                    (
                        <>
                            <Typography variant='h5'>Login</Typography>
                            <form
                                style={{
                                    width:"100%",
                                    marginTop:"1rem"
                                }}
                                onSubmit={handleLogin}
                            >

                                <TextField
                                    
                                    value={email.value}
                                    onChange={email.changeHandler}
                                    required
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                        label="Password"
                                        variant="outlined"
                                        margin="normal"
                                        type="password"
                                        fullWidth
                                        required
                                        value={password.value}
                                        onChange={password.changeHandler}
                                />
                                <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{marginTop:"1rem"}}
                                        disabled={isLoading}
                                    >
                                        Login
                                    </Button>

                                    <Typography 
                                        textAlign={"center"} 
                                        mt={"1rem"}
                                    >
                                        OR
                                    </Typography>

                                    <Button
                                        sx={{marginTop:"1rem"}}
                                        variant="text"
                                        fullWidth
                                        onClick={handleToggle}
                                    >
                                        Register Instead
                                    </Button>

                            </form>
                        </>
                    ):
                    (
                        <>
                            <Typography variant='h5'>Register</Typography>
                            <form 
                            style={{
                                    width:"100%",
                                    marginTop:"1rem"
                                }} 
                            onSubmit={handleRegister}
                            >

                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    value={username.value}
                                    
                                    onChange={username.changeHandler}
                                />
                                <TextField
                                    
                                    value={email.value}
                                    onChange={email.changeHandler}
                                    required
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                        label="Password"
                                        variant="outlined"
                                        margin="normal"
                                        type="password"
                                        fullWidth
                                        required
                                        value={password.value}
                                        onChange={password.changeHandler}
                                />

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{marginTop:"1rem"}}
                                            disabled={isLoading}
                                        >
                                            Register
                                        </Button>

                                        <Typography 
                                            textAlign={"center"} 
                                            mt={"1rem"}
                                        >
                                            OR
                                        </Typography>

                                        <Button
                                            sx={{marginTop:"1rem"}}
                                            variant="text"
                                            fullWidth
                                            onClick={handleToggle}
                                        >
                                            Login Instead
                                        </Button>
                                    
                            </form>
                        </>
                    )
                }

            </Paper>    
        </Container>
    </div>
  )
}

export default Login