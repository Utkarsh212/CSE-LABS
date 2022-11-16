const mongoose = require('mongoose')
const validator = require('validator')

const labsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: [2, 'Title must contain minimum 2 characters'],
        maxLength: [100, 'Title must contain maximum 50 characters']
    },
    creator: {
        type: String,
        required: true,
        minLength: [2, 'Name must contain minimum 2 characters'],
        maxLength: [30, 'Name must contain maximum 30 characters']
    },
    link: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL")
            }
        }
    },
    manualLink: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL")
            }
        }
    }
});

const Lab = mongoose.model("LAB", labsSchema)

module.exports = Lab