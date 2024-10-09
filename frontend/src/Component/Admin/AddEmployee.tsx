import React from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { AxiosAPI } from '../../AxiosApi';
import { useNavigate } from 'react-router-dom';

type Employee = {
  name: string;
  email: string;

  employeeId: string;
  department: string;
};

const AddEmployee: React.FC = () => {
  const [data, setData] = useState<Employee>({
    name: '',
    email: '',

    employeeId: '',
    department: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const navigateTo = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = {
        name: data.name,
        email: data.email,
        employeeId: data.employeeId,
        department: data.department,
      };
      // = new FormData();
      // formData.append('name', data.name);
      // formData.append('email', data.email);
      // formData.append('phone', data.phone);
      // formData.append('address', data.address);
      // formData.append('employeeId', data.employeeId);
      // formData.append('department', data.department);
      // formData.append('designation', data.designation);
      // formData.append('salary', data.salary.toString());
      // formData.append('password', data.password);
      // formData.append('profile', profile as File);

      const res = await AxiosAPI.post('/admin/add-employee', formData);
      if (res.status === 200) {
        toast.success('Employee Added Successfully');
        navigateTo('/dashboard/viewemployee');
      }
    } catch (error) {
      toast.error('Failed to Add Employee');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-md shadow-md ">
        <h1 className="text-3xl font-serif text-center mb-6">Add Employee</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <input
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          {/* <input
            type="text"
            name="address"
            onChange={handleChange}
            placeholder="Address"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          <input
            type="text"
            name="employeeId"
            onChange={handleChange}
            placeholder="Employee ID"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <input
            type="file"
            name="profile"
            onChange={handleProfile}
            placeholder="Profile"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          <select
            name="department"
            onChange={handleChange}
            // placeholder="Department"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {' '}
            <option value="">Choose dept</option>
            <option value="Quality">Quality</option>
            {/* <option value="Bay 1">Bay 1</option>
            <option value="Bay 2">Bay 2</option>
            <option value="Bay 3">Bay 3</option> */}
            <option value="Shipping & Receiving">Shipping & Receiving</option>
            {/* <option value="Assembly">Assembly</option> */}
            <option value="Warehouse">Warehouse</option>
          </select>
          {/* <input
            type="text"
            name="designation"
            onChange={handleChange}
            placeholder="Designation"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          {/* <input
            type="number"
            name="salary"
            onChange={handleChange}
            placeholder="Salary"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          {/* <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
