import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../constants/config";

export const getMyTask = createAsyncThunk(
    "taskSlice/getMyTask",
    async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/v1/user/myTask`,{withCredentials:true})
            return data?.tasks
        } catch (error) {
            throw error?.response?.data?.message 
        }
    }
)


const taskSlice = createSlice({
    name:"taskSlice",
    initialState:{
        tasks:[],
        loading:false
    },
    reducers:{
        updateTaskStatus:(state,action)=>{
            console.log(action.payload);
            
            state.tasks = state.tasks.map((task)=>{
                if(task._id === action.payload.taskId){
                    task.status=action.payload.status
                }
                return task
            })
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getMyTask.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(getMyTask.fulfilled,(state,action)=>{
            state.loading = false
            state.tasks = action.payload
        })
        builder.addCase(getMyTask.rejected,(state,action)=>{
            state.loading = false
        })
    }
})

export const {updateTaskStatus} = taskSlice.actions

export default taskSlice