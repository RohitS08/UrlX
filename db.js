const mongoose = require('mongoose');

mongoose.connect(process.env.uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=>console.log("success")).catch((err)=>console.log(err));