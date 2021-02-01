const express = require('express')
const cors    = require('cors')
const scrapeReddit  = require('./data/reddit.js')
const routes = require('./routes/routes')
const path = require('path')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use('/api', routes)
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
app.listen(port, () => {
    console.log(`Server running on ${port}`)
    scrapeReddit()
})