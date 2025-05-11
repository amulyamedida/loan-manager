import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  amount: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', ApplicationSchema);
