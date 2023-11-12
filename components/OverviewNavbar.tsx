import React from "react";
import Logo from "./Logo";
import Account from "./Account";

const OverviewNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full lg:px-14 px-5">
      <Logo />
      <Account />
    </div>
  );
};

export default OverviewNavbar;
