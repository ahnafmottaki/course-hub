import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/register/Register";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      // login
      { path: "login", Component: Login },
      // register
      { path: "register", Component: Register },
    ],
  },
]);

export default router;
