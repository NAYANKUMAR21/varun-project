import React, { useEffect, useState } from 'react';
import { AxiosAPI } from '../../AxiosApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// import TableComp from '../loader/TableComp';
export function formatDate(date: Date): string {
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`; // Format as MM/d/yyyy
}
function ViewTask2() {
  const [mainData, setMainData] = useState({
    search: [],
    data: [],
  });
  const [date, Setdate] = useState<Date>(new Date());

  const getTasks = async () => {
    try {
      const response = await AxiosAPI.get('/admin/get-task-updates');

      // console.log(response.data.data);
      // console.log(response.data.data, 'response');
      let x = response.data.data.map((ele: any) => {
        return {
          ...ele,
          createdAt: new Date(ele.createdAt).getMilliseconds(),
        };
      });

      const SortedData = x.reverse();

      console.log(SortedData, 'Sorted');

      setMainData({
        ...mainData,
        // search: response.data.data,
        // data: response.data.data,
        search: SortedData,
        data: SortedData,
      });
      console.log(response.data.data, 'response');
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };
  const HandleSearchId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copy = [...mainData.search];
    const x = copy.filter((item: any) => {
      console.log(typeof item, item);
      return (
        item.employeeInfo.employeeId.includes(e.target.value) ||
        item.employeeInfo.department
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );
    });
    if (e.target.value == '') {
      return setMainData({ ...mainData, data: copy });
    }
    return setMainData({ ...mainData, data: x });
  };

  const handleSetDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    Setdate(new Date(e.target.value));
    console.log(e.target.value);
    const copy = [...mainData.search];
    const filteredDate = copy.filter((item: any) => {
      return item.DateAdded == e.target.value;
    });

    if (e.target.value == '') {
      return setMainData({ ...mainData, data: copy });
    }
    return setMainData({ ...mainData, data: filteredDate });
  };
  const handleREsetSort = () => {
    setMainData({
      ...mainData,
      data: mainData.search,
    });
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="bg-gray-50 border border-gray-300 shadow-lg rounded-lg">
      <div className="bg-gray-50 pt-6 pb-4">
        <h1 className="text-2xl text-left mb-4 text-blue-600 font-semibold pl-5">
          Task Completion Summary
        </h1>
      </div>

      <div className="bg-gray-50 h-auto w-full p-5">
        <div className="flex space-x-4 mb-6">
          {/* Search by ID and Department */}
          <input
            id="input"
            type="text"
            placeholder="Search by ID or Department..."
            onChange={HandleSearchId}
            className="border border-gray-300 rounded-md p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          {/* Search by Date */}
          <input
            id="input"
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={handleSetDate}
            className="border border-gray-300 rounded-md p-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <button
            className="bg-blue-500 rounded-lg text-white px-5"
            onClick={handleREsetSort}
          >
            Reset
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-100 text-blue-600 text-xs uppercase font-semibold">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Sl. No
                </th>
                <th scope="col" className="px-4 py-3">
                  Employee ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Employee Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Department
                </th>
                <th scope="col" className="px-4 py-3">
                  Completed
                </th>
                <th scope="col" className="px-4 py-3">
                  Partial
                </th>
                <th scope="col" className="px-4 py-3">
                  Incomplete
                </th>
                <th scope="col" className="px-4 py-3">
                  Total Tasks
                </th>
                <th scope="col" className="px-4 py-3">
                  Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {mainData.data &&
                mainData.data.map((item: any, index: number) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/single-employee-update/${item.employeeInfo._id}`}
                        className="text-red-500 hover:underline"
                      >
                        {item.employeeInfo.employeeId}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{item.employeeInfo.name}</td>
                    <td className="px-4 py-2">
                      {item.employeeInfo.department}
                    </td>
                    <td className="px-4 py-2">
                      {item.employeeInfo.TaskCompleted.completed}
                    </td>
                    <td className="px-4 py-2">
                      {item.employeeInfo.TaskCompleted.partial}
                    </td>
                    <td className="px-4 py-2">
                      {item.employeeInfo.TaskCompleted.incomplete}
                    </td>
                    <td className="px-4 py-2">
                      {item.employeeInfo.TaskCompleted.total}
                    </td>
                    <td className="px-4 py-2">
                      {`${item.DateAdded.split('-')[1]}-${
                        item.DateAdded.split('-')[2]
                      }-${item.DateAdded.split('-')[0]}`}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/dashboard/single-employee-update/${item.employeeInfo._id}/${item.employeeInfo.employeeId}`}
                      >
                        <button className="text-blue-500 hover:underline">
                          ➡️
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewTask2;
