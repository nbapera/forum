const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./model/user')
const Post = require('./model/post')

const JWT_SECRET = "1NiIsInR5cFkZ2FkZ2FkZyIsImlhdCI6ImhmYWFJhbGciOiJIUzIVwGvfHuti3CvNk1z5YeCigtIJubhIn0.iybVj1lHp.eyJzdWIiOiJhc2RkZGFnZGZnICI6IkpXVCJ9FkZ2iwibmFtZSI6ImFkZ2E0Heytxw0"

mongoose.connect("mongodb://localhost:27017/forum", {
    useNewUrlParser: "true",
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {

    return res.json({
        app: 'forum',
        github: 'https://github.com/nbapera/forum',
    })
})

app.get('/getposts', async (req, res) => {

    const posts = await Post.find().lean()

    return res.json({ status: 'ok', posts: posts })
})

app.get('/userposts/:username', async (req, res) => {

    const { username } = req.params

    const posts = await Post.find({ name: username }).lean()
    const user = await User.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 'error' })
    }

    return res.json({ status: 'ok', date: user.created_at, posts: posts, })
})

app.post('/newpost', async (req, res) => {

    const { body, token } = req.body

    if (!body | !token) {
        return res.json({ status: 'error' })
    }

    const user = jwt.verify(token, JWT_SECRET)

    var date = new Date();
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    today = day + '/' + month + '/' + year;

    if (!user.username) {
        return res.json({ status: 'error' })
    }

    await Post.create({ body, name: user.username, created_at: today })

    return res.json({ status: 'ok' })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username | typeof username !== 'string') {
        return res.json({ status: 'error', error: 'invalid username.' })
    }

    if (!password | typeof password !== 'string') {
        return res.json({ status: 'error', error: 'invalid password.' })
    }

    const user = await User.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'invalid username.' })
    }

    if (password !== user.password) {
        return res.json({ status: 'error', error: 'invalid password.' })
    }

    const token = jwt.sign({ id: user._id, username: user.username, date: user.created_at }, JWT_SECRET)

    return res.json({ status: 'ok', token: token })

})

app.post('/register', async (req, res) => {
    const { username, password } = req.body


    if (!username | typeof username !== 'string') {
        return res.json({ status: 'error', error: "invalid username." })
    }

    if (!password | typeof password !== 'string') {
        return res.json({ status: 'error', error: "invalid password." })
    }

    if (password.length < 6) {
        return res.json({ status: 'error', error: "password is too short." })
    }

    if (username.length < 3) {
        return res.json({ status: 'error', error: "username is too short." })
    }

    if (username.length > 16) {
        return res.json({ status: 'error', error: "username is too long." })
    }

    var date = new Date();
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    today = day + '/' + month + '/' + year;

    try {
        const resp = await User.create({
            username,
            password,
            created_at: today
        })
    }
    catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'username in use.' })
        }
        throw error
    }

    return res.json({ status: 'ok' })

})

app.post('/confirm', (req, res) => {

    const { token } = req.body

    if (!token | typeof token !== 'string') {
        return res.json({ status: 'error', error: 'invalid token.' })
    }

    const user = jwt.verify(token, JWT_SECRET)

    return res.json({ status: 'ok', username: user.username })

})

app.listen(5000, () => console.log('started'))
