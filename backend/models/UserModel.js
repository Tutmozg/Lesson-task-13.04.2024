const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

const UserModel = mongoose.model('users', userShema)

module.exports = UserModel
