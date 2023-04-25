export default function Validate(values) {
  let formErrors = {};
  const regex = /^[^\s@]+@[^\s]+\.[^\s@]{2,}$/i;
  if (!values.email) {
    formErrors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    formErrors.email = "Invalid Email format!";
  }
  if (!values.password) {
    formErrors.password = "Password is required!";
  }
  if (!values.name) {
    formErrors.firstname = " Name is required!";
  }
  if (!values.lastname) {
    formErrors.lastname = "Last Name is required!";
  }
  if (!values.latestVersion) {
    formErrors.latestVersion = "Please enter version.";
  }
  if (!values.minimumVersion) {
    formErrors.minimumVersion = "Please enter version.";
  }
  if (!values.achievementname) {
    formErrors.achievementname = "Please Enter Name.";
  }
  if (!values.message) {
    formErrors.message = "Please Enter Message.";
  }
  if (!values.Title) {
    formErrors.Title = "Please Enter title.";
  }
  return formErrors;
}
