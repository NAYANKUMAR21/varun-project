import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { AxiosAPI } from '../../AxiosApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
// get departments
const getDepartments = async () => {
  try {
    const AlRes = await AxiosAPI.get('/admin/get-departments');

    console.log(AlRes.data.data);
    return AlRes.data.data;
  } catch (er: any) {
    console.log(er.message);
  }
};

const ViewEmployee: React.FC = () => {
  const [data, setData] = useState([]);
  const [depts, setdepts] = useState<{ _id: string; Name: string }[]>([]);
  const [copyData, setCopyData] = useState([]);
  const gettingData = async () => {
    try {
      const res = await AxiosAPI.get('/admin/get-employees');
      setData(res.data.employees);
      setCopyData(res.data.employees);
      console.log(res.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingData();
    const getDEpts = async () => {
      const x = await getDepartments();
      setdepts([...x]);
    };
    getDEpts();
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
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);

    const x = copyData.filter((item: any) => {
      console.log(typeof item, item);
      return item.department == e.target.value;
    });
    if (e.target.value == '') {
      return setData(copyData);
    }
    setData(x);
  };

  // EditEmployee

  return (
    <div className="p-5 bg-gray-100">
      <select
        name="department"
        className="w-full px-4 py-2 mt-2 border rounded-lg outline-none"
        onChange={handleChange}
      >
        <option value="">Choose department</option>
        {depts &&
          depts.map((ele: { _id: string; Name: string }, index: number) => {
            return (
              <option key={index} value={ele.Name}>
                {ele.Name}
              </option>
            );
          })}
        {/* <option value="">Choose Department</option>
            <option value="Quality">Quality</option> */}
        {/* <option value="Bay 1">Bay 1</option>
            <option value="Bay 2">Bay 2</option>
            <option value="Bay 3">Bay 3</option> */}
        {/* <option value="Shipping & Receiving">Shipping & Receiving</option> */}
        {/* <option value="Assembly">Assembly</option> */}
        {/* <option value="Warehouse">Warehouse</option> */}
      </select>
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
