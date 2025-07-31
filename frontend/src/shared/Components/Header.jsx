import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import axiosInstance from "../../config/axiosInstance";
import { showSuccessOrError } from "../../utils/sweetAlert2";
import { toast } from "react-toastify";
import { removeUser } from "../../store/slices/auth-slice";

const NavigationLink = ({ path, children }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `font-medium ${
          isActive ? " text-indigo-700 " : "hover:text-indigo-700"
        } transition-colors duration-150`
      }
    >
      {children}
    </NavLink>
  );
};

const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout", null);
      if (response.data.success) {
        dispatch(removeUser());
        toast.success(response.data?.message);
      }
    } catch (err) {
      showSuccessOrError({
        type: "error",
        message: "Logout Failed, Try again later!",
        title: "Oops..",
      });
    }
  };
  return (
    <header className="border border-gray-950/10 py-4 sticky top-0 left-0 z-[999] bg-gray-50">
      <section className=" section  flex justify-between items-center">
        {/* logo goes here */}
        <Link to={"/"}>
          <div className="font-pt-sans font-bold text-2xl">CourseHub</div>
        </Link>
        {/* now comes the links */}
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <NavigationLink path={"/"}>Home</NavigationLink>
            </li>
            <li>
              <NavigationLink path={"/courses"}>Courses</NavigationLink>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <NavigationLink path={"/my-courses"}>
                    My Courses
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink path={"/my-profile"}>
                    My Profile
                  </NavigationLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* the last part with login and profile */}
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="ring-primary  w-8 rounded-full ring-2  overflow-hidden">
                  <img src={user.profilePic} alt={user.name} />
                </div>
              </div>
              <button
                className="primary-button"
                type="button"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <NavigationLink path={"/register"}>Register</NavigationLink>/
              <NavigationLink path={"/login"}>Login</NavigationLink>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
