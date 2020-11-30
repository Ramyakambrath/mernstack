const express=require('express')
const router=express.Router()
const auth=require('../../middleware/auth')

const Item=require('../../models/item');

//GET Request to /api/items
//get all items
//@access public

router.get('/',(req,res)=>{
 Item.find()
 .sort({date:-1})
 .then(items=>{
     res.json(items)
 })
})


router.post('/',(req,res)=>{
    const newItem=new Item({
        name:req.body.name
    })
    newItem.save().then(item=>res.json(item))
   })

   
router.delete('/:id',auth,(req,res)=>{
    Item.findById(req.params.id).then(item=>{
        item.remove().then(()=>res.json({success:true}))
    })
    .catch(err=>res.status(404).json({success:false}))
    })
   
 

module.exports = router