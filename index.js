const express = require('express')
const cors    = require('cors')
const scrapeReddit  = require('./data/reddit.js')
const routes = require('./Routes/routes')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use('/api', routes)
app.listen(port, () => {
    console.log(`Server running on ${port}`)
    scrapeReddit()
})