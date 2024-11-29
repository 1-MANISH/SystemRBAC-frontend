import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../../constants/config";
import axios from "axios";


export const getDashBoardStats = createAsyncThunk(
    "adminSlice/getDashBoardStats",
    async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/v1/admin/dashboard/stats`,{withCredentials:true})

            return data
            
        } catch (error) {
            throw error?.response?.data?.message 
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "adminSlice/getAllUsers",
    async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/v1/admin/all/users`,{withCredentials:true})
            return data?.users
        } catch (error) {
            throw error?.response?.data?.message 
        }
    }
)
export const getAllTasks = createAsyncThunk(
    "adminSlice/getAllTasks",
    async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/v1/admin/all/tasks`,{withCredentials:true})
            return data?.tasks
        } catch (error) {
            throw error?.response?.data?.message 
        }
    }
)


const adminSlice = createSlice({
    name:"adminSlice",
    initialState:{
        users:[],
        tasks:[],
        stats:{},
        loading:false
    },
    reducers:{
        updateUserRole:(state,action)=>{
            state.users = state.users.map((user)=>{
                if(user._id === action.payload.userId){
                    user.role = action.payload.role
                }
                return user
            })
        },
        removeTaskDeleted:(state,action)=>{
            state.tasks = state.tasks.filter((task)=>{
                return task._id !== action.payload.taskId
            })
        },
        removeUserDeleted:(state,action)=>{    
            state.users = state.users.filter((user)=>{
                return user._id !== action.payload.userId
            })
        }
    },  
    extraReducers:(builder)=>{
        builder.addCase(getDashBoardStats.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getDashBoardStats.fulfilled,(state,action)=>{
            state.loading = false
            state.stats = action.payload
        })
        builder.addCase(getDashBoardStats.rejected,(state,action)=>{
            state.loading = false
        })

        builder.addCase(getAllUsers.pending,(state,action)=>{    
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.loading = false
            state.users = action.payload
        })
        builder.addCase(getAllUsers.rejected,(state,action)=>{
            state.loading = false
        })

        builder.addCase(getAllTasks.pending,(state,action)=>{    
            state.loading = true
        })
        builder.addCase(getAllTasks.fulfilled,(state,action)=>{
            state.loading = false
            state.tasks = action.payload
        })
        builder.addCase(getAllTasks.rejected,(state,action)=>{
            state.loading = false
        })
    }
})

export const {updateUserRole,removeTaskDeleted,removeUserDeleted} = adminSlice.actions

export default adminSlice