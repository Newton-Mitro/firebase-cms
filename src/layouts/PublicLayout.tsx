import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./template_parts/Footer";
import Header from "./template_parts/Header";

function PublicLayout() {
  const [scrollFromTop, setScrollFromTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window?.scrollY > 60 ? setScrollFromTop(true) : setScrollFromTop(false);
      console.log(window?.scrollY);
    });

    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="font-sans-serif relative flex min-h-screen flex-col overflow-hidden 
    bg-fuchsia-200 text-gray-700 "
    >
      <Header scrollFromTop={scrollFromTop} />

      <div
        className={`container mx-auto p-10 ${scrollFromTop ? "pt-20" : ""} `}
      >
        <Outlet />
      </div>
      <Footer />
      {scrollFromTop && (
        <div
          className="fixed right-10 bottom-5 flex h-12 w-12  flex-col items-center justify-center rounded-full bg-pink-400 shadow-md transition-all duration-300 hover:cursor-pointer"
          onClick={() => scrollToTop()}
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
              d="m4.5 18.75 7.5-7.5 7.5 7.5"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 12.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </div>
      )}

      <div className="fixed bottom-60 -right-44 flex h-12 flex-col items-center justify-center rounded-l-full  shadow-md transition-all duration-300 hover:right-0 hover:scale-110 hover:cursor-pointer hover:shadow-lg">
        <button
          className="flex items-center justify-center gap-3 pr-5 pl-4"
          onClick={() => {
            window.open("", "_blank", "noreferrer");
          }}
        >
          <i className="fa-brands fa-facebook-messenger fa-bounce text-2xl text-blue-400"></i>
          <div className=" ">Chat with Messenger</div>
        </button>
      </div>
    </div>
  );
}

export default PublicLayout;
