const customAPIError = require('../errors/customerror')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const {username, password} = req.body
    
    if (!username || !password) {
        throw new customAPIError('Invalid login parameters!', 400)
    }

    const id = new Date().getDate()
    const token = jwt.sign({id, username},process.env.JWT_SECRET)

    res.status(200).json({msg : `Welcome ${username}`, token})
}

const dashboard = async (req, res) => {
    const authHeaders = req.headers.authorization

    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new customAPIError('You do not have the access token for this resource!', 401)
    }

    const token = authHeaders.split(' ')[1]

    

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
    } catch (error) {
        throw new customAPIError('Unrecognized token!', 401)
    }

    console.log(req.headers)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg : `Welcome`, secret : `Your secret code is ${luckyNumber}`})

}

module.exports = {
    login,
    dashboard
}