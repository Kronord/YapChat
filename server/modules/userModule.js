const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {Schema, model} = mongoose;

const usersSchema = new Schema({
    name: {
        type: String,
        required: ['Name is required', true],
    },
    surname: {
        type: String,
        required: ['Surname is required', true],
    },
    phone: {
        type: String,
        required: ['Phone is required', true],
    },
    email: {
        type: String,
        required: ['Email is required', true],
        unique: true,
    },
    password: {
        type: String,
        required: ['Password is required', true],
    },
    // verifycationToken: {
    //     type: String,
    //     required: ['Verifycation Token is required', true]
    // },
    verify: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: null,
    },
    friends: {
        type: Array,
        default: [],
    }
});

usersSchema.pre("save", async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = model("User", usersSchema);
module.exports = {User};