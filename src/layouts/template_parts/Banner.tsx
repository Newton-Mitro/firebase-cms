import React from "react";
import { useLocation } from "react-router-dom";

interface BannerProps {}

const Banner: React.FC<BannerProps> = ({}) => {
  const location = useLocation();
  const urlArrays = decodeURIComponent(location.pathname)
    .replace(/[_-]/g, " ")
    .split("/");

  return (
    <div className="h-48 bg-[url('assets/images/22.jpg')] bg-cover bg-bottom">
      Banner
    </div>
  );
};

export default Banner;
