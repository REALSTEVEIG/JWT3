require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()
const errorHandler = require('./middleware/errorhandler')
const notFound = require('./middleware/notfound')
const mainRouter = require('./routes/main')

app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1', mainRouter)
app.use(errorHandler)
app.use(notFound)

const port = process.env.PORT || 4000

const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()