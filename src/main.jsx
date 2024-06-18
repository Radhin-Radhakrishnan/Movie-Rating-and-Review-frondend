import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from 'recoil';

import App from './App.jsx';
import './index.css';

import UserRoot from './routes/UserRoot.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Login from './Components/User Login & Signup/Login.jsx';
import SignUp from './Components/User Login & Signup/signUp.jsx'
import AdminRoot from './routes/AdminRoot.jsx';
import ManageUsers from './Components/Admin/ManageUsers/ManageUsers.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <UserRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp/>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/users",
        element: <ManageUsers />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);