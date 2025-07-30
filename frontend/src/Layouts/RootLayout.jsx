import { Outlet } from "react-router";
import Footer from "../shared/Components/Footer";
import Header from "../shared/Components/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
