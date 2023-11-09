import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  Attendees: [
    {
      userId: String,
      userName:String,
      checkInTime: String,
      checkOutTime: {
        type:String,
        default:''
      },
    },
  ],
});

export const attendanceModel = mongoose.model("attendance", attendanceSchema);
