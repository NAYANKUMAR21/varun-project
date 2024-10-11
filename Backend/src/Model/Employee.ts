import mongoose from 'mongoose';

export interface IEmployee extends mongoose.Document {
  name: string;
  email: string;
  employeeId: string;
  department: string;
}

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: [true, 'Employee ID already exists'],
  },

  department: {
    type: String,
    required: true,
  },
});

let Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;
