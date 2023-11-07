import Button from "./Button"
import List from "./List"

const Leaderboard = () => {
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
      <Button />
    </section>
  )
}

export default Leaderboard