import AuthLayout from "layouts/AuthLayout";
import PublicLayout from "layouts/PublicLayout";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../protected-pages/home/HomePage";
import ListPage from "../protected-pages/pages/index-page/ListPage";
import ListPost from "../protected-pages/posts/index-page/ListPost";
import ErrorPage from "../public-pages/error-page/ErrorPage";
import Login from "../public-pages/login/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Login /> }],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AuthLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/dashboard/home", element: <HomePage /> },
      { path: "pages", element: <ListPage /> },
      { path: "posts", element: <ListPost /> },
      { path: "notices", element: <div className="">Notices</div> },
      { path: "events", element: <div className="">Events</div> },
      { path: "job-circulars", element: <div className="">Job Circulars</div> },
      { path: "staffs", element: <div className="">Staffs</div> },
      { path: "settings", element: <div className="">Settings</div> },
    ],
  },
]);
