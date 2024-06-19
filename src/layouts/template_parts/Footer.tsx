import originalLogo from "assets/brand/logo_original.png";
import myLogo from "assets/brand/my_logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div className="mt-auto flex flex-col text-center bg-[url('assets/images/22.jpg')] bg-cover bg-bottom bg-[#ff5994] shadow">
      <footer className="">
        <div className="container mx-auto flex flex-col items-center justify-center p-3 py-6">
          <Link to="#" className=" flex flex-col items-center justify-center">
            <img className="h-20" src={originalLogo} alt="header logo" />
            <p className={`mt-2 font-extrabold ${"Default" ? "" : ""}`}>
              Company
            </p>
            <p className="text-sm font-light">address</p>
          </Link>

          <p className="mb-4 text-sm font-light">
            {`©${new Date().getFullYear()} company. All Rights Reserved.`}
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <img className="-mb-2 h-6" src={myLogo} alt="header logo" />
            <p className="text-xs font-light">Developed by DC Quantum Labs</p>
          </div>
          <button
            className="px-4 text-xs  hover:font-bold hover:underline "
            onClick={() => {
              setLogin(true);
            }}
          >
            <span className="">Webmaster Login</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
