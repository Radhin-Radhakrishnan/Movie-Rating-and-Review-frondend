import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot,atom,selector, useRecoilState,useRecoilValue} from 'recoil';
import React, { lazy, Suspense } from 'react'
import App from './App.jsx';
import './index.css';

import UserRoot from './routes/UserRoot.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx'
import UpdatePasswordPage from './pages/UpdatePasswordPage.jsx';
import SingleMoviePage, {loader as movieLoader} from './pages/SingleMoviePage.jsx';
import UserFavorite from './pages/UserFavorite.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Login from './Components/User Login & Signup/Login.jsx';
import SignUp from './Components/User Login & Signup/signUp.jsx';
import AdminRoot from './routes/AdminRoot.jsx';
import ManageUsers from './Components/Admin/ManageUsers/ManageUsers.jsx';
import MovieTabs from './Components/Admin/UsersReviewAndFavorites/MovieReviews.jsx';
import MovieReviews from './Components/Admin/UsersReviewAndFavorites/MovieReviews.jsx';
import FavoriteMovies from './Components/Admin/UsersReviewAndFavorites/FavoriteMovies.jsx';
import MovieList from './Components/Admin/Movie/MovieList/MovieList.jsx';
import AddMovie from './Components/Admin/Movie/MovieAdd/AddMovie.jsx';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes.jsx';
import NewlyAddedMoviePage, {loader as newMovieLoader } from './pages/NewlyAddedMoviePage.jsx';


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
        path: "/home",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/:movieId",
        element: <SingleMoviePage />,
        loader: movieLoader
      },
      {
        path: "/addedMovies/:movieId",
        element: <NewlyAddedMoviePage />,
        loader: newMovieLoader
        
      },
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
    path: "/user/favorites",
    element:(
      <PrivateRoutes>
        <UserFavorite/>
      </PrivateRoutes>

    ) ,
  },
   {
    path: "/user/update-password",
    element: <UpdatePasswordPage/>,
  },
  {
    path: "/user/reviews",
    element: (
      <PrivateRoutes>
        <ReviewsPage/>
      </PrivateRoutes>
    ),
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
      {
        path: "/admin/users/:userId/activity",
        element: <MovieTabs/>,
      },
      {
        path: "/admin/users/reviews",
        element: <MovieReviews />,
      },
      {
        path: "/admin/users/:userId/favorites",
        element: <FavoriteMovies />,
      },
      {
        path: "/admin/listOfMovies",
        element: <MovieList />,
      },
      {
        path: "/admin/addMovie",
        element: <AddMovie/>,
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