import mongoose from 'mongoose';

export interface IDepartment extends mongoose.Document {
  Name: string;
}

const DepartmentSChema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
});

const DepartmentModel = mongoose.model<IDepartment>(
  'Department',
  DepartmentSChema
);

export default DepartmentModel;
