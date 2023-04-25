import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function ProtectedRoutes(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);
  let Component = props.cmp;
  return (
    <div>
      <Component />
    </div>
  );
}

export default ProtectedRoutes;
