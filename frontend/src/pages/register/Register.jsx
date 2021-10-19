import './Register.css'

import axios from 'axios'
import { useState, useEffect } from 'react'

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = e => {
        setConfirmPassword(e.target.value)
    }

    const register = () => {
        if (password !== confirmPassword) {
            return setError("passwords don't match.")
        }

        axios.post('http://localhost:5000/register', { username, password })
            .then(function (response) {
                if (response.data.status === 'ok') {
                    return window.location.href = "/login"
                }
                return setError(response.data.error)
            })
    }

    useEffect(() => {
        document.title = 'Forum - Login'
    }, [])

    return (
        <div className="register">
            <h1 className="register-text">register.</h1>
            <div className="register-help">username</div>
            <input className="register-input username" onChange={handleUsername}></input>
            <div className="register-help">password</div>
            <input className="register-input password" type="password" onChange={handlePassword}></input>
            <div className="register-help">confrim password</div>
            <input className="register-input password" type="password" onChange={handleConfirmPassword}></input>
            <br></br>
            {error ? <div className="error">{error}</div> : null}
            <br></br>
            <button className="register-button" onClick={() => register()}>register.</button>
            <br></br>
            <a href="/login" className="redirect">already have an account? login.</a>
        </div>
    )
}

export default Register
