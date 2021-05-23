
var mongoose = require('mongoose');

/**
 * Echo Schema.
 * 
 * A sub schema for Howl Schema. A schema for a comment object.
 * 
 * @property id: okamid of the commenter.
 * @property name: name of the commenter.
 * @property text: the comment.
 * @property time: time posted.
 */
var EchoSchema = new mongoose.Schema({
    id: String,
    name: {
        first: {type: String, required: true},
        last: {type: String, trim: true, required: true},
    },
    text: String,
    time: Number,
})

/**
 * Howl Schema.
 * 
 * A schema for a timeline post object.
 * 
 * @property id: okamid of the poster.
 * @property name: name of the poster.
 * @property text: the content of the post.
 * @property time: time posted.
 * @property comments: array of Echos.
 */
var HowlSchema = new mongoose.Schema({
    id: String,
    name: {
        first: {type: String, required: true},
        last: {type: String, trim: true, required: true},
    },
    text: String,
    time: Number,
    comments: [EchoSchema] 
});

module.exports = mongoose.model('Howl', HowlSchema);
