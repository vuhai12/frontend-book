import React from "react";
import RoleBasedSidebar from "../../components/RoleBasedSidebar/RoleBasedSidebar";

const RoleBasedLayout = ({ children }) => {
  return (
    <div className="lg:flex mt-[100px] lg:mt-0 lg:gap-5 ">
      {/* Sidebar */}
      <RoleBasedSidebar />

      {/* Main Content */}
      <div className="lg:flex-1 overflow-y-auto rounded-lg">{children}</div>
    </div>
  );
};

export default RoleBasedLayout;
