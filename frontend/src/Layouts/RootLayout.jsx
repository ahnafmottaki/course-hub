import { Outlet } from "react-router";
import MainNavigation from "../shared/Components/MainNavigation";
import Footer from "../shared/Components/Footer";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
