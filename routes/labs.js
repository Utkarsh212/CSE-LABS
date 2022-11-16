const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const Lab = require('../models/labs')

router.post('/labs', authenticate, async (req, res) => {
    if(req.rootUser.admin === false) {
        return res.status(401).json({ message: 'Access Denied' })
    }
    try {
        const { title, creator, link, manualLink } = req.body
        if (!title || !creator || !link) {
            return res.status(422).json({ message: 'Some of the field(s) are empty' })
        }
        const newLab = new Lab({title, creator, link, manualLink})
        await newLab.save()
        return res.status(200).json({message: `Lab: ${title} Added Successfully`})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
})

router.get('/labs', async (req, res) => {
    try {
        const labsData = await Lab.find()
        res.status(200).json({labs: labsData})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


router.delete('/labs', authenticate, async (req, res) => {
    if(req.rootUser.admin === false) {
        return res.status(401).json({ message: 'Access Denied' })
    }
    try {
        const _id = req.body._id
        const deleteLab = await Lab.findByIdAndDelete(_id)
        res.status(200).json({message: 'Lab Deleted Successfully'})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
});

module.exports = router