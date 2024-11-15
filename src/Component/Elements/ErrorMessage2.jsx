import Swal from "sweetalert2";

const ErrorMessage2 = (errorMessage) => {
  const error = Swal.fire({
    icon: "error",
    title: "Oops...",
    text: errorMessage.toString(),
  });
  return error;
};

export default ErrorMessage2;
