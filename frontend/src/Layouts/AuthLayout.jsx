import { NavLink, Outlet } from "react-router";
import { FaArrowCircleLeft } from "react-icons/fa";

const AuthLayout = () => {
  return (
    <section className="min-h-screen max-w-7xl mx-auto my-10 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col ">
      <NavLink
        to={"/"}
        className={
          "flex gap-2 items-center no-underline text-orange hover:text-deep-orange transition-colors duration-100"
        }
      >
        <FaArrowCircleLeft className="text-lg" /> Go Home
      </NavLink>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
