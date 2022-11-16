const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.post('/signup', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ message: 'Some of the field(s) are empty' })
    } else if (password !== cpassword) {
        return res.status(406).json({ message: 'Password and Confirm Password did not match' })
    }

    try {
        const registeredUser = await User.findOne({ email })
        if (registeredUser) {
            return res.status(409).json({ message: 'User already registered' })
        }
        const newUser = new User({ name, email, phone, password })
        await newUser.save()
        return res.status(200).json({ message: 'User registered successfully' })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router