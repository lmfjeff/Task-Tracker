const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET

function auth (req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) 
        return res.status(401).json({ msg: 'No token, authorization denied' })

    try {
        const decoded = jwt.verify(token, jwt_secret)
        req.profile = decoded
        next()
    } catch (e) {
        req.status(400).json({msg:'Token is not valid'})
    }

}

module.exports = auth