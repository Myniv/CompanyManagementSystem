import Swal from "sweetalert2";

const DeleteConfirmation = ({deleteData}) => {
  const deleteSweetAlert = Swal.fire({
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
        title: "Deleted!",
        text: "Your data has been deleted.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      }).then((result) => {
        if(result.dismiss === Swal.DismissReason.timer){
            deleteData();
        }
      })

    }
  });

  return deleteSweetAlert
};

export default DeleteConfirmation
