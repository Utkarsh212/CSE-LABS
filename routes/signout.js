const express = require('express')
const router = express.Router()

router.get('/signout', (req, res) => {
    try { 
        res.clearCookie('jwtoken')
        return res.status(200).json({message: 'Logged Out Successfully'})
    } catch (err) {
        return res.status(500).json({message: 'Error Occured While Signing Out'})
    }
})

module.exports = router