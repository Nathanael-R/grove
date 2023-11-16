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
const {client, dbName} = require("./db");
const getLeaderboard = require("./model/boardData");
let leaderboard = [];

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    //create user details
    const db = client.db(dbName);
    const col = db.collection("users");
    let user = leaderboard[0];
    if (user) {
      const p = await col.insertOne(user);
      console.log("this is ", p);
    } else {
      return null;
    }
    //insert a document into the field
    const filter = { name: "Rhayne" };
    const document = await col.findOne(filter);
    console.log("Document found:\n" + JSON.stringify(document));
  } catch (err) {
    console.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
io.on("connection", (socket) => {
  //remember to refactor this eventually since each window refreshes the score board
  socket.on("newScore", async (info) => {
    try {
        getLeaderboard()
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("MongoDB second connection successful!");
      //create user details
      const db = client.db(dbName);
      const col = db.collection("users");
      // let user = leaderboard[0]
      // if (user) {
      //     const p = await col.insertOne(user)
      //     console.log("this is ", p)
      // } else {
      //     return null
      // }
      if (info) {
        const userDetails = { name: info?.name };
        const find = await col.findOne(userDetails);
        if (find) {
        //    let array = await col.find().toArray()
        //    console.log(array)
          const update = await col.updateOne(userDetails, {
            $set: { score: info?.score },
          });
          console.log(update);
        } else {
          const upload = await col.insertOne(info);
          console.log("uploaded info", upload);
        }
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    //     const checkUser = leaderboard.find((user) => user.name === info.name);
    //   console.log(info)
    //   if (!checkUser) {
    //     leaderboard.push(info);
    //   } else {
    //     let index = leaderboard.indexOf(checkUser);
    //     leaderboard[index].score = info.score;
    //   }

    //io.emit("updatedScores", leaderboard);
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
