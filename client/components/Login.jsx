import { useState } from "react"

const Login = () => {

    const [user, setUser] = useState("")
        return (
        <form className="bg-blue-400 flex h-56 w-full rounded-b-xl items-center justify-center">
        <input
          value={user}
          onChange={(event) => setUser(event.target.value)}
          className="h-10 w-72"
        />
        <button>Submit</button>
      </form>
  ) 
}

export default Login