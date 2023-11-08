const express = require("express")
const router = express.Router()
const dataController = require("../middleware/dataControllers")

router
.route("/")
.get(dataController.getData)


module.exports = router