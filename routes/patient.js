const express = require('express')
const router = express.Router()

router.post('/update/:id', async (req,res)=>{
    //  const {name,password,email,pastDiseases,bloodGroup,age,sex,weight} = req.body
    //consultation update/update personal information
    const {id} = req.body
    if(req.body.id){
        //For finding patient
    }
    for (const key in req.body){
        
    }
    
    
})
router.get("/:id",async (req,res)=>{
   //Get patient history
})
module.exports = router