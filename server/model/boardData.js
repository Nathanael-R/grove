
const {client, dbName} = require("./../db")

async function getLeaderboard () {
    await client.connect()
    const db = client.db(dbName);
    let collection = db.collection("users");
    let leaderboard = await collection.find().toArray()
    return leaderboard
}

module.exports = getLeaderboard