// DeleteConfirmation.js
import Swal from "sweetalert2";

const DeleteConfirmation = (deleteData) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting data...",
        html: "Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 1500,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(() => {
        deleteData();
      });
    }
  });
};

export default DeleteConfirmation;
