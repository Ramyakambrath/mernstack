const express= require('express');
const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const config=require('config');


const path=require('path')

const app=express();

app.use(express.json());

const db=config.get('mongoURI')

mongoose.connect(db,{ useCreateIndex:true,useNewUrlParser: true })
.then(()=>
  console.log('Mongodb got connected'))
  .catch(err=>console.log(err))

  app.use('/api/items',require('./routes/api/items'));
  app.use('/api/users',require('./routes/api/users'));
  app.use('/api/auth',require('./routes/api/auth'));
  app.use('/api/dashboardItems',require('./routes/api/dashboardItems'));

  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
          res.sendFile(path.resolve(__dirname,'client','build','index.html'))

    })

  }

  //serve static assets if in prod


  const port=process.env.PORT || 5000;

  app.listen(port,()=>console.log(`Server started on port ${port}`))


 