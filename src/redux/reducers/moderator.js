import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { serverUrl } from "../../constants/config.js"

export const getNotifyUserList = createAsyncThunk(
    "moderatorSlice/getNotifyUserList",
    async () => {
        try {
            const {data} = await axios.get(`${serverUrl}/api/v1/moderator/notifyUserList`,{withCredentials:true})
            return data?.notifications
        } catch (error) {
            throw error?.response?.data?.message 
        }
    }
)

const moderatorSlice = createSlice({
    name:"moderatorSlice",
    initialState:{
        notifications:[],
        loading:false
    },
    reducers:{
        removeNotificationOfUser:(state,action) => {
            state.notifications = state.notifications.filter((notification) => {
                return notification.userId !== action.payload.userId
            })
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getNotifyUserList.pending,(state,action) => {
            state.loading = true
        })
        builder.addCase(getNotifyUserList.fulfilled,(state,action) => {
            state.loading = false
            state.notifications = action.payload
        })
        builder.addCase(getNotifyUserList.rejected,(state,action) => {
            state.loading = false
        })
    }
})

export const {removeNotificationOfUser} = moderatorSlice.actions

export default moderatorSlice

