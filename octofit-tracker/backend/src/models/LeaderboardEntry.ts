import { Schema, model, models } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    weeklyStreak: { type: Number, required: true }
  },
  { timestamps: true, collection: 'leaderboard' }
);

const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;