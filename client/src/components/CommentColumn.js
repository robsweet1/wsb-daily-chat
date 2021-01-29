import Comment from './Comment'

const CommentColumn = (props) => {

    const renderComments = () => {
        return props.comments.map(item => {
            return <Comment item={item}/>
        })
    }

    return (
        <div className='comment-column'>
            <h2>{props.title}</h2>
            <div className='col'>
                {renderComments()}
            </div>
        </div>

    )
}

export default CommentColumn