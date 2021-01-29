const express = require('express')
const CommentData = require('../data/dataStructure')
const router = express.Router()

router.get('/', async (req, res) => {
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
    res.flushHeaders(); // flush the headers to establish SSE with client
    
    let interval = setInterval(async () =>{
        const comments = CommentData
        let data = JSON.stringify(comments)
        res.write('event: message\n');
        res.write('data: ' + data)
        res.write('\n\n')
    }, 2000)

    res.on('close', () => {
        clearInterval(interval)
        res.end()
    })
})

module.exports = router
