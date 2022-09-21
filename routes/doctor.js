const express = require('express')
const { update } = require('../schemes/doctorScheme')
const Doctor = require('../schemes/doctorScheme')
const router = express.Router()

router.post("/update/:id",async (req,res)=>{
  const {qualifications,experience,hospital,location,slots,speciality,cost} = req.body
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
    let updatedDoctor = await doctor.update({qualifications,experience,hospital,location,slots,speciality,cost})
   
    return res.status(200).send({data:updatedDoctor,response:"Account Created Succesfully"})
})

router.get("/",async (req,res)=>{
  //Get doctors according to filter
})
router.get("/:id",async (req,res)=>{
    //Get doctor  
 })

router.post("/review/:id",async (req,res)=>{
  // Review Doctor
})
router.post("/book/:id",async (req,res)=>{
   // To book slot
})
module.exports = router