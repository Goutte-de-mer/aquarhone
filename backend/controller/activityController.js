const Activity = require("../db/models/Activity");

exports.getActivities = async (req, res) => {
  try {
    const { limit } = req.query;

    const query = Activity.find();
    if (limit) {
      query.limit(parseInt(limit));
    }
    const activities = await query;
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
