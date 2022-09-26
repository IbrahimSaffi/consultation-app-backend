const express = require('express')
const Doctor = require('../schemes/doctorScheme')
const router = express.Router()

router.post("/update/:id",async (req,res)=>{
  const {qualifications,experience,hospital,location,availableSlots,specialities,cost} = req.body
  let id = req.params.id
   let doctor = await Doctor.findOne({where:{id}})
   if(!doctor){
    return res.status(400).send({error:"No doctor found under this id"})
   }
   if(Object.keys(req.body).length===0){
    return res.status(400).send({error:"Kindly provide details you want to update"})
   }
   console.log({qualifications,experience:Number(experience),hospital,location,availableSlots,specialities,cost:Number(cost)})
    let updatedDoctor = await doctor.update({qualifications,experience:Number(experience),hospital,location,availableSlots,specialities,cost:Number(cost)})
    return res.status(200).send({data:updatedDoctor,response:"Account Updated Succesfully"})
})

router.get("/",async (req,res)=>{
  let doctors = await Doctor.findAll({raw:true})
    return res.status(200).send(doctors)
})
router.get("/:id",async (req,res)=>{
  let id = req.params.id
  let doctor = await Doctor.findOne({where:{id}})
  if(!doctor){
    return res.status(400).send({error:"No doctor found under this id"})
   }
   return res.status(200).send(doctor)
 })


module.exports = router