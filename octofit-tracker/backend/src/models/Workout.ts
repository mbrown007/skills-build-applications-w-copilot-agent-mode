import { Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }]
  },
  { timestamps: true }
);

const Workout = models.Workout || model('Workout', workoutSchema);

export default Workout;