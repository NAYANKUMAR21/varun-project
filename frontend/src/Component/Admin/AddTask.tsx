import React from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { AxiosAPI } from '../../AxiosApi';
import { Dept } from '../Home/Dept';
const AddTask: React.FC = () => {
  const [data, setData] = useState({
    task: '',
    description: '',
    deadline: '',
    status: '',
    department: '',
    category: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      department: selectedDepartment,
      category: selectedCategory,
    });
  };

  //

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await AxiosAPI.post('/admin/add-task', data);
      console.log(response);

      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [tasks, setTasks] = useState<Array<any> | null>([]);

  const handleCategoryChange = (e: any) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    const selectedDept = Dept.find(
      (dept) => dept.Category === selectedCategory
    );
    if (selectedDept && selectedDepartment === 'Quality') {
      setTasks(selectedDept.tasks);
    } else {
      setTasks([]);
    }
  };
  const [selectedDepartment, setSelectedDepartment] = useState('');

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-serif text-center mb-6">Add Task</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="department" className="w-full ">
            Department
          </label>
          <select
            id="department"
            name="department"
            onChange={(e: any) => setSelectedDepartment(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            <option value="">--select --</option>

            <option value="Quality">Quality</option>

            <option value="Shipping & Receiving">Shipping & Receiving</option>

            <option value="Warehouse">Warehouse</option>
          </select>

          <label htmlFor="category" className="w-full ">
            Category
          </label>
          {selectedDepartment !== 'Quality' ? (
            <input
              type="text"
              name="category"
              onChange={handleCategoryChange}
              placeholder="category"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <select
              name="category"
              id="category"
              onChange={handleCategoryChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>--select--</option>
              {/* <option value="Incoming Inspection">Incoming Inspection</option>
              <option value="Layout Table">Layout Table</option>
              <option value="Keyence Table">Keyence Table</option>
              <option value="CMM">CMM</option>
              <option value="Visual Inspection">Visual Inspection</option>
              <option value="General Area">General Area</option> */}
              {selectedDepartment === 'Quality' &&
                Dept.map((dept) => (
                  <option key={dept.Category} value={dept.Category}>
                    {dept.Category}
                  </option>
                ))}
            </select>
          )}

          <label htmlFor="task" className="w-full ">
            {' '}
            Task
          </label>

          {selectedDepartment !== 'Quality' ? (
            <input
              type="text"
              name="task"
              onChange={handleChange}
              placeholder="Task"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <select
              name="task"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--select task--</option>
              {tasks &&
                tasks.map((task: any) => (
                  <option key={task} value={task}>
                    {task}
                  </option>
                ))}
            </select>
          )}
          <textarea
            placeholder="Please Add Description it is mandatory...."
            name="description"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <input
            type="date"
            name="deadline"
            onChange={handleChange}
            placeholder="Deadline"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <select
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select> */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
