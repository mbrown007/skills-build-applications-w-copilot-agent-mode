import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    joinedAt: { type: Date, required: true }
  },
  { timestamps: true }
);

const User = models.User || model('User', userSchema);

export default User;