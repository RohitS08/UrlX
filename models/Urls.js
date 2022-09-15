const mongoose = require('mongoose');
const base62 = require("base62");
const sequencing = require('./Counter');

const UrlsSchema = new mongoose.Schema({
  srNo:{
    type:Number,
    required:true,
    default:0,
    unique:true
  },
  shortUrl:{
    type:String,
    required:true
  },
  longUrl:{
    type:String,
    required:true
  },
  dateOfCreation:{
    type:Date,
    default:Date.now
  },
  dateOfExpiry:{
    type:Date,
    default: new Date(Date.now()+ 600000)
  },
  clicks:{
    type:Number,
    default:0
  },
  userId:{
    type:String,
    required:false
  }
});
UrlsSchema.pre('save', function(next){
  const finish = id => {
    let shortUrl = base62.encode(id+1000);
    console.log(this.id, this.shortUrl)
    this.srNo = id;
    this.shortUrl = shortUrl;
    console.log(this.id, this.shortUrl)
    return next();
  };
  if(this.isNew){
    console.log('doc created')
  sequencing.getNextSequence('urlSrNo').
  then( _id => {
    if(_id){
      finish(_id)
    }else{
      sequencing.insertCounter('urlSrNo')
      .then( res => {
        finish(res)
      })
      .catch( err => {
        console.log("seq insertSeq error : ",err)
      })
    }
  })
  .catch( err => {
    console.log("seq nextSeq err : ",err)
  })
  }else{
    return next()
  }
 /* if(!this.isModified('shortUrl'))
    return next()
  */
});

const URL = mongoose.model('URL',UrlsSchema);

module.exports = URL;
