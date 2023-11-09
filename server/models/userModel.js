import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: String,
  defaultPassChanged: {
    type: Boolean,
    default: false,
  },
  address: String,
  contactNumber: String,
  emergencyContactNumber: String,
  igProfileLink: String,
  linkedInProfileLink: String,
  officialMail: String,
  role: String,
  lastCheckedInDate: {
    type: Date,
  },
  isCheckedIn:Boolean,
  lastCheckInTime: String,
  lastCheckOutTime: String,
  isWfh: Boolean,
  password: {
    type: String,
    default: "tapemp123",
  },
  age: Number,
  dob: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  isModerator: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', function (next) {
  // Check if lastCheckedInDate is not equal to today's date
  if (this.isModified('lastCheckedInDate')) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight to compare dates
    
    if (!this.lastCheckedInDate || this.lastCheckedInDate.toDateString() !== today.toDateString()) {
      this.isCheckedIn = false;
    }
  }
  
  next(); // Continue with the save operation
});

export const userModel = mongoose.model("users", userSchema);
