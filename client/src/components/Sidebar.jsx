import React from "react";
import { NavLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { MdOutlinePendingActions } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import { useTheme } from "../context/mode";

function Sidebar() {
  const { themeMode } = useTheme(); 
  
  const linkHoverClass = themeMode === "dark" ? "hover-dark": "hover-light";
  
  
  return (
    <>
      <h2 className="text-center mb-5 d-none d-md-block ">Task Manager</h2>
      <ul className={`d-flex list-unstyled  nav-pills gap-3  flex-sm-column mb-auto w-100 gap-4 mt-sm-5   justify-content-evenly `}>
        <li className="">
          <NavLink
            to="/"
            className={`nav-link py-3 py-sm-2 ${linkHoverClass} d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start`}
          >
            <FaTasks className="fs-5  mx-3 ms-sm-2 me-sm-1" />
            <span className="d-none d-md-inline">All Task</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Completed"
            className={`nav-link py-3 py-sm-2 ${linkHoverClass} d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start`}
          >
            <MdTaskAlt className="fs-5 mx-3 ms-sm-2 me-sm-1" />
            <span className="d-none d-md-inline">Completed</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/InProgress"
            className={`nav-link py-3 py-sm-2 ${linkHoverClass} d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start`}
          >
            <GoTasklist className="fs-5 mx-3 ms-sm-2 me-sm-1" />
            <span className="d-none d-md-inline">In Progress</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Pending"
            className={`nav-link py-3 py-sm-2 ${linkHoverClass} d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start`}
          >
            <MdOutlinePendingActions className="fs-5 mx-3 ms-sm-2 me-sm-1" />
            <span className="d-none d-md-inline">Pending</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/OverDue"
            className={`nav-link py-3 py-sm-2 ${linkHoverClass} d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start`}
          >
            <BiTaskX className="fs-5 mx-3 ms-sm-2 me-sm-1" />
            <span className="d-none d-md-inline">Over Due</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default Sidebar;
