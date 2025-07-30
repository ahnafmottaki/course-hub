import { createPortal } from "react-dom";
import { Bounce, ToastContainer } from "react-toastify";

const ToastifyContainer = () => {
  return createPortal(
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnHover={false}
      theme="light"
      transition={Bounce}
    />,
    document.getElementById("toast-container")
  );
};

export default ToastifyContainer;
