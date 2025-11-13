import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import AllProducts from "../Components/AllProducts";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../Components/ProductDetails";
import MyImports from "../Pages/MyImports";
import AddExport from "../Pages/AddExport";
import MyExports from "../Pages/MyExports";

const router = createBrowserRouter([
 {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: "all-products",
          element: <AllProducts/>,
        },
        {
          path: "inventory",
          element: <AllProducts/>
        },
         {
          path: "/product-Details/:id",
          element: (
            <PrivateRoute>
              <ProductDetails />
           </PrivateRoute>
        )
      },
        {
        path: "/my-imports",
        element: (
          <PrivateRoute>
            <MyImports/>
          </PrivateRoute>
        )
      },
        {
        path: "add-export",
        element: (
          <PrivateRoute>
            <AddExport />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-exports",
        element: (
          <PrivateRoute>
            <MyExports />
          </PrivateRoute>
        )
      },

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