import { Outlet } from "react-router";
import SideNavbar from "../../Molecules/Navs/SideNavbar";

const ProfileTemplate = () => {
  return (
    <main className="lg:px-[8.3%] md:flex w-full sm:space-x-0 md:space-x-6  rtl:space-x-reverse my-12">
      <SideNavbar />
      <Outlet />
    </main>
  );
};

export default ProfileTemplate;
