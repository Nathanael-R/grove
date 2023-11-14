const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 3500;
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://Rhayne:ZumWoMXBp4JrqOdk@grove.tqqxddf.mongodb.net/?retryWrites=true&w=majority`;

const dbName = "grove";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db(dbName);
    const col = db.collection("users");

    //create user details
    let userDocument = {
      name: "Wraith",
      score: 10,
    };

    //insert a document into the field
    const p = await col.insertOne(userDocument)
    const filter = { "name": "Wraith" };
    const document = await col.findOne(filter);
    console.log("Document found:\n" + JSON.stringify(document));
  } catch (err) {
    console.error(err)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let leaderboard = [];

io.on("connection", (socket) => {
  //remember to refactor this eventually since each window refreshes the score board
  socket.on("newScore", (info) => {
    const checkUser = leaderboard.find((user) => user.id === info.id);
    if (!checkUser) {
      leaderboard.push(info);
    } else {
      let index = leaderboard.indexOf(checkUser);
      leaderboard[index].score += info.score;
    }

    io.emit("updatedScores", leaderboard);
    console.log(leaderboard);
  });
});

app.use("/api", require("./api/data"));

app.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

//if you're using plain express you'll use app.listen but with socket-io it becomes http.listen else your socket client won't connect
http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
