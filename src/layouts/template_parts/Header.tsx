import originalLogo from "assets/brand/logo.png";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface HeaderProps {
  scrollFromTop: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrollFromTop }) => {
  const [OpenTopNav, setOpenTopNav] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <header
        className={`${
          scrollFromTop ? "fixed top-0 left-0 right-0 h-20" : "h-52 pt-28"
        } z-50  w-full shadow transition-all bg-[url('assets/images/17.jpg')] bg-cover bg-bottom bg-[#ff5994]`}
      >
        <div className={`relative h-full`}>
          <div className="container mx-auto flex h-full flex-wrap items-center justify-between">
            <div className="ml-3 md:ml-0">
              <Link to="/" className="flex ">
                <img
                  className={`h-20 mr-3 transition-all`}
                  src={originalLogo}
                  alt="header logo"
                />
                <div
                  className={`flex flex-col justify-center font-rock-salt transition-all drop-shadow `}
                >
                  <h1 className="text-gray-700">
                    DC{" "}
                    <span className="font-extrabold text-gray-700">
                      Child Care
                    </span>
                  </h1>
                  <h1 className="-mb-1.5 text-gray-700">
                    and{" "}
                    <span className="font-extrabold text-gray-700">
                      Education Center
                    </span>
                  </h1>
                </div>
              </Link>
            </div>

            <button
              type="button"
              className="mx-3 inline-flex items-center justify-center rounded-lg lg:hidden"
              onClick={() => {
                setOpenTopNav(!OpenTopNav);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/3000/svg"
              >
                <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
              </svg>
            </button>

            <div
              className={`${
                OpenTopNav
                  ? "fixed inset-0 top-20 h-screen w-screen    "
                  : "hidden"
              } lg:block`}
            >
              <ul
                className={`flex h-20 flex-col items-center gap-4 lg:flex-row`}
              >
                <li>
                  <NavLink
                    to="/"
                    className="main-menu flex items-center justify-center transition-all duration-300 hover:font-bold"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="group flex flex-col items-center gap-4 lg:relative">
                  <NavLink
                    className="main-menu transition-all duration-300 hover:font-bold"
                    to="/about/about-us"
                  >
                    About
                  </NavLink>
                  <ul
                    className="flex flex-col items-center hover:cursor-pointer group-hover:visible bg-pink-500
                  lg:invisible lg:absolute lg:right-0 lg:top-12 lg:z-10 lg:w-72 lg:overflow-hidden lg:rounded-b-md"
                  >
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300 lg:text-right hover:bg-pink-600"
                      to="/about/about-us"
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300  lg:text-right hover:bg-pink-600"
                      to="/about/mission-vision"
                    >
                      Mission & Vision
                    </NavLink>
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300  lg:text-right hover:bg-pink-600"
                      to="/about/the-pioneer-of-the-credit-union"
                    >
                      Pioneer of Credit Union
                    </NavLink>
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300  lg:text-right hover:bg-pink-600"
                      to="/about/founder-of-bangle-credit"
                    >
                      Founder of Bangle Credit
                    </NavLink>
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300  lg:text-right hover:bg-pink-600"
                      to="/about/president-message"
                    >
                      Precedent Message
                    </NavLink>
                  </ul>
                </li>

                <li className="group flex flex-col items-center gap-4 lg:relative ">
                  <NavLink
                    className="main-menu transition-all duration-300 hover:font-bold"
                    to={"/leadership/Office Bearer"}
                  >
                    Leadership
                  </NavLink>
                  <ul className="flex flex-col items-center   hover:cursor-pointer group-hover:visible   lg:invisible lg:absolute lg:right-0 lg:top-12 lg:z-10 lg:w-72 lg:overflow-hidden lg:rounded-b-md">
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300  lg:text-right"
                      to="/leadership/Office Bearer"
                    >
                      Office Bearer
                    </NavLink>
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300  lg:text-right"
                      to="/leadership/Board Of Director"
                    >
                      Board Of Directors
                    </NavLink>
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300  lg:text-right"
                      to="/leadership/Supervisory Committee"
                    >
                      Supervisory Committee
                    </NavLink>
                    <NavLink
                      className="main-menu w-full px-4 py-2 text-center transition-all duration-300  lg:text-right"
                      to="/leadership/Credit Committee"
                    >
                      Credit Committee
                    </NavLink>
                  </ul>
                </li>

                <li>
                  <NavLink
                    to="/services"
                    className="main-menu transition-all duration-300 hover:font-bold "
                  >
                    Programs
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/saving-deposits"
                    className="main-menu transition-all duration-300 hover:font-bold "
                  >
                    For Parents
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/notices"
                    className="main-menu transition-all duration-300 hover:font-bold "
                  >
                    Notices
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/gallery"
                    className="main-menu transition-all duration-300 hover:font-bold "
                  >
                    Gallery
                  </NavLink>
                </li>

                <li className="group relative inline-block">
                  <NavLink
                    to="/career"
                    className="main-menu transition-all duration-300 hover:font-bold "
                  >
                    Career
                  </NavLink>
                </li>

                <li className="group relative inline-block">
                  <NavLink
                    to="/contact"
                    className="main-menu transition-all duration-300 hover:font-bold "
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
