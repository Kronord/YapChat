const {Schema, model} = require("mongoose");

const messageSchema = new Schema({
    sender: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    users: Array
})

const Message = model("Message", messageSchema);
module.exports = {Message};