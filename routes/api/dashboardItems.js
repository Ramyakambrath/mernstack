const express=require('express')
const router=express.Router()
const auth=require('../../middleware/auth')

const DashboardItem=require('../../models/dashboardItem');

//GET Request to /api/items
//get all items
//@access public

router.get('/',(req,res)=>{
    DashboardItem.find({}, {'_id': 0})
 .sort({date:-1})
 .then(items=>{
     res.json(items)
 })
})


router.post('/',(req,res)=>{
    
    const newItem=new DashboardItem({
        id:req.body.id,
        layout:req.body.layout,
        name:req.body.name,
        vizState:req.body.vizState
    })
    newItem.save().then(item=>res.json(item))
   })


 

module.exports = router