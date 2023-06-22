const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('../starter/db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 3000
// to set the env port run the command 'PORT=<anyPort like 6000> node app.js'

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
