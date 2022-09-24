const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Doctor = require('../schemes/doctorScheme')
const Patient = require('../schemes/patientScheme')
const formData = require('form-data');
const Mailgun = require('mailgun.js');
var nanoid = require('nanoid')
const router = express.Router()

let verificationCodes = {}

router.post('/signup', async (req, res) => {
    const { name, email, password, type } = req.body
    console.log(req.body)
    if (!name || !email || !password || !type) {
        return res.status(400).send({ error: "Some fields missing" })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    if (type.toLowerCase() === "doctor") {
         let doctorExist = await Doctor.findOne({where:{email}})
         console.log(doctorExist)
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
        let patientExist = await Patient.findOne({where:{email}})
        if(!patientExist){
           try{
               let patient = await Patient.create({name,email,password:hash})
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
    let doctorExist = await Doctor.findOne({where:{email}})
    if(!doctorExist){
        let patientExist = await Patient.findOne({where:{email}})
        if(!patientExist){
            console.log("here")
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

router.post('/sendCode',async (req,res)=>{
    const { email } = req.body
    if (!email) {
        return res.status(400).send({ error: "No email provided" })
    }
    let verificationCode =  Number(new Array(6).fill(0).map(num=>Math.floor(Math.random()*10)).join(""))
      verificationCodes[email] = verificationCode
      setTimeout(()=>{
        //Fix this verificationCodes is Object not Array
       let index = verificationCodes.findIndex(code=>code.email===verificationCode)
       verificationCodes.splice(index,1)
      },5000*60)
      const mailgun = new Mailgun(formData);
      const client = mailgun.client({username: 'api', key: "c87b43971feac77e8614ab8409be7c1a-78651cec-f7874caf"});
      
      const messageData = {
        from: 'Consultation-APP-Support-Team <me@samples.mailgun.org>',
        to: `${email}`,
        subject: 'Your Passowrd Reset code',
        text: `Your verification code is ${verificationCode}`
      };
      client.messages.create("sandboxef1cbdf1a5b84ab9846a44d42f9bb719.mailgun.org", messageData)
       .then((res) => {
        console.log(verificationCode)
         return res.status(200).send(res)
       })
       .catch((err) => {
        return res.status(400).send(err)
       });
      
})
router.post('/reset-pass',async (req,res)=>{
    const {email,code,newPassword,type} = req.body
    if(!email,!code,!newPassword,!type){
        res.status(400).send({err:"Fields missing"})
    }
    console.log(verificationCodes)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)
    let user;
    if(type.toLowerCase()==="doctor"){
        user = await Doctor.findOne({where:{email}})
    }
    else{
        user = await Patient.findOne({where:{email}})
    }
    if(verificationCodes[email]===code){
        await user.update({password:hash})
        return res.status(200).send("Password Changes Sucssesfully")
    }
    else{
        return res.status(400).send("Incorrect Code")
    }

      
})
module.exports = router
