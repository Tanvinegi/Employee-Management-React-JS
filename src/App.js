import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Employee from "./components/Table/Employee";
import Department from "./components/Table/Department";
import Salary from "./components/Table/Salary";
import Dashboard from "./pages/Dashboard";
import Mainchart from "./components/Charts/Mainchart";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration";
import ForgetPwd from "./components/login/ForgetPwd";
import ProtectedRoutes from "./ProtectedRoutes";
// import UserTable from "./components/Table/UserTable";
import Qualification from "./components/Table/Qualification";
import ProfilePwd from "../src/components/Proffile/ProfilePwd";
import ChangeForgetPassword from "./pages/ChangeForgetPassword";

import Welcome from "./components/assests/Welcome";

// details pages
import DepartmentDetails from "./pages/Details/DepartmentDetails";
import SalaryDetails from "./pages/Details/SalaryDetails";

// editDetails
import EditDepartment from "./pages/EditDepartment";

// addpages
import AddDepartment from "./components/AddDepartment/AddDepartment";
import AddEducation from "./components/AddEducation/AddEducation";
import EditSalary from "./pages/EditSalary";
import EditQualification from "./pages/EditQualification";
import EducationDetails from "./pages/Details/EducationDetails";
import AddEmployeePage from "./pages/Employee/AddEmployeePage";
import AddEmployeePage2 from "./pages/Employee/AddEmployeePage2";
import ViewEducation from "./pages/ViewEducation";
import ViewSalary from "./pages/ViewSalary";
import ViewBlockedDepartments from "./components/Table/ViewBlockedDepartments";
import ViewUnBlockedDepartments from "./components/Table/ViewUnBlockedDepartments";
import ViewBlockedEducation from "./components/Table/ViewBlockedEducation";
import ViewUnBlockedEducation from "./components/Table/ViewUnBlockedEducation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoutes cmp={Mainchart} />}
        />
        {/* <Route path="/usersM" element={<ProtectedRoutes cmp={UserTable} />} /> */}
        <Route
          path="/education"
          element={<ProtectedRoutes cmp={Qualification} />}
        />
        <Route path="/employee" element={<ProtectedRoutes cmp={Employee} />} />
        <Route
          path="/department"
          element={<ProtectedRoutes cmp={Department} />}
        />

        <Route path="/salary" element={<ProtectedRoutes cmp={Salary} />} />

        <Route path="*" element={<>page not found</>} />
        <Route path="/addAdmin" element={<ProtectedRoutes cmp={Dashboard} />} />

        {/* ----------------------details component---------------------- */}
        <Route
          path="/departmentDetails/:deptId"
          element={<ProtectedRoutes cmp={DepartmentDetails} />}
        />
        <Route
          path="/salaryDetails/:salaryId"
          element={<ProtectedRoutes cmp={SalaryDetails} />}
        />
        <Route
          path="/educationDetails/:eduId"
          element={<ProtectedRoutes cmp={EducationDetails} />}
        />

        {/* -------------- edit routes--------------------------------- */}
        <Route
          path="/editDepartment/:deptId"
          element={<ProtectedRoutes cmp={EditDepartment} />}
        />
        <Route
          path="/editSalary/:salaryId"
          element={<ProtectedRoutes cmp={EditSalary} />}
        />
        <Route
          path="/editEducation/:eduId"
          element={<ProtectedRoutes cmp={EditQualification} />}
        />

        {/* { ---------ADD ROUTES------------} */}

        <Route
          path="/addEducation"
          element={<ProtectedRoutes cmp={AddEducation} />}
        />
        <Route
          path="/addDepartment"
          element={<ProtectedRoutes cmp={AddDepartment} />}
        />
        {/* <Route
          path="/addEmployee"
          element={<ProtectedRoutes cmp={AddDepartment} />}
        /> */}

        {/* TODO employee routes */}
        <Route
          path="/addEmployee"
          element={<ProtectedRoutes cmp={AddEmployeePage} />}
        />
        <Route path="/addEmployee2" element={<AddEmployeePage2 />} />

        {/*---------- navigation routes ----------*/}
        <Route
          path="/viewEducation/:id"
          element={<ProtectedRoutes cmp={ViewEducation} />}
        />
        <Route
          path="/viewSalary/:id"
          element={<ProtectedRoutes cmp={ViewSalary} />}
        />
        <Route
          path="/viewBlockedD"
          element={<ProtectedRoutes cmp={ViewBlockedDepartments} />}
        />
        <Route
          path="/viewUnBlockedD"
          element={<ProtectedRoutes cmp={ViewUnBlockedDepartments} />}
        />

        <Route
          path="/viewBlockedEducation"
          element={<ProtectedRoutes cmp={ViewBlockedEducation} />}
        />
        <Route
          path="/ViewUnBlockedEducation"
          element={<ProtectedRoutes cmp={ViewUnBlockedEducation} />}
        />

        {/* -------------------------------other routes--------------------------------- */}
        <Route path="/profile" element={<ProtectedRoutes cmp={ProfilePwd} />} />
        {/* LOGIN ROUTES */}

        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/forgetPwd" element={<ForgetPwd />}></Route>
        <Route exact path="/register" element={<Registration />}></Route>

        <Route
          exact
          path="/reset/:adminId/:token"
          element={<ChangeForgetPassword />}
        ></Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
