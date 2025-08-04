import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Please add a task'],
    trim: true,
    maxlength: [40, 'Task cannot be more than 40 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
