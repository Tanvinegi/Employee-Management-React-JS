import { NavLink, useNavigate, Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { FaMoneyCheck } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import Search from "@material-ui/icons/Search";
import { VscMail } from "react-icons/vsc";
import { BsBell } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Nav, NavDropdown } from "react-bootstrap";
// import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import applify from "../../images/applify.png";
import { toast } from "react-toastify";
import "./Navbar.css";
import SidebarMenu from "./SidebarMenu";
// import profilelogo from "../../images/dplogo.png";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },

  {
    path: "/education",
    name: "Qualification Management",
    icon: <FaUserGraduate />,
  },

  {
    path: "/employee",
    name: "Employee Management",
    icon: <FiUsers />,
  },
  {
    path: "/addEmployee",
    name: "Add Employee",
    icon: <FiUserPlus />,
  },

  {
    path: "/salary",
    name: "Salary Management",
    icon: <FaMoneyCheck />,
  },

  {
    path: "/department",
    name: "Department Management",
    icon: <FcDepartment />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  // const [cookie, setCookie, removeCookie] = useCookies([]);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("jwt"));
  const username = user.data.userdetails.name;

  function LogOut() {
    localStorage.clear();
    Cookies.remove("email");
    Cookies.remove("password");
    toast.success("Logged Out Succesfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate("/");
  }
  function gotoProfile() {
    navigate("/profile");
  }

  return (
    <>
      <nav className="main-div navbar-static-top">
        <div className="container-fluid topbarLeft">
          <div className="bars" style={{ cursor: "pointer", color: "white" }}>
            <FaBars onClick={toggle} />
          </div>
          <div className="logos">
            <img src={applify} alt="Logo" id="applify-logo" />
          </div>
        </div>

        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input placeholder="Search...." className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <VscMail color="white" />
            </div>
            <div className="topbarIconItem">
              <BsBell color="white" />
            </div>

            {/* <div className="topbarIconItem">
              {userimage ? (
                <img
                  src={`http://localhost:3002/${userimage}`}
                  alt=""
                  className="topbarImg"
                />
              ) : (
                <img src={profilelogo} alt="" className="topbarImg" />
              )}
            </div> */}
            <div
              className="topbarIconItem"
              id="image"
              style={{ color: "white" }}
            >
              <Nav>
                <NavDropdown title={username} id="name-title">
                  <NavDropdown.Item onClick={LogOut}>Log Out</NavDropdown.Item>
                  {/* <NavDropdown.Item onClick={gotoProfile}>
                    Profile
                  </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "240px" : "65px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <section className="routes" style={{ marginLeft: "10px" }}>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  // activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
