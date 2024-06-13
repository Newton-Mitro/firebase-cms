import AuthLayout from "layouts/AuthLayout";
import PublicLayout from "layouts/PublicLayout";
import { createBrowserRouter } from "react-router-dom";
import FileManager from "../protected-pages/file-manager/components/FileManager";
import ListGallery from "../protected-pages/galleries/index-page/ListGallery";
import HomePage from "../protected-pages/home/HomePage";
import ListPage from "../protected-pages/pages/index-page/ListPage";
import ListPost from "../protected-pages/posts/index-page/ListPost";
import ListService from "../protected-pages/services/index-page/ListService";
import ErrorPage from "../public-pages/error-page/ErrorPage";
import Login from "../public-pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Login /> }],
  },
  {
    path: "/panel",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/panel/home", element: <HomePage /> },
      { path: "file-manager", element: <FileManager /> },
      { path: "pages", element: <ListPage /> },
      { path: "posts", element: <ListPost /> },
      { path: "partners", element: <div className="">partners</div> },
      { path: "comments", element: <div className="">comments</div> },
      { path: "users", element: <div className="">users</div> },
      { path: "products", element: <div className="">products</div> },
      { path: "testimonials", element: <div className="">testimonials</div> },
      { path: "galleries", element: <ListGallery /> },
      { path: "services", element: <ListService /> },
      { path: "notices", element: <div className="">notices</div> },
      { path: "events", element: <div className="">events</div> },
      { path: "job-circulars", element: <div className="">Job Circulars</div> },
      { path: "staffs", element: <div className="">Staffs</div> },
      { path: "settings", element: <div className="">Settings</div> },
      { path: "contacts", element: <div className="">contacts</div> },
    ],
  },
]);
