const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },

    // --- NEW FIELDS START HERE ---
    goal: {
      type: String,
      default: null, // e.g., 'Data Science', 'Web Development'
    },
    skillLevel: {
      type: String,
      default: null, // e.g., 'Beginner', 'Intermediate'
    },
    learningStyle: {
      type: String,
      default: null, // e.g., 'Video', 'Reading', 'Projects'
    }
    // --- NEW FIELDS END HERE ---
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
