import Swal from "sweetalert2";

const LogoutConfirmation = ({ logout, nextPage }) => {
  const deleteSweetAlert = Swal.fire({
    title: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Succes!",
        text: "You Already Logout!.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          logout();
          nextPage();
        }
      });
    }
  });

  return deleteSweetAlert;
};

export default LogoutConfirmation;
