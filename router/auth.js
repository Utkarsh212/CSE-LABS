const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Lab = require('../models/labs');
const Token = require('../models/token');
const sendEmail = require('../middleware/sendEmail'); 
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello World`);
});

router.post('/signup', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ message: 'Some of the field(s) are empty' });
    } else if (password !== cpassword) {
        return res.status(406).json({ message: 'Password and Confirm Password did not match' });
    }
    try {
        const registeredUser = await User.findOne({ email });
        if (registeredUser) {
            return res.status(409).json({ message: 'User already registered' });
        }
        const newUser = new User({ name, email, phone, password });
        await newUser.save();
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: 'Some of the field(s) are empty' });
    }
    try {
        const loginDetails = await User.findOne({ email });
        if (loginDetails) {
            const isMatch = await bcrypt.compare(password, loginDetails.password);
            if(isMatch) {
                const token = await loginDetails.generateAuthToken();
                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 2592000000),
                    httpOnly: true
                });
                return res.status(200).json({ message: 'User Signed In successfully' });
            } else {
                return res.status(401).json({ message: "Invalid Credentials" });
            }
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});


router.get('/signout', (req, res) => {
    try { 
        res.clearCookie('jwtoken');
        return res.status(200).json({message: 'Logged Out Successfully'})
    } catch (err) {
        return res.status(500).json({message: 'Error Occured While Signing Out'})
    }
})

router.post('/password-reset', async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(422).json({ message: 'Email field is empty' });
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: 'User with this email does not exist.'})
        }
        let token = await Token.findOne({userId: user._id});
        if(!token) {
            token = await new Token({
                userId: user._id,
                token: jwt.sign({userId: user._id}, process.env.SECRET_KEY)
            }).save();
        }
        let linkHtml = `<p><a href="${process.env.BASE_URL}/password-reset/${user._id}/${token.token}">Click Here</a> to reset your password</p>`
        await sendEmail(email, "Password reset", linkHtml);
        return res.status(200).json({message: 'Password reset link send to email'})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
});

router.post('/password-reset/:userId/:token', async (req, res) => {
    try {
        const { newPassword, cNewPassword } = req.body;
        if (!newPassword || !cNewPassword) {
            return res.status(422).json({ message: 'Some of the field(s) are empty' });
        } else if (newPassword !== cNewPassword) {
            return res.status(406).json({ message: 'Password and Confirm Password did not match' });
        }
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(403).json({message: "Invalid link or expired"});
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(403).json({message: "Invalid link or expired"});

        user.password = newPassword;
        await user.save();
        await token.delete();

        res.status(200).json({message: "password reset sucessfully."});
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
});

router.get('/userinfo', authenticate, (req, res) => {
    return res.status(200).json({userInfo: req.rootUser});
});

router.post('/labs', authenticate, async (req, res) => {
    if(req.rootUser.admin === false) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const { title, creator, link } = req.body;
        if (!title || !creator || !link) {
            return res.status(422).json({ message: 'Some of the field(s) are empty' });
        }
        const newLab = new Lab({title, creator, link});
        await newLab.save();
        return res.status(200).json({message: `Lab: ${title} Added Successfully`});
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
});

router.get('/labs', async (req, res) => {
    try {
        const labsData = await Lab.find();
        res.status(200).json({labs: labsData});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});


router.delete('/labs', authenticate, async (req, res) => {
    if(req.rootUser.admin === false) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const _id = req.body._id;
        const deleteLab = await Lab.findByIdAndDelete(_id);
        res.status(200).json({message: 'Lab Deleted Successfully'})
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;


