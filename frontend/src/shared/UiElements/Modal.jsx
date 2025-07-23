import { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef(({ children }, ref) => {
  const modalRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current.showModal();
      },
      closeModal() {
        modalRef.current.close();
      },
    };
  });
  return <dialog ref={modalRef}>{children}</dialog>;
});

export default Modal;
