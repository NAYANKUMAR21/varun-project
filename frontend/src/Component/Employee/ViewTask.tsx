import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { AxiosAPI } from '../../AxiosApi';

import Navbar from '../Navbar/Navbar';
import Loader from '../loader/Loader';
interface Task {
  category: string;
  createdAt: string; // ISO date string
  deadline: string; // ISO date string or a date format
  department: string;
  description: string;
  solutions: Array<any>; // Replace 'any' with a more specific type if known
  status: string;
  task: string;
  __v: number;
  _id: string; // MongoDB ObjectId as a string
}
const ViewTask: React.FC = () => {
  const [greeting, setGreeting] = useState('');

  const [loader, setLoader] = useState(true);
  const employee = localStorage.getItem('employee');

  const employeeData = employee ? JSON.parse(employee) : null;

  console.log('ep data', employeeData);
  const [dateAnCOmment, SetDateAnCOmment] = useState<{
    date: Date;
    comment: string;
  }>({
    date: new Date(),
    comment: '',
  });

  const [data, setData] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      setLoader(true);
      const response = await AxiosAPI.get(`/employee/task/${employeeData._id}`);
      setData(response.data.data);
      setLoader(false);
      console.log(response.data.data, 'response');
    } catch (error) {
      setLoader(false);
      toast.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    getTasks();
    const date = new Date();
    const currentHour = date.getUTCHours() - 5; // Convert to US Eastern Time (UTC-5)

    if (currentHour >= 0 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  // reply for the task

  const handleUpdateAllAtOnce = async () => {
    const empId = employeeData.employeeId;

    console.log(empId);
    try {
      setLoader(true);
      await AxiosAPI.post(`/employee/update-all-at-once/${empId}`, {
        data,
        comment: dateAnCOmment.comment,
        date: new Date(dateAnCOmment.date).toISOString().split('T')[0],
      });
      toast.success('Task updated successfully');
      getTasks();
    } catch (error) {
      setLoader(false);
      toast.error('Failed to update task');
      console.log(error);
    }
  };
  const handleSetStatus = (id: string, status: string) => {
    const result = data.map((ele: Task) => {
      console.log(ele);
      if (ele._id === id) {
        ele.status = status;
      }
      return ele;
    });
    console.log(result);
    setData(result);
  };

  // const handleReply = async (id: string) => {
  //   console.log(tasks);
  //   try {
  //     await AxiosAPI.post(`/employee/reply/${employeeData._id}/${id}`, {
  //       solution: tasks,
  //       Date: date,
  //       Status: status,
  //     });
  //     toast.success('Task replied successfully');
  //     getTasks();
  //   } catch (error) {
  //     toast.error('Failed to reply task');
  //   }
  // };

  return (
    <div className="">
      <div className="">
        <Navbar
          profileData={{
            Eid: employeeData.employeeId,
            imageUrl: employeeData?.imageUrl || employeeData.profile,
          }}
        />
      </div>

      <div className="p-8 ">
        <section className="container mx-auto p-6 font-mono mt-16">
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <h1 className="text-black text-2xl font-serif mb-5">
                {greeting} {employeeData.name}...
              </h1>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Status</th>
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
                        (data[index - 1] as { category: string }).category ===
                          categoryName
                      ) {
                        showCategory = false;
                      }

                      return (
                        <React.Fragment key={task._id}>
                          {showCategory && (
                            <tr className="text-black px-4 py-4 border">
                              <td
                                colSpan={3}
                                className="bg-red-500 font-bold text-lg p-2"
                              >
                                {categoryName}
                              </td>
                            </tr>
                          )}
                          <tr className="text-gray-700">
                            <td className="px-4 py-3 border w-3/6">
                              <div className="flex items-center text-sm">
                                <div>
                                  <p className="font-semibold text-black">
                                    {task.task}
                                  </p>
                                  {/* <p className="text-xs text-gray-600">Developer</p> */}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 border w-2/6">
                              <select
                                name="status"
                                id=""
                                // value={task.status}
                                className="w-full h-8 border"
                                // value={task.status}
                                onChange={(e: any) =>
                                  handleSetStatus(task._id, e.target.value)
                                }
                              >
                                <option value="None">None</option>
                                <option value="Partial">Partial</option>
                                <option value="Completed">Complete</option>
                                <option value="Incomplete">Incomplete</option>
                                {/* <option value="Pending">Pending</option> */}
                              </select>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
              <div className="flex p-2 w-90 border border-black  justify-space-around items-center px-5">
                {/* <input
                  type="date"
                  value={
                    dateAnCOmment.date instanceof Date
                      ? dateAnCOmment.date.toISOString().split('T')[0]
                      : dateAnCOmment.date
                  }
                  name="date"
                  // onChange={(e) =>
                  //   SetDateAnCOmment({
                  //     ...dateAnCOmment,
                  //     date: new Date(e.target.value),
                  //   })
                  // }
                /> */}
                <div>
                  {/* {dateAnCOmment.date instanceof Date
                    ? dateAnCOmment.date.toISOString().split('T')[0]
                    : dateAnCOmment.date} */}

                  {dateAnCOmment.date
                    .toISOString()
                    .split('T')[0]
                    .split('-')[2] +
                    '-' +
                    dateAnCOmment.date
                      .toISOString()
                      .split('T')[0]
                      .split('-')[1] +
                    '-' +
                    dateAnCOmment.date
                      .toISOString()
                      .split('T')[0]
                      .split('-')[0]}
                </div>
                <textarea
                  name=""
                  id=""
                  className=" p-2 m-1 h-20"
                  placeholder="Comment..."
                  onChange={(e) =>
                    SetDateAnCOmment({
                      ...dateAnCOmment,
                      comment: e.target.value,
                    })
                  }
                ></textarea>
                <button
                  className="p-2 m-1 bg-gray-700 text-white h8 rounded"
                  onClick={handleUpdateAllAtOnce}
                >
                  {loader ? <Loader /> : 'Update'}
                  {/* Update{' '} */}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewTask;
