import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/homePages/Home";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import AvailableCamps from "../pages/AvailableCamps";
import Dashboard from "../pages/dashboard/Dashboard";
import AddCamps from "../pages/dashboard/admin/AddCamps";
import CampDetails from "../components/CampDetails";
import JoinCamp from "../components/JoinCamp";
import RegisteredCamp from "../pages/dashboard/user/RegisteredCamp";
import ManageCamps from "../pages/dashboard/admin/ManageCamps";
import UpdateItem from "../pages/dashboard/admin/UpdateItem";
import ManageRegister from "../pages/dashboard/admin/ManageRegister";
import PrivateRoute from "../secureRoute/PrivateRoute";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AdminRoutes from "../secureRoute/AdminRoutes";
import Payment from "../pages/dashboard/user/Payment";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
import Analytics from "../pages/dashboard/user/Analytics";
import AdminProfile from "../pages/dashboard/admin/AdminProfile";
import UserProfile from "../pages/dashboard/user/UserProfile";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'camps',
            element: <AvailableCamps></AvailableCamps>
        },
        {
          path: 'details/:id',
          element: <CampDetails></CampDetails>,
          loader: ({params})=> fetch(`http://localhost:5000/camps/${params.id}`)
        },
      ]
    },

    // dashboard admin and user
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin realeted
            {
              path: 'adminProfile',
              element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
            },
            {
              path: 'addCamps',
              element: <AdminRoutes><AddCamps></AddCamps></AdminRoutes>
            },
            {
              path: 'manageCamps',
              element: <AdminRoutes><ManageCamps></ManageCamps></AdminRoutes>,
              loader: ()=> fetch('http://localhost:5000/campCount')
            },
            {
              path: 'registerCamps',
              element: <AdminRoutes><ManageRegister></ManageRegister></AdminRoutes>,
              loader: ()=> fetch('http://localhost:5000/joinCampCount')
            },
            {
              path: 'allUsers',
              element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
              path: 'update/:id',
              element: <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
              loader: ({params})=> fetch(`http://localhost:5000/camps/${params.id}`)
            },

            // user realeted
            {
              path: 'userProfile',
              element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
            {
              path: 'analytics',
              element: <PrivateRoute><Analytics></Analytics></PrivateRoute>
            },
            {
              path: 'joinCamps',
              element: <PrivateRoute><RegisteredCamp></RegisteredCamp></PrivateRoute>
            },
            {
              path: 'payment/:id',
              element: <PrivateRoute><Payment></Payment></PrivateRoute>,
              loader: ({params})=> fetch(`http://localhost:5000/joinCamp/${params.id}`)
            },
            {
              path: 'paymentHistory',
              element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            
        ]
    },


    {
      path: 'joinCamp/:id',
      element: <PrivateRoute><JoinCamp></JoinCamp></PrivateRoute>,
      loader: ({params})=> fetch(`http://localhost:5000/camps/${params.id}`)
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: 'register',
        element: <Register></Register>
    }
  ]);