import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import ShowLoading from "../../Component/Elements/ShowLoading";
import LoadingState from "../../Component/Elements/LoadingState";
import ErrorMessage from "../../Component/Elements/ErrorMessage";
import EmployeeService from "../../Service/EmployeeService";
// import LoadingWithErrorMessage from "../../Component/Elements/LoadingWithErrorMessage";
import DeleteConfirmation from "../../Component/Elements/DeleteConfirmation";
import SuccessMessage2 from "../../Component/Elements/SuccessMessage2";
import ErrorMessage2 from "../../Component/Elements/ErrorMessage2";
import ShowLoading from "../../Component/Elements/ShowLoading";
import { useSelector } from "react-redux";

const EmployeesLeaveReqApproval = () => {
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    leaveRequestId: 0,
    approval: "",
    notes: "",
  });

  const [empReqAppr, setEmpReqAppr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  console.log(empReqAppr);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        leaveRequestId: params.id,
      }));

      setIsLoading(true);
      EmployeeService.getEmployeeLeaveReqId(params.id)
        .then((res) => {
          setEmpReqAppr(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsError(err.message);
          console.log(err);
        });
    }
  }, [params.id]);

  console.log(empReqAppr);

  const onApproveLeave = () => {
    const approveConfirmation = () => {
      EmployeeService.addLeaveReqEmployeeApproval(formData)
        .then((res) => {
          SuccessMessage2({
            successMessageDesc: "Success!",
            nextPage: () => navigate("/leavereqlist"),
          });
          // ShowLoading({
          //   loadingMessage: "Processing....",
          //   nextPage: () => navigate("/leavereqlist"),
          // });
          console.log(res);
        })
        .catch((error) => {
          ErrorMessage2({
            errorMessage: "There is an error, please try again later...",
            nextPage: () => navigate("/leavereqlist"),
          });
          console.log(error);
        });
    };
    DeleteConfirmation(approveConfirmation);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApproveLeave();
  };

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorMessage errorMessage="Error" />
      ) : (
        <div className="mb-5">
          <h2 className="ms-5">Leave Request</h2>
          <div className="container border">
            <div className="container">
              <div className="container mt-4">
                <div className="card">
                  <div className="card-body">
                    {/* Requester and Status */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <p>
                          <strong>Requester:</strong>{" "}
                          {empReqAppr.data.requester}
                        </p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <p>
                          <strong>Current Status:</strong>{" "}
                          <span className="badge bg-secondary">
                            {empReqAppr.data.status}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Request Date */}
                    <p>
                      <strong>Request Date:</strong>{" "}
                      {formatDate(empReqAppr.data.requestDate)}
                    </p>

                    {/* Book Details */}
                    <h5 className="mt-4">Request Detail</h5>
                    <ul className="list-unstyled">
                      <li>
                        <strong>Type:</strong>{" "}
                        {empReqAppr.data.leaveRequest.leaveType}
                      </li>
                      <li>
                        <strong>Reason:</strong>{" "}
                        {empReqAppr.data.leaveRequest.leaveReason}
                      </li>
                      <li>
                        <strong>Start Date: </strong>
                        {empReqAppr.data.leaveRequest.startDate}
                      </li>
                      <li>
                        <strong>End Date: </strong>
                        {empReqAppr.data.leaveRequest.endDate}
                      </li>
                    </ul>

                    {/* Request History */}
                    <h5 className="mt-4">Request History</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Review Date</th>
                            <th>Action by</th>
                            <th>Action</th>
                            <th>Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {empReqAppr.data.requestHistory?.map(
                            (history, index) => (
                              <tr key={index}>
                                <td>{formatDate(history.actionDate)}</td>
                                <td>{history.actorName}</td>
                                <td>
                                  {history.action ? history.action : "N/A"}
                                </td>
                                <td>
                                  {history.comments ? history.comments : "N/A"}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                    {(empReqAppr.data.status === "Reviewed By HR Manager" &&
                      currentUser.roles?.includes("Employee Supervisor")) ||
                    (empReqAppr.data.status === "Approved" &&
                      currentUser.roles?.includes("HR Manager")) ||
                    empReqAppr.data.status === "Rejected" ? (
                      <></>
                    ) : (
                      empReqAppr.data.status && (
                        <form onSubmit={handleSubmit} className="mb-4">
                          <div className="mb-3">
                            <label
                              htmlFor="bookRequestId"
                              className="form-label"
                              hidden
                            >
                              Book Request ID
                            </label>
                            <input
                              type="number"
                              id="bookRequestId"
                              name="bookRequestId"
                              className={`form-control`}
                              value={formData.leaveRequestId}
                              onChange={handleChange}
                              required
                              placeholder={params.id}
                              disabled
                              hidden
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Status</label>
                            <div className="mt">
                              <input
                                type="radio"
                                id="Approved"
                                name="approval"
                                className={`form-check-input`}
                                value="Approved"
                                onChange={handleChange}
                                checked={formData.approval === "Approved"}
                              />
                              <label
                                htmlFor="Approved"
                                className="form-check-label ms-2"
                              >
                                Approve
                              </label>

                              <input
                                type="radio"
                                id="Reject"
                                name="approval"
                                className={`form-check-input ms-2`}
                                value="Rejected"
                                onChange={handleChange}
                                checked={formData.approval === "Rejected"}
                              />
                              <label
                                htmlFor="Rejected"
                                className="form-check-label ms-2"
                              >
                                Rejected
                              </label>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="bookRequestId"
                              className="form-label"
                            >
                              Comment
                            </label>
                            <input
                              type="text"
                              id="notes"
                              name="notes"
                              className={`form-control`}
                              value={formData.notes}
                              onChange={handleChange}
                              required
                              placeholder="Comment"
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary m-3 btn-sm"
                          >
                            Submit
                          </button>
                        </form>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeesLeaveReqApproval;
