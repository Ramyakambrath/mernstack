const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DashboardItemSchema=new Schema({
    id:{
        type:String,
       
    },
    layout:{
        type:Object,    
    },
    name:{
        type:String,    
    },
    vizState:{
        type:Object,    
    },

})

module.exports=DashboardItem=mongoose.model('dashboardItem',DashboardItemSchema)