/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Tab, Nav, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../Service/EmployeeService";

const Profile = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [errorAPI, setErrorAPI] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    position: "",
    directSupervisor: null,
    empType: "",
    empLevel: 0,
    createdAt: "",
    updatedAt: null,
    empDependents: [
      {
        empDependentId: 0,
        dependentEmpno: 0,
        fname: "",
        lname: "",
        sex: "",
        relation: "",
        birthDate: "",
      },
    ],
    empno: 0,
    dob: "",
    deactivateReason: null,
    sex: "",
    ssn: "",
    salary: "",
    isActive: false,
    deptno: 0,
  });

  useEffect(() => {
    EmployeeService.getEmployeeId(5)
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        setErrorAPI("Failed to load employee data.");
        console.error(error);
      });
  }, []);

  return (
    <>
      {errorAPI ? (
        <p>{errorAPI}</p>
      ) : (
        <div className="container">
          {/* Profile Header */}
          <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={
                  formData.sex === "Male"
                    ? "/img/boyIcon.png"
                    : "/img/girlIcon.png"
                }
                alt="Profile"
                className="rounded-circle me-3"
                width="100"
                height="100"
              />
              <div>
                <h3 className="m-0">
                  {formData.fname} {formData.lname}
                </h3>
                <p className="text-muted m-0">
                  {formData.position} - Level {formData.empLevel}
                </p>
                <p className="text-muted m-0">
                  Direct Supervisor:{" "}
                  {formData.directSupervisor
                    ? formData.directSupervisor
                    : "N/A"}
                </p>
                <p className="text-muted m-0">
                  {formData.isActive
                    ? "Active Employee"
                    : `InActive Employee : ${formData.deactivateReason}`}
                </p>
              </div>
            </div>
          </div>

          <Tab.Container id="profile-tabs" defaultActiveKey="personalInfo">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="personalInfo">Personal Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="employment">Dependent</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => navigate("/employees/5")}>
                      Edit Profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {/* Personal Info Tab */}
                  <Tab.Pane eventKey="personalInfo">
                    <Card>
                      <Card.Body>
                        <h5>Personal Information</h5>
                        <div className="mb-3">
                          <strong>Personal Data</strong>
                          <p>Gender: {formData.sex}</p>
                          <p>Date of Birth: {formData.dob}</p>
                        </div>
                        <div className="mb-3">
                          <p>SSN: {formData.ssn}</p>
                        </div>
                        <div className="mb-3">
                          <strong>Contact</strong>
                          <p>Phone Number: {formData.phoneNumber}</p>
                          <p>Primary Email: {formData.emailAddress}</p>
                        </div>
                        <div className="mb-3">
                          <strong>Home Address</strong>
                          <p>{formData.address}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  <Tab.Pane eventKey="employment">
                    <Card>
                      <Card.Body>
                        {formData.empDependents?.map((dependent, index) => (
                          <>
                            <h5>Dependent1 Information {index + 1}</h5>
                            <div className="mb-3">
                              <strong>
                                {dependent.fname} {dependent.lname}
                              </strong>
                              <p>Gender: {dependent.sex}</p>
                              <p>Date of Birth: {dependent.birthDate}</p>
                              <p>Relation: {dependent.birthDate}</p>
                            </div>
                          </>
                        ))}
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      )}
    </>
  );
};

export default Profile;
