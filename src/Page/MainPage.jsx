import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../redux/Slicer/departmentSlicer";
import { fetchEmployee } from "../redux/Slicer/employeeSlicer";
import { fetchProject } from "../redux/Slicer/projectSlicer";
import { fetchAssignment } from "../redux/Slicer/assignmentSlicer";
import { useEffect } from "react";
import Card from "../Component/Elements/Card";
import LoadingState from "../Component/Elements/LoadingState";
import ErrorMessage from "../Component/Elements/ErrorMessage";

const MainPage = () => {
  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);
  const employee = useSelector((state) => state.employee);
  const project = useSelector((state) => state.project);
  const assignment = useSelector((state) => state.assignment);

  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchEmployee());
    dispatch(fetchProject());
    dispatch(fetchAssignment());
  }, [dispatch]);
  return (
    <>
      {employee.isLoading &&
      department.isLoading &&
      project.isLoading &&
      assignment.isLoading ? (
        <LoadingState />
      ) : department.error ||
        employee.error ||
        project.error ||
        assignment.error ? (
        <>
          <ErrorMessage errorMessage={department.error} />
          <ErrorMessage errorMessage={employee.error} />
          <ErrorMessage errorMessage={project.error} />
          <ErrorMessage errorMessage={assignment.error} />
        </>
      ) : (
        <div className="container text-center my-4">
          <h2>Welcome to the Company Management</h2>
          <div className="container d-flex justify-content-center">
            <Card title={"Department"} description={department.data.length} />
            <Card title={"Employee"} description={employee.data.length} />
            <Card title={"Project"} description={project.data.length} />
            <Card title={"Assignment"} description={assignment.data.length} />
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
