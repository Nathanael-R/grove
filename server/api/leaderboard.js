const express = require("express")
const router = express.Router()
//const leaderboardController = require("../middleware/leaderboardController")
const getData = require("../middleware/leaderboardController")

router
.route("/")
.get(getData)


module.exports = router