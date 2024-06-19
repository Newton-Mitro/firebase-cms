import React from "react";

interface BreadcrumbProps {}

const Breadcrumb: React.FC<BreadcrumbProps> = ({}) => {
  return (
    <div className="breadcrumb_component container relative mx-auto  w-full  ">
      <div className="absolute left-0 right-0 -bottom-5 ml-4 w-full md:ml-0">
        <div className="flex flex-wrap uppercase"></div>
      </div>
    </div>
  );
};

export default Breadcrumb;
