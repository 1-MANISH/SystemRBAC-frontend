import {configureStore} from '@reduxjs/toolkit'
import authSlice from './reducers/auth.js'
import taskSlice from './reducers/task.js'
import adminSlice from './reducers/admin.js'
import moderatorSlice from './reducers/moderator.js'





const store = configureStore({
    reducer:{
        authReducer:authSlice.reducer,
        taskReducer:taskSlice.reducer,
        adminReducer:adminSlice.reducer,
        moderatorReducer:moderatorSlice.reducer
    }
})

export default store