import './Header.css'

import { FaAngleDown, FaDoorOpen, FaGithub, FaHome, FaUser } from 'react-icons/fa'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

const Header = () => {

    const history = useHistory()

    const [options, setOptions] = useState(false)
    const [username, setUsername] = useState("")
    const [auth, setAuth] = useState(false)

    const logout = () => {
        localStorage.removeItem('token')
        return window.location.href = '/'
    }

    const Options = () => {

        return (
            <div className="backdrop" onClick={() => setOptions(false)}>
                <motion.div
                    className="options"
                    onClick={e => e.stopPropagation()}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                >
                    <div className="option" onClick={() => history.push(`/user/${username}`)}><FaUser />  my profile.</div>
                    <div className="option" onClick={logout}><FaDoorOpen />  logout.</div>
                </motion.div>
            </div>
        )
    }

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (!token) {
            return
        }
        axios.post('http://localhost:5000/confirm', { token })
            .then(function (response) {
                if (response.data.status === 'ok') {
                    setUsername(response.data.username)
                    return setAuth(true)
                }
            })
    }, [])

    return (
        <header>
            <div>
                <a className="icon" href="/"><FaHome /></a>
                <a className="icon" href="https://github.com/nbapera" target="_blank" rel="noreferrer"><FaGithub /></a>
            </div>
            <div>
                {auth ?
                    <div
                        className="header-username"
                        onClick={() => setOptions(!options)}
                    >
                        {username} <FaAngleDown />
                    </div>

                    :
                    <button onClick={() => history.push('/login')} className="header-button">login.</button>}
                {options ? <Options /> : null}
            </div>
        </header>
    )
}

export default Header
