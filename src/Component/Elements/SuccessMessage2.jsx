import Swal from "sweetalert2";

const SuccessMessage2 = ({successMessageDesc, nextPage}) => {
  const success = Swal.fire({
    title: "Success",
    text: successMessageDesc.toString(),
    icon: "success",
    timer: 3000,
    showConfirmButton: false,
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      nextPage();
    }
  });
  return success;
};

export default SuccessMessage2;
