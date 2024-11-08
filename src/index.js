const express = require('express')
const cors = require('cors')
const v1Router = require("./v1/routes/routes")
//require("dontenv").config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(express.json())
app.use("/api/v1/documents", v1Router)

app.listen(PORT, () => {
    console.log(`Server escuchando en el puerto: ${PORT}`)
})