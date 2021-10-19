import './Login.css'

import axios from 'axios'
import { useState, useEffect } from 'react'

const Login = () => {

    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        axios.post('http://localhost:5000/login', { username, password })
            .then(function (response) {
                if (response.data.status === 'ok') {
                    setError("")
                    localStorage.setItem('token', response.data.token)
                    return window.location.href = '/'
                }

                return setError(response.data.error)
            })
    }

    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        document.title = 'Forum - Login'
    }, [])

    return (
        <div className="login">
            <h1 className="login-text">login.</h1>
            <div className="login-help">username</div>
            <input className="login-input username" onChange={handleUsername}></input>
            <div className="login-help">password</div>
            <input className="login-input password" type="password" onChange={handlePassword}></input>
            <br></br>
            {error ? <div className="error">{error}</div> : null}
            <br></br>
            <button className="login-button" onClick={() => login()}>login.</button>
            <br></br>
            <a href="/register" className="redirect">no account? register.</a>
        </div>
    )
}

export default Login
