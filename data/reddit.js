require('dotenv').config()
const CommentStream = require('snoostorm').CommentStream
const snoowrap = require('snoowrap')
const CommentData = require('./dataStructure')

async function scrapeReddit() {
    const r = new snoowrap({
        userAgent: 'UserAgent',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    })
    r.config({ continueAfterRatelimitError: true })
    try{
        let sticky = await r.getSubreddit('wallstreetbets').getSticky({num: 1})
        let stickyID = sticky.id
        let stickyFlair = sticky.link_flair_text
        if(stickyFlair !== 'Daily Discussion'){
            sticky = await r.getSubreddit('wallstreetbets').getSticky({num: 2})
            stickyID = sticky.id
        }

        sticky.comments.forEach(comment => {
            sortByTerm(comment)
        })
        const comments = new CommentStream(r, {
            subreddit: 'wallstreetbets',
            limit: 5,
            pollTime: 8000,
    
        })
        comments.on('item', async (item) => {
            let newSticky = await r.getSubreddit('wallstreetbets').getSticky({num: 1})
            let newStickyID = newSticky.id
            let newStickyFlair = newSticky.link_flair_text
            if(newStickyFlair !== 'Daily Discussion'){
                newSticky = await r.getSubreddit('wallstreetbets').getSticky({num: 2})
                newStickyID = newSticky.id
            }
            if (stickyID !== newStickyID){
                resetData()
                stickyID = newStickyID
            }

            if(item.link_id === `t3_${stickyID}`)
                sortByTerm(item)
        })
    }
    catch (error){
        console.log(error)
    }

}

function sortByTerm(item) {
    try{
        console.log(item.id)
        if(!CommentData['IDMap'][item.id]){
            CommentData['IDMap'][item.id] = true
        }
        else{
            return
        }
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

        let content = item.body.toUpperCase()
        let included = false

        if(content.includes('AMC')) {
            CommentData['AMC'].unshift(newComment)
            included = true
        }
        if(content.includes('GME') || content.includes('GAMESTOP')) {
            CommentData['GME'].unshift(newComment)
            included = true
        }
        if(content.includes('NOK')){
            CommentData['NOK'].unshift(newComment)
            included = true
        }
        if(content.includes('BB') || content.includes('BLACKBERRY')) {
            CommentData['BB'].unshift(newComment)
            included = true
        }
        if(included === false) {
            CommentData['OTHER'].unshift(newComment)
        }
    }
    catch(error){
        console.log(error)
    }
}

// async function sortByAccountAge(item) {
//     try{
//         const timeCreated = await item.author.created_utc
//         const accountAge = Math.floor((Date.now() - (timeCreated * 1000)) / (1000*60*60*24))
//         const date = new Date(item.created_utc * 1000)
//         const hours = date.getHours()
//         const minutes = '0' + date.getMinutes()
//         const seconds = '0' + date.getSeconds()

//         const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

//         const newComment = {
//             'author': item.author.name,
//             'body': item.body,
//             'id': item.id,
//             'parent_id': item.parent_id,
//             'time': formattedTime,
//         }

//         if(accountAge < 100) { CommentData['100_days'].push(newComment) }
//         else if(accountAge < 500) { CommentData['500_days'].push(newComment) }
//         else if(accountAge < 1000) { CommentData['1000_days'].push(newComment) }
//         else if(accountAge < 2000) { CommentData['2000_days'].push(newComment) }
//         else if(accountAge < 5000) { CommentData['5000_days'].push(newComment) }
//         console.log(CommentData)

//     }
//     catch (error) {
//         console.log(error)
//     }
// }

// function resetData() {
//     CommentData['100_days'] = []
//     CommentData['500_days'] = []
//     CommentData['1000_days'] = []
//     CommentData['2000_days'] = []
//     CommentData['5000_days'] = []
// }

function resetData() {
    CommentData['IDMap'] = {}
    CommentData['AMC'] = []
    CommentData['GME'] = []
    CommentData['NOK'] = []
    CommentData['BB'] = []
    CommentData['OTHER'] = []
}

module.exports = scrapeReddit
