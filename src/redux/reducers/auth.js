import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authSlice",
    initialState:{
        user:null,
        isAdmin:false,
        isModerator:false,
        isUser:false,
        loader:true
    },
    reducers:{
        userExists:(state,action)=>{
            state.user = action.payload
            switch(action.payload.role){
                case "admin":
                    state.isAdmin = true
                    break;
                case "moderator":
                    state.isModerator = true
                    break;
                case "user":
                    state.isUser = true
            }
            state.loader = false
        },
        userNotExists:(state,action)=>{
            state.user = null
            state.loader = false
            state.isAdmin = false
            state.isModerator = false
            state.isUser = false
        }
    }
})

export const {userExists,userNotExists} = authSlice.actions

export default authSlice