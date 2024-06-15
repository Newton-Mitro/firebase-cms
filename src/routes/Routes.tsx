import AuthLayout from "layouts/AuthLayout";
import PublicLayout from "layouts/PublicLayout";
import { createBrowserRouter } from "react-router-dom";
import FileManager from "../protected-pages/file-manager/components/FileManager";
import ListGallery from "../protected-pages/galleries/components/ListGallery";
import HomePage from "../protected-pages/home/HomePage";
import ListPage from "../protected-pages/pages/components/ListPage";
import ListPost from "../protected-pages/posts/components/ListPost";
import ErrorPage from "../public-pages/error-page/ErrorPage";
import Login from "../public-pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "register", element: <div className="">Register</div> },
      { path: "login", element: <Login /> },
      { path: "gallery", element: <Login /> },
      { path: "contact", element: <Login /> },
      { path: "calendar", element: <Login /> },
    ],
  },
  {
    path: "/events",
    element: <PublicLayout />,
    children: [
      {
        path: "/events",
        element: <div className="">Events</div>,
      },
      { path: ":id", element: <div className="">Event Details</div> },
    ],
  },
  {
    path: "/notices",
    element: <PublicLayout />,
    children: [
      {
        path: "/notices",
        element: <div className="">Notices</div>,
      },
      { path: ":id", element: <div className="">Notice Details</div> },
    ],
  },
  {
    path: "/services",
    element: <PublicLayout />,
    children: [
      {
        path: "/services",
        element: <div className="">Services</div>,
      },
      { path: ":id", element: <div className="">Service Details</div> },
    ],
  },
  {
    path: "/career",
    element: <PublicLayout />,
    children: [
      {
        path: "/career",
        element: <div className="">Job Circulars</div>,
      },
      { path: ":id", element: <div className="">Circular Details</div> },
    ],
  },
  {
    path: "/programmes",
    element: <PublicLayout />,
    children: [
      { path: "child-care", element: <div className="">History</div> },
      {
        path: "pre-school",
        element: <div className="">Mission & Vision</div>,
      },
    ],
  },
  {
    path: "/for-parents",
    element: <PublicLayout />,
    children: [
      { path: "enrollment", element: <div className="">History</div> },
      {
        path: "parent-handbook",
        element: <div className="">Mission & Vision</div>,
      },
      { path: "tuition", element: <div className="">Moto</div> },
      { path: "school-calender", element: <div className="">History</div> },
      {
        path: "daily-schedule",
        element: <div className="">History</div>,
      },
    ],
  },
  {
    path: "/administrative",
    element: <PublicLayout />,
    children: [
      { path: "managing-committee", element: <div className="">History</div> },
      {
        path: "faculties",
        element: <div className="">Mission & Vision</div>,
      },
      { path: "other-stuffs", element: <div className="">Moto</div> },
    ],
  },
  {
    path: "/academic",
    element: <PublicLayout />,
    children: [
      { path: "book-list", element: <div className="">History</div> },
      {
        path: "exam-routine",
        element: <div className="">Mission & Vision</div>,
      },
      { path: "syllabus", element: <div className="">Moto</div> },
      {
        path: "class-routine",
        element: <div className="">Mission & Vision</div>,
      },
      {
        path: "class-test-routine",
        element: <div className="">Mission & Vision</div>,
      },
    ],
  },
  {
    path: "/about",
    element: <PublicLayout />,
    children: [
      { path: "history", element: <div className="">History</div> },
      {
        path: "mission-vision",
        element: <div className="">Mission & Vision</div>,
      },
      { path: "moto", element: <div className="">Moto</div> },
    ],
  },
  {
    path: "/facilities",
    element: <PublicLayout />,
    children: [
      { path: "science-lab", element: <div className="">History</div> },
      {
        path: "computer-lab",
        element: <div className="">Mission & Vision</div>,
      },
      { path: "library", element: <div className="">library</div> },
      { path: "club", element: <div className="">club</div> },
      {
        path: "cctv-monitoring",
        element: <div className="">cctv-monitoring</div>,
      },
      {
        path: "multimedia-class",
        element: <div className="">multimedia-class</div>,
      },
      { path: "counseling", element: <div className="">counseling</div> },
      {
        path: "educational-tour",
        element: <div className="">educational-tour</div>,
      },
      { path: "indoor-games", element: <div className="">indoor-games</div> },
    ],
  },
  {
    path: "/panel",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "file-manager", element: <FileManager /> },
      { path: "pages", element: <ListPage /> },
      { path: "posts", element: <ListPost /> },
      { path: "partners", element: <div className="">partners</div> },
      { path: "comments", element: <div className="">comments</div> },
      { path: "users", element: <div className="">users</div> },
      { path: "products", element: <div className="">products</div> },
      { path: "testimonials", element: <div className="">testimonials</div> },
      { path: "galleries", element: <ListGallery /> },
      { path: "services", element: <div className="">Services</div> },
      { path: "notices", element: <div className="">notices</div> },
      { path: "events", element: <div className="">events</div> },
      { path: "job-circulars", element: <div className="">Job Circulars</div> },
      { path: "staffs", element: <div className="">Staffs</div> },
      { path: "settings", element: <div className="">Settings</div> },
    ],
  },
]);
