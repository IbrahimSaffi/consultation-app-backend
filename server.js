//Getting packages
// const postgres = require("./postgres-config")
const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
require('dotenv').config()
const jwt = require("jsonwebtoken")
//Getting routes

//Inititalizing express
const app = express()


// console.log(sequelize)
const authRouter = require("./routes/auth")
const doctorRouter = require("./routes/doctor")
const patientRouter = require("./routes/patient")
// async function checkConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }

// }
// checkConnection()
//Middlewares
app.use(cors({ origin: "*" }))
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//Routes
//Routers usage
app.use('/auth', authRouter)
app.use(authenticate)
app.use('/patient', patientRouter)
app.use('/doctor', doctorRouter)



app.listen(process.env.PORT || 8000)

function authenticate(req, res, next) {
    const authHeaderInfo = req.headers['authorization']
    if (authHeaderInfo === undefined) {
        return res.status(401).send({ error: "No token provided" })
    }
    else {
        const token = authHeaderInfo.split(" ")[1]
        if (token === undefined) {
            return res.status(401).send({ error: "Proper token was not provide make sure its bearer token" })
        }
        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.payload = payload
            next()
        }
        catch (error) {
            return res.status(401).send({ error: error.message })
        }
    }
}
