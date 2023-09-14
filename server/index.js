const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})