const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Doctor = require('../schemes/doctorScheme')
const Patient = require('../schemes/patientScheme')
// const User = require('../schemes/doctorScheme')
// const doctorModel = require('../schemes/doctorScheme')
// const patientModel = require('../schemes/patientScheme')
const router = express.Router()

router.post('/signup', async (req, res) => {
    const { name, email, password, type } = req.body
    console.log(req.body)
    if (!name || !email || !password || !type) {
        return res.status(400).send({ error: "Some fields missing" })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    if (type === "doctor") {
         let doctorExist = await Doctor.findOne({where:{email}})
         if(!doctorExist){
            try{
                let doctor = await Doctor.create({name,email,password:hash})
                return res.status(200).send({data:doctor,response:"Account Created Succesfully"})
            }
            catch(error){
                return res.status(400).send({error})
            }
         }
         else{
            return res.status(400).send({error:"Account Already Exists"})
         }

    }
    else if (type === "patient") {
        let patientExist = await Doctor.findOne({where:{email}})
        if(!patientExist){
           try{
               let patient = await Doctor.create({name,email,password:hash})
               return res.status(200).send({data:patient,response:"Account Created Succesfully"})
           }
           catch(error){
               return res.status(400).send({error})
           }
        }
        else{
           return res.status(400).send({error:"Account Already Exists"})
        }
    }

})
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ error: "Some fields missing" })
    }
    let user ;
    let doctorExist = await Doctor.findOne({email})
    if(!doctorExist){
        let patientExist = await Patient.findOne({email})
        if(!patientExist){
            return res.status(400).send({error:"No Such account Exists"})
        }
        user = patientExist
    }
    else{
        user  = doctorExist
    }
    const verifyUser = await bcrypt.compare(password, user.password)
    if (!verifyUser) {
        return res.status(400).send({ error: "Incorrect password" })
    }
    let payload = { id: user.id, email, password }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
    return res.status(200).send({ refreshToken, accessToken, profile: user })
})


router.post('/token', async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        return res.status(400).send({ error: "No refresh token Provided" })
    }
    try {
        let payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        delete payload.exp
        delete payload.iat
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
        return res.status(200).send({ accessToken })
    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Invalid refresh token" })
    }
})
module.exports = router
