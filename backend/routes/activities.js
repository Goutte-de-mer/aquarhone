var express = require("express");
var router = express.Router();
const { getActivities } = require("../controller/activityController");

/* GET activities listing. */

router.get("/", getActivities);

module.exports = router;
