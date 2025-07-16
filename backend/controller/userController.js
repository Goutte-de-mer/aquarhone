const User = require("../db/models/User");
const Activity = require("../db/models/Activity");
const mongoose = require("mongoose");

exports.registerUserToActivity = async (req, res) => {
  const { activityId } = req.params;
  const userId = req.user.id;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const activity = await Activity.findById(activityId);
    if (!activity)
      return res.status(404).json({ message: "Activité introuvable" });

    if (activity.remainingSeats <= 0)
      return res.status(400).json({ message: "Plus de places disponibles" });

    const user = await User.findById(userId).session(session);

    const isAlreadyRegistered = user.activities.includes(activityId);
    if (isAlreadyRegistered)
      return res
        .status(400)
        .json({ message: "Vous êtes déjà inscrit à cette activité" });

    user.activities.push(activityId);
    await user.save({ session });

    activity.remainingSeats -= 1;
    await activity.save({ session });

    await session.commitTransaction();
    return res.status(200).json({ message: "Inscription réussie" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};
