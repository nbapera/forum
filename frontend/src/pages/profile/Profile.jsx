import './Profile.css'
import Post from '../../components/post/Post'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Profile = () => {

    const [posts, setPosts] = useState([])
    const [date, setDate] = useState("")
    const { username } = useParams()

    useEffect(() => {
        document.title = `Forum - ${username}`
        axios.get(`http://localhost:5000/userposts/${username}`)
            .then(function (response) {
                if (response.data.status === 'ok') {
                    setPosts(response.data.posts)
                    return setDate(response.data.date)
                }
            })
    }, [])

    return (
        <div className="profile">
            <div className="profile-user">
                <div className="profile-left">
                    <img className="profile-pic" src="https://avatars.githubusercontent.com/u/89864563?v=4" alt="user"></img>
                </div>
                <div className="profile-right">
                    <h1 className="profile-username">{username}</h1>
                    <h1 className="profile-date">joined {date}</h1>
                </div>
            </div>
            <div className="user-posts">
                <h1>User posts</h1>
                {posts.map(post => <Post name={post.name} text={post.body} date={post.created_at} />)}
            </div>
        </div>
    )
}

export default Profile
