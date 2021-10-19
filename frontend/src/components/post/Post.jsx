import './Post.css'
import { useHistory } from 'react-router-dom'

const Post = (props) => {

    const history = useHistory()

    return (
        <div className="post">
            <div className="post-section">
                <div className="name" onClick={() => history.push(`/user/${props.name}`)}>{props.name}</div>
                <div className="date">{props.date}</div>
            </div>
            <div className="text">{props.text}</div>
        </div>
    )
}

export default Post
