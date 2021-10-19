import './Home.css'

import { useEffect, useState } from 'react'

import Post from '../../components/post/Post'
import Postform from '../../components/postform/Postform'
import axios from 'axios'

const Home = () => {


    const [posts, setPosts] = useState([])
    const [auth, setAuth] = useState(false)

    const post = () => {
        axios.get('http://localhost:5000/getposts')
            .then(function (response) {
                if (response.data.status === 'ok') {
                    setPosts(response.data.posts)
                }
            })
    }

    const authenticate = () => {
        const token = localStorage.getItem('token')

        if (!token) {
            return
        }
        axios.post('http://localhost:5000/confirm', { token })
            .then(function (response) {
                if (response.data.status === 'ok') {
                    return setAuth(true)
                }
            })
    }

    useEffect(() => {
        document.title = 'Forum - Home'
        post()
        authenticate()
    }, [])

    return (
        <div className="home">
            {auth ? <Postform /> : null}
            {posts.map(post => <Post name={post.name} text={post.body} date={post.created_at} />)}
        </div>
    )
}

export default Home
