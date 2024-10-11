import React, { useState } from 'react';
import { AxiosAPI } from '../../AxiosApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddDepratment() {
  const [deptName, setDeptname] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeptname(e.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (deptName === '') {
        return toast('OOPS: Department Feild is Empty...');
      }
      const response = await AxiosAPI.post('/admin/add-dept', {
        department: deptName,
      });
      console.log(response);
      navigate('/dashboard/addemployee');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Add Department
            </h2>

            <div>
              <label
                htmlFor="empID"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Department name:
              </label>
              <input
                type="text"
                value={deptName}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg outline-none text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Department
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
