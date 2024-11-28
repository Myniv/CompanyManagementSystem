/* eslint-disable react/prop-types */
const SecondaryButton = ({ onClick, buttonName }) => {
  return (
    <button type="button" className="btn btn-info m-1 btn-sm" onClick={onClick}>
      {buttonName}
    </button>
  );
};

export default SecondaryButton;
