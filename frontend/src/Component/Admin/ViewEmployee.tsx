import React from 'react';
import { Link } from 'react-router-dom';
import { AxiosAPI } from '../../AxiosApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';

const ViewEmployee: React.FC = () => {
  const [data, setData] = useState([]);

  const gettingData = async () => {
    try {
      const res = await AxiosAPI.get('/admin/get-employees');
      setData(res.data.employees);
      console.log(res.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingData();
  }, []);

  const deleteEmployee = async (id: any) => {
    try {
      const response = await AxiosAPI.delete(`admin/delete-employee/${id}`);
      console.log(response);
      gettingData();
    } catch (error) {
      console.log(error);
      toast.error('Some Went Wroung try After Some times');
    }
  };

  // EditEmployee

  return (
    <div className="p-5 bg-gray-100">
      <section className="flex justify-center mt-5 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {data &&
            data.map((employee: any, index: any) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-serif text-center">
                  {employee.name}
                </h1>
                <p>
                  <strong>Email:</strong> {employee.email}
                </p>

                <p>
                  <strong>Employee ID:</strong> {employee.employeeId}
                </p>
                <p>
                  <strong>Department:</strong> {employee.department}
                </p>
                {/* edit delete button */}
                <div className="flex justify-center mt-4">
                  <Link
                    to={`/dashboard/editemployee/${employee._id}`}
                    className="bg-blue-700 text-white p-2 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-700 text-white p-2 rounded ml-2"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              //
            ))}
        </div>
      </section>
    </div>
  );
};

export default ViewEmployee;
