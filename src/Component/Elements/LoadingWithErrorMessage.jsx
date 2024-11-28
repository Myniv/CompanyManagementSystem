import Swal from "sweetalert2";

const LoadingWithErrorMessage = ({ loadingMessage, errorMessage }) => {
  const loading = Swal.fire({
    title: loadingMessage.toString(),
    html: "Please wait...",
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 3000,
    didOpen: () => {
      Swal.showLoading();
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage.toString(),
        showConfirmButton: true,
      });
    }
  });

  return loading;
};

export default LoadingWithErrorMessage;
