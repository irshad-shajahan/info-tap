const lateComingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    month: {
      type: Number, // 1 to 12 representing January to December
    },
  });
  
  export const LateComingModel = mongoose.model("lateComing", lateComingSchema);
  