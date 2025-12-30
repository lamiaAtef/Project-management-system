
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './Modules/Shared/components/AuthLayout/AuthLayout';
import NotFound from './Modules/Shared/components/NotFound/NotFound';
import Login from './Modules/AuthModule/Components/Login/Login';
import Register from './Modules/AuthModule/Components/Register/Register';
import ForgetPassword from './Modules/AuthModule/Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Modules/AuthModule/Components/ResetPassword/ResetPassword';
import ChangePassword from './Modules/AuthModule/Components/ChangePassword/ChangePassword';
import Verify from './Modules/AuthModule/Components/Verify/Verify';
import { ToastContainer } from 'react-toastify';


function App() {

  const routes = createBrowserRouter(
    [
      {
        path:"",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login/>},
          {path:"login",element:<Login/>},
          {path:"register",element:<Register/>},
          {path:"forget-pass",element:<ForgetPassword/>},
          {path:"reset-pass",element:<ResetPassword/>},
          {path:"verify-account",element:<Verify/>},
          {path:"change-pass",element:<ChangePassword/>}
        ]
      }

    ]
  )
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer/>
     
    </>
  )
}

export default App
