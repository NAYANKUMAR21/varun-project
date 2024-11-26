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
      // console.log(x);
      // const SortedData = x.sort((a: any, b: any) => {
      //   console.log('a', a.createdAt, b.createdAt);
      //   return a.createdAt - b.createdAt;
      // });
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
      return item.employeeInfo.employeeId.includes(e.target.value);
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
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="bg-gray-100 border border-black">
      <div className="bg-gray-100 pt-10">
        <h1 className="text-3xl  text-left mb-6 text-red-500 pl-5">
          Task Completion Summary...
        </h1>{' '}
        {/* Changed text-center to text-left */}
      </div>

      <div className="bg-gray-100 h-screen w-full mt-6">
        <div className=" w-1/4 flex bg-gray-100">
          <div className="flex flex-col space-y-4">
            <input
              id="input"
              type="text"
              placeholder="Search by Id..."
              onChange={HandleSearchId}
              className="ml-5 mr-5 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <input
              id="input"
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={handleSetDate}
              placeholder="Search by Date... "
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-center rtl:text-right  dark:text-black-400">
              <thead className="text-xs uppercase bg-red-500 dark:bg-red-500 dark:text-black">
                <tr className="text-black">
                  <th scope="col" className="px-6 py-3">
                    Sl.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Employee Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Employee Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Employee Dept
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Click
                  </th>
                </tr>
              </thead>
              <tbody>
                {mainData.data &&
                  mainData.data.map((item: any, index: number) => {
                    console.log('Here,', item);
                    return (
                      <tr
                        key={index}
                        className="border-b bg-white-300 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <Link
                            to={`/single-employee-update/${item.employeeInfo._id}`}
                          >
                            {index + 1}
                          </Link>
                        </th>

                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          <Link
                            to={`/single-employee-update/${item.employeeInfo._id}`}
                          >
                            {item.employeeInfo.employeeId}
                          </Link>
                        </th>
                        <td className="px-6 py-4 hover:cursor-pointer">
                          {item.employeeInfo.name}
                        </td>
                        <td className="px-6 py-4 hover:cursor-pointer">
                          {item.employeeInfo.department}
                        </td>
                        <td className="px-6 py-4 hover:cursor-pointer">
                          {item.DateAdded.split('-')[1]} -{' '}
                          {item.DateAdded.split('-')[2]} -{' '}
                          {item.DateAdded.split('-')[0]}
                        </td>

                        <td className="px-6 py-4">
                          <Link
                            to={`/dashboard/single-employee-update/${item.employeeInfo._id}/${item.employeeInfo.employeeId}`}
                          >
                            <button>➡️</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTask2;