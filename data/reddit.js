require('dotenv').config()
const CommentStream = require('snoostorm').CommentStream
const snoowrap = require('snoowrap')
const CommentData = require('./dataStructure')

function scrapeReddit() {
    const r = new snoowrap({
        userAgent: 'UserAgent',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    })
    r.config({ continueAfterRatelimitError: true })
    try{
        const comments = new CommentStream(r, {
            subreddit: 'wallstreetbets',
            limit: 2,
            pollTime: 2000,
    
        })
        comments.on('item', item => {
            sortByAccountAge(item)
        })
    }
    catch (error){
        console.log(error)
    }

}

async function sortByAccountAge(item) {
    try{
        const timeCreated = await item.author.created_utc
        const accountAge = Math.floor((Date.now() - (timeCreated * 1000)) / (1000*60*60*24))
        const date = new Date(item.created_utc * 1000)
        const hours = date.getHours()
        const minutes = '0' + date.getMinutes()
        const seconds = '0' + date.getSeconds()

        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

        const newComment = {
            'author': item.author.name,
            'body': item.body,
            'id': item.id,
            'parent_id': item.parent_id,
            'time': formattedTime,
        }
        // if(item.link_id !== CommentData.thread_id){
        //     resetData(item.link_id)
        // }
        if(accountAge < 100) { CommentData['100_days'].push(newComment) }
        else if(accountAge < 500) { CommentData['500_days'].push(newComment) }
        else if(accountAge < 1000) { CommentData['1000_days'].push(newComment) }
        else if(accountAge < 2000) { CommentData['2000_days'].push(newComment) }
        else if(accountAge < 5000) { CommentData['5000_days'].push(newComment) }
        console.log(CommentData)

    }
    catch (error) {
        console.log(error)
    }
}

function resetData(id) {
    // CommentData['thread_id'] = id
    CommentData['100_days'] = []
    CommentData['500_days'] = []
    CommentData['1000_days'] = []
    CommentData['2000_days'] = []
    CommentData['5000_days'] = []
}

module.exports = scrapeReddit
