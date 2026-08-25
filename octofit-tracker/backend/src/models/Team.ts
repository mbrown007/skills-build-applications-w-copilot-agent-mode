import { Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    memberUsernames: [{ type: String, required: true }]
  },
  { timestamps: true }
);

const Team = models.Team || model('Team', teamSchema);

export default Team;