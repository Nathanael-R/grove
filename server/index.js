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
