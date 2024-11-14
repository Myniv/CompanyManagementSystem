/* eslint-disable react/prop-types */
const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {errorMessage ? errorMessage : ""}
    </div>
  );
};

export default ErrorMessage;
