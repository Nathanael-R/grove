const getLeaderboard = require('../model/boardData')

async function displayScores () {
    let data = await getLeaderboard()
    return data
}
const getData = async (req, res) => {
    let scores = await displayScores()
    res.json(scores)
}

module.exports = getData
