import { Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    username: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true }
  },
  { timestamps: true }
);

const Activity = models.Activity || model('Activity', activitySchema);

export default Activity;