import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";

const router = createBrowserRouter([
 {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home></Home>,
        }
    ]
 } ,
 
 

   // Auth Layout Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login",
        element: <Login /> 
      },
      { path: "/auth/register", 
        element: <Register /> 
      },
    ],
  },


  { path: "*", 
    element: <NotFound /> 
  },
])

export default router