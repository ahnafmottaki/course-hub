import { Outlet } from "react-router";
import Footer from "../shared/Components/Footer";
import Header from "../shared/Components/Header";
import ToastifyContainer from "../shared/Components/ToastifyContainer";
import { useEffect } from "react";
import axiosInstance from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/auth-slice";

const RootLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      try {
        const response = await axiosInstance.post("/auth/isUser");
        if (response.data.success) {
          dispatch(setUser(response.data.data));
        }
      } catch (err) {}
    })();
  }, []);
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
