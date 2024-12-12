/* eslint-disable react/prop-types */
const Card = ({ title, description }) => {
  return (
    <div className="card text-center m-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title bg-dark text-white p-2 rounded">{title}</h5>
        <p
          className="card-text"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export { Card };
