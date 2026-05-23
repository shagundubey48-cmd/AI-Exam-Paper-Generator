import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema(
  {
    title: String,

    subject: String,

    totalQuestions: Number,

    totalMarks: Number,

    sections: Array,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  'Assignment',
  AssignmentSchema
);