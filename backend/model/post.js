const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        body: { type: String, required: true },
        name: { type: String, required: true },
        created_at: { type: String, required: true }
    },
    { collection: 'posts' }
)

const model = mongoose.model('PostSchema', PostSchema)

module.exports = model