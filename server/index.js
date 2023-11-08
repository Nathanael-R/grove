const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3500
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use("/api", require("./api/data"))





app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})