import EmployeesForm from "./Component/Layout/Employees/EmployeesForm";
import EmployeesTable from "./Component/Layout/Employees/EmployeesTable";
import { Footer } from "./Component/Modules/Footer";
import { Header } from "./Component/Modules/Header";

function App() {
  return (
    <>
      <Header />
      <EmployeesTable />
      <EmployeesForm />
      <Footer />
    </>
  );
}

export default App;
