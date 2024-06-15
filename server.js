const express = require('express')
const mongo = require('./database')
const app = express()

const port = process.env.PORT || 3000
app.use('/', require('./routes'))

mongo.initDb((err) => {
    if (err) {
        console.error(err)
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and node is running on port: ${port}`)
        })
    }
})
