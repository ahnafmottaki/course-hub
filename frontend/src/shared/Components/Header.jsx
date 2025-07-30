import { Link, NavLink } from "react-router";

const Header = () => {
  return (
    <header className="border border-gray-950/10 py-4 sticky top-0 left-0 z-[99999] bg-gray-50">
      <section className=" section  flex justify-between items-center">
        {/* logo goes here */}
        <Link to={"/"}>
          <div className="font-pt-sans font-bold text-2xl">CourseHub</div>
        </Link>
        {/* now comes the links */}
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `font-medium ${
                    isActive ? " text-indigo-700 " : "hover:text-indigo-700"
                  } transition-colors duration-150`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `font-medium ${
                    isActive ? " text-indigo-700 " : "hover:text-indigo-700"
                  } transition-colors duration-150`
                }
                to={"/courses"}
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `font-medium ${
                    isActive ? " text-indigo-700 " : "hover:text-indigo-700"
                  } transition-colors duration-150`
                }
                to={"/my-courses"}
              >
                My Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `font-medium ${
                    isActive ? " text-indigo-700 " : "hover:text-indigo-700"
                  } transition-colors duration-150`
                }
                to={"/my-profile"}
              >
                My Profile
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* the last part with login and profile */}
        <div className="flex items-center ">
          <NavLink
            to={"/register"}
            className={({ isActive }) =>
              `font-medium ${
                isActive ? " text-indigo-700 " : "hover:text-indigo-700"
              } transition-colors duration-150`
            }
          >
            Register
          </NavLink>
          /
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              `font-medium ${
                isActive ? " text-indigo-700 " : "hover:text-indigo-700"
              } transition-colors duration-150`
            }
          >
            Login
          </NavLink>
        </div>
      </section>
    </header>
  );
};

export default Header;
