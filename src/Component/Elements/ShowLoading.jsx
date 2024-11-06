import Swal from "sweetalert2";

const ShowLoading = ({ loadingMessage, nextPage }) => {
  const loading = Swal.fire({
    title: loadingMessage.toString(),
    html: "Please wait...",
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer:3000,
    didOpen: () => {
      Swal.showLoading();
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      Swal.fire({
        title: "Finished!",
        icon: "uccess",
        timer: 2000,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          nextPage();
        }
      });
    }
  });

  return loading;
};

export default ShowLoading;
