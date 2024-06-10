import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { CgPlayListAdd, CgPlayListRemove } from "react-icons/cg";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/brand/logo.png";
import { firebase_auth } from "../configs/firebase-config";
import useOuterClick from "../hooks/useOuterClick";

const AuthLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const navigate = useNavigate();

  console.log(firebase_auth.currentUser);

  onAuthStateChanged(firebase_auth, (user) => {
    if (!user) {
      navigate("/", { replace: true });
    }
  });

  const userRef = useOuterClick((e: any) => {
    setProfileDropdownOpen(false);
  });

  const notificationRef = useOuterClick((e: any) => {
    setNotificationDropdownOpen(false);
  });

  const logOut = () => {
    signOut(firebase_auth)
      .then(() => {
        navigate("/");
      })
      .catch((error: any) => {
        // An error happened.
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
    setNotificationDropdownOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!isNotificationDropdownOpen);
    setProfileDropdownOpen(false);
  };

  return (
    <div className="flex h-screen bg-secondary text-xs lg:text-sm text-onSecondary overflow-auto">
      {/* Left Sidebar */}
      <div
        className={`bg-secondary  border-r border-borderColor  ${
          isSidebarOpen ? "w-64" : "w-12"
        }`}
      >
        <div className="">
          <div className="">
            <Link
              to={"/panel/home"}
              className="flex items-center gap-2 bg-secondary border-b border-borderColor h-16  px-2"
            >
              <img
                className={` bg-white rounded-full ${
                  isSidebarOpen ? "h-12" : "w-12"
                }`}
                src={logo}
                alt=""
              />
              <h1 className="font-bold text-xl">My CMS</h1>
            </Link>
          </div>
          <div className="sidebar overflow-auto h-[calc(100vh-80px)]">
            {/* [ ]Sidebar Navigation Goes Here.. */}
            <ul
              className={`flex  flex-col ${
                isSidebarOpen ? "" : "items-center"
              }`}
            >
              <NavLink
                to={"/panel/home"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Home
                </span>
              </NavLink>
              <NavLink
                to={"pages"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Pages
                </span>
              </NavLink>

              <NavLink
                to={"posts"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Posts
                </span>
              </NavLink>

              <NavLink
                to={"comments"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Comments
                </span>
              </NavLink>

              <NavLink
                to={"services"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Services
                </span>
              </NavLink>
              <NavLink
                to={"products"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Products
                </span>
              </NavLink>

              <NavLink
                to={"galleries"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Galleries
                </span>
              </NavLink>

              <NavLink
                to={"testimonials"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Testimonials
                </span>
              </NavLink>

              <NavLink
                to={"notices"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Notices
                </span>
              </NavLink>
              <NavLink
                to={"events"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Events
                </span>
              </NavLink>
              <NavLink
                to={"job-circulars"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Job Circulars
                </span>
              </NavLink>
              <NavLink
                to={"staffs"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Staffs
                </span>
              </NavLink>
              <NavLink
                to={"partners"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Partners
                </span>
              </NavLink>
              <NavLink
                to={"users"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Users
                </span>
              </NavLink>
              <NavLink
                to={"settings"}
                className={({ isActive }) => {
                  return `${
                    isActive ? "text-yellow-100 font-bold bg-cyan-950/50" : ""
                  } hover:cursor-pointer hover:bg-slate-700/50 p-2 transition-all duration-300 flex items-center gap-2`;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                  />
                </svg>

                <span
                  className={`${isSidebarOpen ? "inline-block" : "hidden"}`}
                >
                  Settings
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-secondary h-16 flex items-center justify-between px-4 border-b border-borderColor">
          <button onClick={toggleSidebar} className="">
            {isSidebarOpen ? (
              <CgPlayListRemove size="32" />
            ) : (
              <CgPlayListAdd size="32" />
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="flex h-full gap-4">
            <div className="relative">
              <button
                ref={notificationRef}
                name="notifications"
                onClick={toggleNotificationDropdown}
                className="flex flex-col items-center justify-center h-full hover:cursor-pointer hover:text-gray-300w-10 hover:text-yellow-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>

                <span className="hidden lg:inline-block">Notifications</span>
              </button>

              {/* Profile Dropdown */}
              {isNotificationDropdownOpen && (
                <div className="absolute right-0 mt-1 w-72 bg-primary border border-borderColor rounded-md shadow-lg z-50">
                  <div className="p-2">Voucher Pending For Approval</div>
                  <div className="p-2">
                    Leave Application Pending For Approval
                  </div>
                  <div className="p-2">Deposit Account Created</div>
                  <div className="p-2">Loan Application Submitted</div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                ref={userRef}
                name="profile"
                onClick={toggleProfileDropdown}
                className="flex flex-col items-center justify-center h-full hover:cursor-pointer hover:text-gray-300w-10 hover:text-yellow-100 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <span className="hidden lg:inline-block">
                  {firebase_auth.currentUser?.email}
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-primary border border-borderColor rounded-md shadow-lg z-50">
                  {/* Add profile dropdown content */}
                  <Link to="#" className="block px-4 py-2">
                    Profile
                  </Link>
                  <Link to="#" className="block px-4 py-2">
                    Settings
                  </Link>

                  <hr className="border-t border-borderColor mx-2 my-1" />

                  <button
                    onClick={logOut}
                    className="block px-4 py-2 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-2 bg-primary">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
