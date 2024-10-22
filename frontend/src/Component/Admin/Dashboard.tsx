import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  
  return (
    <div className="">
      {/* Navbar */}

      <nav className="text-black fixed w-full z-10 transition-colors duration-300 bg-white">
        <div className="container mx-auto flex justify-between items-center ">
          <div className="text-white text-2xl font-bold font-serif">
            <img
              className="w-60 h-30"
              src="https://www.aequs.com/wp-content/uploads/2021/06/Aequs-Logo-new.png"
              alt="aques-symbol"
            />
          </div>
          <div className="flex space-x-4">
            <Link to="/dashboard">
              {/* <a href="/" className="text-black px-3 py-2 rounded font-serif"> */}
              Admin DashBoard
              {/* </a> */}
            </Link>
          </div>
        </div>
      </nav>

      {/* sidebar with outlet */}
      <div className="flex">
        <div className="w-1/6 bg-slate-600 min-h-screen h-full fixed top-10 pt-20 border border-black">
          <div className="p-4">
            <h1 className="text-white text-2xl font-serif underline">Admin</h1>
            <ul className="mt-4 space-y-4">
              {/* Sidebar Links */}
              <li className="text-white font-serif">
                <Link to="">Dashboard</Link>
              </li>
              <li className="text-white font-serif">
                <Link to="/dashboard/add-department">
                  {/* Employee Updated Tasks */}
                  {/* Employee Task Update Log */}
                  Add Department
                </Link>
              </li>
              <li className="text-white font-serif">
                <Link to="addemployee">Add Employee</Link>
              </li>
              <li className="text-white font-serif">
                <Link to="viewemployee">View Employee</Link>
              </li>
              <li className="text-white font-serif">
                <Link to="addtask">Add Task</Link>
              </li>
              <li className="text-white font-serif">
                <Link to="viewtask">View Task</Link>
              </li>
              <li className="text-white font-serif">
                <Link to="/dashboard/employee-updated-tasks">
                  {/* Employee Updated Tasks */}
                  {/* Employee Task Update Log */}
                  Task Completion Summary
                </Link>
              </li>
              <li className="text-white font-serif">
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-screen bg-white min-h-screen mt-20 pl-[16.67%]">
          {/* 1/6 = ~16.67% */}
          <div className="min-h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
