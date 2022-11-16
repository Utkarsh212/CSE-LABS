const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users');

router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ message: 'Some of the field(s) are empty' });
    }

    try {
        const loginDetails = await User.findOne({ email })
        if (loginDetails) {
            const isMatch = await bcrypt.compare(password, loginDetails.password)
            if(isMatch) {
                const token = await loginDetails.generateAuthToken()
                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 2592000000)
                });
                return res.status(200).json({ message: 'User Signed In successfully' })
            } else {
                return res.status(401).json({ message: "Invalid Credentials" })
            }
        } else {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router