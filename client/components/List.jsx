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
    const intervalId = setInterval(fetchLeaderBoard, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Only run the effect once on component mount

  return (
    <div className="p-4">
      <Item score={data.length > 0 ? data[data.length - 1] : 0} />
    </div>
  );
};

export default List;
