const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
const path = require('path')

connectToMongo();

const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

// For deployment
app.use(express.static(path.join(__dirname, "/client/build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook-backend listening on port - ${port}`)
})
