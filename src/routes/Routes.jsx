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
        element: <Dashboard></Dashboard>,
        children: [
            // admin realeted
            {
              path: 'addCamps',
              element: <AddCamps></AddCamps>
            },

            // user realeted
            {
              path: 'joinCamps',
              element: <RegisteredCamp></RegisteredCamp>
            }
        ]
    },


    {
      path: 'joinCamp/:id',
      element: <JoinCamp></JoinCamp>,
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