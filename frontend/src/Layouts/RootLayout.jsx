import { Outlet } from "react-router";
import Footer from "../shared/Components/Footer";
import Header from "../shared/Components/Header";
import ToastifyContainer from "../shared/Components/ToastifyContainer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastifyContainer />
    </>
  );
};

export default RootLayout;
