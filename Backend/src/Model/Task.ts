import mongoose, { connect } from 'mongoose';

// Define the solution interface
export interface ISolution {
  employee: mongoose.Schema.Types.ObjectId | string;
  solution: string[];
  employeename: string;
  employeprofile: string;
  Date: Date;
  Status: string;
}

// Define the task interface
export interface ITask extends mongoose.Document {
  task: string;
  description: string;
  deadline: string;
  status: string;
  employee: mongoose.Schema.Types.ObjectId | string;
  solutions: mongoose.Schema.Types.ObjectId[] | string[];
  createdAt: Date;
  department: string;
  category: string;
}

// Define the task schema
const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: 'Completed',
  },
  solutions: [
    {
      createdAt: { type: Number, default: new Date() },
      comment: { type: String, default: '' },
      DateAdded: { type: String },
      employee: {
        // Array of solutions with embedded documents
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  department: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Create and export the Task model
const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
