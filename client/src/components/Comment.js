const Comment = (props) => {
    return(
        <div className='comment-box' key={props.item.id}>
            <div className='cred-box'>
                <b className='comment-author'><a href={`https://www.reddit.com/user/${props.item.author}/`} target="_blank" rel="noopener noreferrer">{props.item.author}</a></b>
                <b className='comment-time'>{props.item.time}</b>
            </div>
            <p className='comment-body'>{props.item.body}</p>
        </div>
    )
}

export default Comment