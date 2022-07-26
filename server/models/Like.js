const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const likeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: Schema.Types.Object,
        ref: 'Video'
    }

}, { timestamps: true })



const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }