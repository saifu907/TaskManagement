import React from "react";
import { NavLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { MdOutlinePendingActions } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";

function Sidebar() {
  return (
    <>
      <h2 className="text-center mb-5 d-none d-md-block">Task Manager</h2>
      <ul className="nav nav-pills flex-column mb-auto w-100 gap-4 mt-5">
        <li className="nav-item">
          <NavLink
            to="/"
            className="nav-link activeLink text-dark d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start"
          >
            <FaTasks className="fs-5" />
            <span className="d-none d-md-inline">All Task</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Completed"
            className="nav-link activeLink text-dark d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start"
          >
            <MdTaskAlt className="fs-5" />
            <span className="d-none d-md-inline">Completed</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/InProgress"
            className="nav-link activeLink text-dark d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start"
          >
            <GoTasklist className="fs-5" />
            <span className="d-none d-md-inline">In Progress</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Pending"
            className="nav-link activeLink text-dark d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start"
          >
            <MdOutlinePendingActions className="fs-5" />
            <span className="d-none d-md-inline">Pending</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/OverDue"
            className="nav-link activeLink text-dark d-flex align-items-center gap-2 rounded-1 justify-content-center justify-content-md-start"
          >
            <BiTaskX className="fs-5" />
            <span className="d-none d-md-inline">Over Due</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default Sidebar;