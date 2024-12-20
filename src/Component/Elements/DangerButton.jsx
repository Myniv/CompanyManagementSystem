/* eslint-disable react/prop-types */
const DangerButton = ({ onClick, buttonName }) => {
  return (
    <button type="button" className="btn btn-danger m-1 btn-sm" onClick={onClick}>
      {buttonName}
    </button>
  );
};

export default DangerButton;
