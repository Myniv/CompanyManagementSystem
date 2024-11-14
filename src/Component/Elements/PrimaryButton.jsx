/* eslint-disable react/prop-types */
const PrimaryButton = ({ type, onClick, buttonName }) => {
  return (
    <button
      type={type ? type : "button"}
      className="btn btn-primary m-1"
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default PrimaryButton;
