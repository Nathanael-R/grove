import { useEffect, useState } from "react";
import Item from "./Item";
import axios from "axios";

const List = () => {
  const [data, setData] = useState([]);

  const url = "http://localhost:3500/leaderboard";

  const fetchLeaderBoard = () => {
    axios.get(url)
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching leaderboard:", error));
  };

  useEffect(() => {
    fetchLeaderBoard();

    // Fetch the leaderboard every 10 seconds
    const intervalId = setInterval(fetchLeaderBoard, 20000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Only run the effect once on component mount

  function scoreSort (a, b) {
    return b.score-a.score
  }
  return (
    <div className="p-4">
      <p className="text-center text-xl font-semibold mb-4">Leaderboard</p>
      {
        data.slice(0, 5).sort(scoreSort).map((player, idx) => {
          return (
            <Item key={idx} score={player?.score} name={player?.name}/>
          )
        })
      }
    </div>
  );
};

export default List;
