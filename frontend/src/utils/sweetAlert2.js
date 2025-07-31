import Swal from "sweetalert2";

const showSuccessOrError = ({ type, title, message }) => {
  Swal.fire({
    icon: type,
    title: title,
    text: message,
    showClass: {
      popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
      `,
    },
    hideClass: {
      popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster`,
    },
  });
};

export { showSuccessOrError };
