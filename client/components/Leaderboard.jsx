import { useQuery } from "@tanstack/react-query";
import Button from "./Button";
import List from "./List";
import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [user, setUser] = useState("");
  const url = "http://localhost:3500/api";
  const { data, error, isError, refetch } = useQuery({
    queryKey: ["api"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  useEffect(() => {
    // Trigger data refetch whenever user changes
    refetch();
  }, [user, refetch]);

  const saveDetails = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("userName", JSON.stringify(user));
      // No need to refetch immediately; useEffect will handle it
    } catch (e) {
      console.log("Cannot save:", e);
    }
  };

  return (
    <section>
      <form className="bg-blue-400 flex h-56 w-full rounded-b-xl items-center justify-center">
        <input
          value={user}
          onChange={(event) => setUser(event.target.value)}
          className="h-10 w-72"
        />
        <button onClick={saveDetails}>Submit</button>
      </form>
      <List />
      {data !== undefined && <Button data={data} />}
    </section>
  );
};

export default Leaderboard;
