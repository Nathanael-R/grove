import { useQuery } from "@tanstack/react-query"
import Button from "./Button"
import List from "./List"

const Leaderboard = () => {
  const url = "http://localhost:3500/api"
  const {data, error, isError} = useQuery({
    queryKey: ['groups'],
    queryFn: () => fetch(url).then(res => res.json()),
  })

  if(isError) {
    console.log("Error fetching data:", error.message)
  }
  console.log(data)
  return (
    <section>
      <div className="bg-blue-400 h-56 w-full rounded-b-xl">
        <div className="">
          <p>First place</p>
        </div>
        <div className="">
          <p>Second place</p>
        </div>
        <div className="">
          <p>Third place</p>
        </div>
      </div>
      <List />
      {data !== undefined && <Button data={data}/>}
    </section>
  )
}

export default Leaderboard