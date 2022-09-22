const express = require('express')
const Patient = require('../schemes/patientScheme')
const router = express.Router()

router.post('/update/:id', async (req,res)=>{
    let id =req.params.id
    if(Object.keys(req.body).length===0){
        return res.status(400).send({error:"No Onboarding information provided"})
    }
   const {pastDiseases,bloodGroup,age,sex,weight} = req.body
   let patient = await Patient.findOne({where:{id}})
    let updatedPatient = await patient.update({pastDiseases,bloodGroup,age,sex,weight})
    return res.status(200).send({data:updatedPatient,response:"Succesfully updated"})
})
router.get("/:id",async (req,res)=>{
   let id = req.params.id
   let patient = await Patient.findOne({where:{id}})
   if(!patient){
    return res.status(400).send({error:"No such patient"})
   }
   return res.status(200).send(patient)
})
module.exports = router