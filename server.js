const express = require("express");
const mongoose = require('mongoose')
const profileRoutes = require('./controllers/profile.controller')
const cors = require('cors')
const path = require('path')


const app = express();

// app.use(cors())
app.use(express.json())

// MongoDB connection string
require('dotenv').config()
const uri = process.env.ONLINE_MONGODB;


mongoose.set('useFindAndModify', false);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("DB connected.");
})



const PORT = process.env.PORT || 5000;

app.get('/ip', (req,res)=> {
    let ip = req.headers["x-forwarded-for"]
    let ipAddr = req.socket.remoteAddress
    res.send(`req.headers["x-forwarded-for"] is ${ip} \r\n req.socket.remoteAddress is ${ipAddr}`)
})

// app.use('/task', userRoutes)
app.use('/profile', profileRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});