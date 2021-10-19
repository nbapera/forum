import './Postform.css'

import axios from 'axios'
import { useState } from 'react'

const Postform = () => {

    const [body, setBody] = useState("")

    const handleBody = e => {
        setBody(e.target.value)
    }

    const post = () => {
        const token = localStorage.getItem('token')

        if (!token | typeof token !== 'string')
        {
            return
        }

        axios.post('http://localhost:5000/newpost', {body, token})
        .then(function(response) {
            if (response.data.status === 'ok')
            {
                return window.location.href = '/'
            }
        })
    }

    return (
        <div className="postform">
            <textarea name="body" placeholder="Say anything to the world..." required onChange={handleBody} className="post-text"></textarea>
            <button type="submit" onClick={post} onSubmit={post} className="post-button">post.</button>
        </div>
    )
}

export default Postform
