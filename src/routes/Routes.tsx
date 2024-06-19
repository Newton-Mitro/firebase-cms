import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import PublicLayout from "../layouts/PublicLayout";
import ListEvent from "../protected-pages/events/components/ListEvent";
import FileManager from "../protected-pages/file-manager/components/FileManager";
import ListGallery from "../protected-pages/galleries/components/ListGalleries";
import HomePage from "../protected-pages/home/HomePage";
import ListNotice from "../protected-pages/notices/components/ListNotice";
import ListPage from "../protected-pages/pages/components/ListPage";
import ListPost from "../protected-pages/posts/components/ListPost";
import ListService from "../protected-pages/services/components/ListService";
import SiteSettings from "../protected-pages/settings/components/SiteSettings";
import ErrorPage from "../public-pages/error-page/ErrorPage";
import Login from "../public-pages/login/Login";
import Register from "../public-pages/register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <div className="text-xl">
            In publishing and graphic design, Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/)
            is a placeholder text commonly used to demonstrate the visual form
            of a document or a typeface without relying on meaningful content.
            Lorem ipsum may be used as a placeholder before the final copy is
            available. It is also used to temporarily replace text in a process
            called greeking, which allows designers to consider the form of a
            webpage or publication, without the meaning of the text influencing
            the design. Lorem ipsum is typically a corrupted version of De
            finibus bonorum et malorum, a 1st-century BC text by the Roman
            statesman and philosopher Cicero, with words altered, added, and
            removed to make it nonsensical and improper Latin. The first two
            words themselves are a truncation of dolorem ipsum ("pain itself").
            Versions of the Lorem ipsum text have been used in typesetting at
            least since the 1960s, when it was popularized by advertisements for
            Letraset transfer sheets.[1] Lorem ipsum was introduced to the
            digital world in the mid-1980s, when Aldus employed it in graphic
            and word-processing templates for its desktop publishing program
            PageMaker. Other popular word processors, including Pages and
            Microsoft Word, have since adopted Lorem ipsum,[2] as have many
            LaTeX packages,[3][4][5] web content managers such as Joomla! and
            WordPress, and CSS libraries such as Semantic UI. In publishing and
            graphic design, Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/) is a placeholder
            text commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before the final copy is available. It is also
            used to temporarily replace text in a process called greeking, which
            allows designers to consider the form of a webpage or publication,
          </div>
        ),
      },
      { path: "register", element: <Register /> },
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
      { path: "services", element: <ListService /> },
      { path: "notices", element: <ListNotice /> },
      { path: "events", element: <ListEvent /> },
      { path: "job-circulars", element: <div className="">Job Circulars</div> },
      { path: "staffs", element: <div className="">Staffs</div> },
      { path: "settings", element: <SiteSettings /> },
    ],
  },
]);
