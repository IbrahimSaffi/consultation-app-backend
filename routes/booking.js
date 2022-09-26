const express = require('express')
const Booking = require('../schemes/bookingScheme')
const Doctor = require('../schemes/doctorScheme')
const router = express.Router()

router.post("/review/:id",async (req,res)=>{
    //Booking id(Not doctors id)
    let id = req.params.id
    let currRating = req.body.rating
    let {rating,feedback} = req.body
    let booking = await Booking.findOne({where:{id}})
    if(!booking){
      return res.status(400).send({error:"No Booking found under this id"})
     }
    if(!rating||!feedback){
      return res.status(400).send({error:"No Rating or Feedback Provided"})
    }
    let doctor = await Doctor.findOne({where:{id:booking.dataValues.doctor}})
    let overAllRatingYet = doctor.dataValues.ratings
    let newOverAllRating; 
    if(!overAllRatingYet){
        newOverAllRating = rating
    }
    else{
       newOverAllRating = (overAllRatingYet+currRating)/2

    }
    let updatedDoctor = await doctor.update({ratings:newOverAllRating})
    let updatedBooking = await booking.update({feedback,rating})
    return res.status(200).send(updatedBooking)
  })


  router.post("/book",async (req,res)=>{
    const {date,doctor,patient} = req.body
    if(!doctor||!patient){
      return res.status(400).send({error:"Fields missing"})
    }
    let booking = await Booking.create({date,doctor,patient})
    return res.status(200).send({data:booking,response:"Succesfully Booked"})
  })

  router.post("/prescribe/:id",async (req,res)=>{
    let id = req.params.id
    const {prescription,doctor_notes} = req.body
    if(!prescription||!doctor_notes){
      return res.status(400).send({error:"No Prescription or notes provided"})
    }
    let booking = await Booking.findOne({where:{id}})
    let updatedBooking = await booking.update({prescription,doctor_notes,status:"Completed"})
    return res.status(200).send({data:updatedBooking,response:"Succesfully Prescribed"})
  })

  router.get("/doctor/:id",async(req,res)=>{
    let id = req.params.id
    console.log(id)
    let doctor = await Doctor.findOne({where:{id}})
    if(!doctor){
        res.status(400).send({error:"No such doctor"})
    }
    let bookings =await Booking.findAll({where:{doctor:id}})
    res.status(200).send(bookings)
  })
  router.get("/patient/:id",async(req,res)=>{
    let id = req.params.id
    let doctor = await Doctor.findOne({where:{id}})
    if(!doctor){
        res.status(400).send({error:"No such patient"})
    }
    let bookings =await Booking.findAll({where:{patient:id}})
    res.status(200).send(bookings)
  })
  module.exports = router