const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name must contain minimum 2 characters'],
        maxLength: [30, 'Name must contain maximum 30 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isMobilePhone(value.toString(), 'en-IN')){
                const error = new Error("Invalid Phone Number")
                return error;
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Password Strength is not good")
            }
        }
    },
    token: {
        type: String,
        default: 'jwtoken'
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.COST))
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({email: this.email}, process.env.SECRET_KEY)
        this.token = token
        await this.save()
        return token;
    } catch (err) {
        console.log(err)
    }
}

const User = mongoose.model('USER', userSchema)

module.exports = User