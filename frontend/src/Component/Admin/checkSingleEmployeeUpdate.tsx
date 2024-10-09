import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosAPI } from '../../AxiosApi';
interface Employee {
  department: string;
  email: string;
  employeeId: string; // Assuming this is a string representation of the employee ID
  name: string;
  __v: number; // Version key, typically used by MongoDB
  _id: string; // MongoDB ObjectId as a string
}

interface Solution {
  comment: string;
  DateAdded: string; // ISO date string
  employee: Employee; // Assuming this is a string representation of an ObjectId
  _id: string; // Assuming this is a string representation of an ObjectId
}

interface TaskEach {
  category: string;
  createdAt: string; // ISO date string
  deadline: string; // ISO date string or a date format
  department: string;
  description: string;
  solutions: Solution[]; // Array of Solution objects
  status: string;
  task: string;
  __v: number;
  _id: string; // MongoDB ObjectId as a string
}

interface EmployeeData {
  name: string;
  department: string;
  count: number;
  employeeId: string;
  comment: string;
  Date: string;
  Category: string[];
}
function CheckSingleEmployeeUpdate() {
  // get-task-update-of-single-user/:employee_id
  //   const employee = localStorage.getItem('employee');
  //   const employeeData = employee ? JSON.parse(employee) : null;

  const { id, id2 } = useParams();

  const [data, setData] = useState<TaskEach[]>([]);
  const [loader, setLoader] = useState(false);
  const [EmpDetails, SetEmpDetails] = useState<EmployeeData>({
    name: '',
    department: '',
    count: 0,
    employeeId: '',
    comment: '',
    Date: new Date().toLocaleDateString('en-US'),
    Category: [],
  });

  // console.log(id);

  const getUpdatesSingleEmp = async () => {
    try {
      setLoader(true);
      const response = await AxiosAPI.get(
        `admin/get-task-update-of-single-user/${id}/${id2}`
      );
      setLoader(false);
      // console.log(response.data);
      setData(response.data.data);

      const NameEmp = response.data.data[0]?.solutions.filter(
        (ele: Solution) => {
          // console.log('inside filter', ele);
          return ele.employee.employeeId == id2;
        }
      )[0];
      const categories = [...new Set(data.map((task) => task.category))];

      console.log('categories', categories);
      SetEmpDetails({
        name: response.data.name,
        count: response.data.count,
        department: response.data.department,
        employeeId: response.data.employeeId,
        comment: NameEmp.comment ? NameEmp.comment : '',
        Date: NameEmp.DateAdded ? NameEmp.DateAdded : '',
        Category: categories,
      });
    } catch (er) {
      setLoader(false);
      return console.log(
        er instanceof Error
          ? er.message
          : 'Something wrong happened check single user file'
      );
    }
  };
  // console.log('data check single user', data);
  useEffect(() => {
    getUpdatesSingleEmp();
  }, []);

  return (
    <div className="mt-10">
      {loader && <h1 className="text-center">Loading...</h1>}

      {data.length === 0 && !loader && (
        <h1 className="text-center">No data found</h1>
      )}
      {EmpDetails.name && (
        <div className="flex justify-space-between items-start">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mb-5 mr-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Employee Info
            </h2>

            <div className="mb-4">
              <span className="text-gray-500">Name:</span>
              <span className="text-gray-800 ml-2">{EmpDetails.name}</span>
            </div>

            <div className="mb-4">
              <span className="text-gray-500">Department:</span>
              <span className="text-gray-800 ml-2">
                {EmpDetails.department}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-gray-500">Employee ID:</span>
              <span className="text-gray-800 ml-2">
                {EmpDetails.employeeId}
              </span>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mb-10">
            <div className="mb-4">
              <span className="text-gray-500">Date Updated:</span>
              <span className="text-gray-800 ml-2">
                {new Date(EmpDetails.Date).toLocaleDateString('en-US')}
              </span>
            </div>
            {/* {data[0].solutions[0].comment} */}
            <div>
              <span className="text-gray-500">Comment</span>
              <span className="text-gray-800 ml-2">{EmpDetails.comment}</span>
            </div>
          </div>
        </div>
      )}
      <section className="container font-mono min-h-screen">
        <div className="w-full mb-8 rounded-lg shadow-lg bg-white">
          <div className="w-full">
            <table className="w-full table-auto justify-between">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  {/* <th className="px-4 py-2 text-left"></th> */}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((task: any, index) => {
                    const categoryName = task.category;
                    let showCategory = true;

                    // Check if the category has already been displayed
                    if (
                      index > 0 &&
                      (data[index - 1] as { category: string })?.category ===
                        categoryName
                    ) {
                      showCategory = false;
                    }

                    return (
                      <React.Fragment key={task._id}>
                        {showCategory && (
                          <tr className="bg-red-300 font-bold text-lg">
                            <td colSpan={3} className="px-4 py-2">
                              {categoryName}
                            </td>
                          </tr>
                        )}
                        <tr className="border-t border-gray-200">
                          <td className="px-4 py-2 w-2/6">
                            <div className="flex items-center text-sm">
                              <div>
                                <p className="font-semibold text-black">
                                  {task.task}
                                </p>
                                {/* <p className="text-xs text-gray-600">
                                  Description: {task.description}
                                </p> */}
                                {/* <p className="text-xs text-gray-600">
                                  Deadline: {task.deadline}
                                </p> */}

                                {/* <p className="text-xs text-gray-600">
                                  Department: {task.department}
                                </p> */}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2 w-3/6 flex gap-1">
                            {/* {task.solutions.map(
                              (solution: any, index: number) => (
                                <div
                                  key={index}
                                  className="bg-white rounded-lg p-3 border  border-gray-300"
                                >
                                  <p className="text-sm">
                                    {index + 1}. <strong>Name:</strong>{' '}
                                    {solution.name} &nbsp;{' '}
                                    <strong>Reply:</strong> {solution.solution}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    <strong>Status:</strong> {solution.Status}{' '}
                                    &nbsp; <strong>Date:</strong>{' '}
                                    {solution.Date?.substring(0, 10)}
                                  </p>
                                </div>
                              )
                            )} */}
                            {/* {task.solutions} */}
                            {/* Replies */}
                            <p className="text-xs text-gray-600">
                              {task.status}
                            </p>
                          </td>
                          {/* <td className="px-4 py-2 text-xs cursor-pointer bg-green-50">
                            <details>
                              <summary className="text-sm">Update</summary>
                              <article className="p-2 flex justify-between gap-1">
                                <Link
                                  to={`/dashboard/edittask/${task._id}`}
                                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
                                >
                                  Edit
                                </Link>
                                <button
                                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none"
                                  onClick={() => deletetask(task._id)}
                                >
                                  Delete
                                </button>
                                {task.status !== 'completed' ? (
                                  <button
                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none"
                                    onClick={() => changetaskStatus(task._id)}
                                  >
                                    Mark as Completed
                                  </button>
                                ) : null}
                              </article>
                            </details>
                          </td> */}
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-2">{'data.title'}</h2>
        <p className="text-gray-600">{'data.description'}</p>
      </div> */}
    </div>
  );
}

export default CheckSingleEmployeeUpdate;
