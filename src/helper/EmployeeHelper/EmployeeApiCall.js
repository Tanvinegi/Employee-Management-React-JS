import React from "react";

// import { API } from "../../backend";

export const getEducationQualification = async () => {
  return fetch(`http://localhost:5000/education/getEducationQualification`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getDepartment = async () => {
  return fetch(`http://localhost:5000/department/getDepartment`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getSalary = async () => {
  return fetch(`http://localhost:5000/salary/getSalary`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const addEmployee = async (user) => {
  //   console.log(API);
  console.log(user);
  return await fetch(`http://localhost:5000/user/registration`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
