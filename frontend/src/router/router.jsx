import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/register/Register";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [{ path: "register", Component: Register }],
  },
]);

export default router;
