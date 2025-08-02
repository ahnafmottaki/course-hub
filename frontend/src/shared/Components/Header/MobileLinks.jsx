import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const MobileLink = ({ path, children }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `text-neutral-400 block w-full text-center font-bold ${
          isActive ? "bg-gray-600" : "hover:bg-gray-600"
        } py-2 transition-colors`
      }
      to={path}
    >
      {children}
    </NavLink>
  );
};

const MobileLinks = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <MobileLink path={"/"}>Home</MobileLink>
      <MobileLink path={"/courses"}>Courses</MobileLink>
      {isLoggedIn && (
        <>
          <MobileLink path={"my-courses"}>My Courses</MobileLink>
          <MobileLink path={"/my-profile"}>My Profile</MobileLink>
        </>
      )}
    </>
  );
};

export default MobileLinks;
