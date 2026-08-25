import mongoose from 'mongoose';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    await User.insertMany([
      {
        username: 'alex-rivera',
        fullName: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        role: 'athlete',
        joinedAt: new Date('2026-01-08')
      },
      {
        username: 'jordan-lee',
        fullName: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        role: 'team captain',
        joinedAt: new Date('2026-02-14')
      },
      {
        username: 'maya-patel',
        fullName: 'Maya Patel',
        email: 'maya.patel@example.com',
        role: 'athlete',
        joinedAt: new Date('2026-03-02')
      }
    ]);

    await Team.insertMany([
      {
        name: 'OctoDashers',
        mascot: 'Rocket Runner',
        city: 'Seattle',
        memberUsernames: ['alex-rivera', 'maya-patel']
      },
      {
        name: 'GitFit Crew',
        mascot: 'Branch Sprinter',
        city: 'Austin',
        memberUsernames: ['jordan-lee']
      }
    ]);

    await Activity.insertMany([
      {
        username: 'alex-rivera',
        type: 'trail run',
        durationMinutes: 42,
        caloriesBurned: 420,
        activityDate: new Date('2026-08-18')
      },
      {
        username: 'jordan-lee',
        type: 'cycling intervals',
        durationMinutes: 55,
        caloriesBurned: 610,
        activityDate: new Date('2026-08-19')
      },
      {
        username: 'maya-patel',
        type: 'strength circuit',
        durationMinutes: 38,
        caloriesBurned: 330,
        activityDate: new Date('2026-08-20')
      }
    ]);

    await LeaderboardEntry.insertMany([
      {
        rank: 1,
        username: 'jordan-lee',
        teamName: 'GitFit Crew',
        points: 1840,
        weeklyStreak: 6
      },
      {
        rank: 2,
        username: 'alex-rivera',
        teamName: 'OctoDashers',
        points: 1715,
        weeklyStreak: 5
      },
      {
        rank: 3,
        username: 'maya-patel',
        teamName: 'OctoDashers',
        points: 1620,
        weeklyStreak: 4
      }
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Flow',
        focusArea: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['cat-cow', 'worlds greatest stretch', 'hip airplanes', 'ankle rocks']
      },
      {
        title: 'Power Builder Circuit',
        focusArea: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['goblet squats', 'push-ups', 'single-arm rows', 'plank shoulder taps']
      },
      {
        title: 'Endurance Tempo Session',
        focusArea: 'cardio',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['warm-up jog', 'tempo run', 'hill strides', 'cooldown walk']
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
