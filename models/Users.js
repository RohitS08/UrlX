const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UsersSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required: true
  },
  lastName:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  date:{
    type:Date,
    default:Date.now
  },
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ],
  urls: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'URL'
      /*type:String,
      default:[]*/
    }]
});

UsersSchema.methods.generateAuthToken = async function(){
  let token = await jwt.sign({_id:this._id},process.env.SecretKey);
  this.tokens = this.tokens.concat({token});
  await this.save();
  return token;
}

const USER = mongoose.model('user',UsersSchema);

module.exports = USER;
