import Swal from "sweetalert2";

const SuccessMessage2 = (successMessageDesc) => {
  const success = Swal.fire({
    title: "Success",
    text: successMessageDesc.toString(),
    icon: "success",
    timer: 1000,
    showConfirmButton: false,
  });
  return success;
};

export default SuccessMessage2;
