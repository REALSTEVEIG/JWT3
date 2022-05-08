const customAPIError = require('../errors/customerror')

const errorHandler = async (err, req, res, next) => {
    if (err instanceof customAPIError) {
        return res.status(err.statusCode).json({msg : err.message})
    }
    console.log(err)
    return res.status(500).send("Something went wrong in our server, please chech back later")
}

module.exports = errorHandler