const {Schema, model} = require('mongoose');

const chatSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    // users: [Object],
    image: {
        type: String,
        required: true,
    },
    // messages: [Object]
});

const Chat = model("Chat", chatSchema);
module.exports = {Chat};