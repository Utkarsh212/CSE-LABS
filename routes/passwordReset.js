const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const Token = require('../models/token')
const sendEmail = require('../utils/sendEmail')

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(422).json({ message: 'Email field is empty' })
        }
        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({message: 'User with this email does not exist.'})
        }
        let token = await Token.findOne({userId: user._id})
        if(!token) {
            token = await new Token({
                userId: user._id,
                token: jwt.sign({userId: user._id}, process.env.SECRET_KEY)
            }).save()
        }
        let linkHtml = `<p><a href="${process.env.BASE_URL}/password-reset/${user._id}/${token.token}">Click Here</a> to reset your password</p>`
        await sendEmail(email, "Password reset", linkHtml)
        return res.status(200).json({message: 'Password reset link send to email'})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
})

router.post('/:userId/:token', async (req, res) => {
    try {
        const { newPassword, cNewPassword } = req.body
        if (!newPassword || !cNewPassword) {
            return res.status(422).json({ message: 'Some of the field(s) are empty' })
        } else if (newPassword !== cNewPassword) {
            return res.status(406).json({ message: 'Password and Confirm Password did not match' })
        }
        const user = await User.findById(req.params.userId)
        if (!user) return res.status(403).json({message: "Invalid link or expired"})
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(403).json({message: "Invalid link or expired"})

        user.password = newPassword
        await user.save()
        await token.delete()

        res.status(200).json({message: "password reset sucessfully."})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
})

module.exports = router