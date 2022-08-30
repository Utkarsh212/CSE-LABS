const jwt = require('jsonwebtoken');
const User = require('../models/users');

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({email: verifyToken.email, token: token});
        if(!rootUser) {
            throw new Error('User Not Found')
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (err) {
        res.status(401).json({message: "Access Denied"});
    }
}

module.exports = Authenticate;