import React, { lazy, Suspense, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LayoutLoader from "./components/layout/LayoutLoader.jsx"
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from './constants/config.js'
import { userExists, userNotExists } from './redux/reducers/auth.js'
import NotFound from './pages/NotFound.jsx'


const Home = lazy(() => import('./pages/Home.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))
const UserTask = lazy(() => import('./components/specific/UserTask.jsx'))
const CreateTask = lazy(() => import('./components/shared/CreateTask.jsx'))
const UserManagement = lazy(() => import('./pages/Admin/UserManagement.jsx'))
const TaskManagement = lazy(() => import('./pages/Admin/TaskManagement.jsx'))
const NotifyUser = lazy(() => import('./pages/Moderator/NotifyUser.jsx'))


const App = () => {

  const dispatch = useDispatch()

  const {user,loader,isAdmin,isModerator,isUser} = useSelector((store)=>store.authReducer)
  


  useEffect(()=>{
      axios.get(`${serverUrl}/api/v1/user/me`,{withCredentials:true})
      .then((res)=>{
        dispatch(userExists(res?.data?.user))
      }).catch((err)=>{
        dispatch(userNotExists())
      })
  },[dispatch])
  
  return loader ? (
    <LayoutLoader/>
  ) : (
    <BrowserRouter>
    
      <Suspense fallback={<LayoutLoader />}>

        <Routes>

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path='/user' element={<UserTask />} />
            {isAdmin && <Route path="/admin" element={<Admin />} />}
            {isAdmin && <Route path="/admin/createTask" element={<CreateTask />} />}
            {isAdmin && <Route path="/admin/users" element={<UserManagement />} />}
            {isAdmin && <Route path="/admin/tasks" element={<TaskManagement />} />}
            {isModerator && <Route path="/moderator/notify" element={<NotifyUser  />} />}
          </Route>

          <Route 
            path="/login" 
            element={
            <ProtectedRoute user={!user} redirect='/' >
              <Login  />
            </ProtectedRoute>} 
          />

          <Route path="*" element={<NotFound />} />

        </Routes>

      

      </Suspense>

      <Toaster
        position='bottom-center'
        reverseOrder={false}
        toastOptions={{
          style: {
            background:"#363636",
            color:"#fff"
        }}
      }
      
      />

    </BrowserRouter>
  )
}

export default App