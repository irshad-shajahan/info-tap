import { attendanceModel } from "../models/attendanceModel.js";
import { userModel } from "../models/userModel.js";

//The ischecked in used to dynamically decide whether to show the checkin button or not
//The last checkedin date is used to dynamically show the checkin button the next day
// the checked-in time is stored in the user collection to calculate the working hours of the employeee

//funciton to checkin the employee
export const checkIn = async (req, res) => {
  const { checkInTime, userId } = req.body;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log("today", today);
    console.log("body", req.body);
    const user = await userModel.findById(userId);
    const existingDocument = await attendanceModel.findOne({ date: today });
    user.isCheckedIn = true;
    user.lastCheckInTime = checkInTime;
    user.lastCheckedInDate = today;
    if (existingDocument) {
      const isUserAlreadyCheckedIn = existingDocument.Attendees.some(
        (attendee) => attendee.userId === userId
      );
      if (isUserAlreadyCheckedIn) {
        // Handle the case where the user is already checked in
        return res
          .status(200)
          .send({ msg: "The user had already checkedIN", success: false });
      } else {
        // User is not checked in, so add the new check-in entry
        existingDocument.Attendees.push({
          userName: user.name,
          userId,
          checkInTime,
        });
      }
      await existingDocument.save();
    } else {
      // Document for today doesn't exist, create a new one
      const newDocument = new attendanceModel({
        date: today,
        Attendees: [
          {
            userName:user.name,
            userId,
            checkInTime,
          },
        ],
      });
      await newDocument.save();
    }
    await user.save();
    res.status(200).send({ msg: "check-in succesfull", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "error at employee checkin", success: false });
  }
};
