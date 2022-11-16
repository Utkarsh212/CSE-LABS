const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

router.get('/userinfo', authenticate, (req, res) => {
    return res.status(200).json({userInfo: req.rootUser})
})

module.exports = router