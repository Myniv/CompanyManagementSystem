import Swal from "sweetalert2";

const ErrorMessage2 = ({ errorMessage, nextPage }) => {
  const error = Swal.fire({
    icon: "error",
    title: "Oops...",
    text: errorMessage.toString(),
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      nextPage();
    }
  });
  return error;
};

export default ErrorMessage2;
