import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routes
import Login from "./components/login/Login";
import ForgetPwd from "./components/login/ForgetPwd";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={Login}></Route>
        <Route exact path="/forgetPwd" element={ForgetPwd}></Route>
      </Routes>
    </Router>
  );
};

export default MyRoutes;
