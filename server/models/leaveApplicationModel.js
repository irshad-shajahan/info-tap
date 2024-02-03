const leaveApplicationSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    reason: String,
    isApproved: {
      type: Boolean,
      default: false,
    },
    month: {
      type: Number, // 1 to 12 representing January to December
    },
  });
  
  export const LeaveApplicationModel = mongoose.model("leaveApplication", leaveApplicationSchema);
  