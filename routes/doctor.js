const express = require('express')
const Doctor = require('../schemes/doctorScheme')
const router = express.Router()

router.post("/update/:id",async (req,res)=>{
  const {qualifications,experience,hospital,location,slots,specialities,cost} = req.body
  let id = req.params.id
  console.log(qualifications,typeof(qualifications))
   let doctor = await Doctor.findOne({where:{id}})
   if(!doctor){
    return res.status(400).send({error:"No doctor found under this id"})
   }
   if(Object.keys(req.body).length===0){
    return res.status(400).send({error:"Kindly provide details you want to update"})
   }
    //Fix typo in qualifications//Qualifications will not update because of wrong spelling in database
    let updatedDoctor = await doctor.update({qualifications,experience,hospital,location,slots,specialities,cost})
   
    return res.status(200).send({data:updatedDoctor,response:"Account Updated Succesfully"})
})

router.get("/",async (req,res)=>{
  //Get doctors according to filter speciality
  //Serch by speciality
  let doctors = await Doctor.findAll({raw:true})
    return res.status(200).send(doctors)
    //Handle filtwering on frontend copy following logic
    let filteredList = doctors.filter(doctors=>req.body.qualifications.some(qualification=>doctors.qualifications.include(qualification)))
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