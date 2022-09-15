const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const URL = require('./models/Urls');
const USER = require('./models/Users');

const Authenticate = require('./Authenticate.js');

router.post('/register', async (req, res) => {
  try{
    //Deconstructing request body
    const {firstName, lastName, email, password, cpassword } = req.body;
    console.log(req.body.firstName);
    //Checking if inputs are empty
    if(!firstName || !lastName || !email || !password || !cpassword)
    return res.status(422).json({errMsg:'All Fields required!!'});
  
    //Confirm password is same as password???
    if(password!=cpassword)
      return res.status(422).json({errMsg:'Password Not Matched!'});
  
    //Checking if email already Exists...
    let userExists = await USER.findOne({email});
    if(userExists)
      return res.status(400).json({errMsg:'Email Already Exists!'});
    
    //Hashing Password
    let hashed_pass = await bcrypt.hash(password,10);
  
    let user = new USER({firstName, lastName, email, password:hashed_pass});
    await user.save();
    console.log(`${user.email} registered Successfully `);
    return res.status(200).json({msg:'Registration Successful!!'});
  }catch(err){
    return res.status(500).json({errMsg:'Some Internal Server again Occurred!'});
  }
});

router.post('/login', async (req,res)=>{
  const {email, password} = req.body;
  console.log(email,password)
  if(!email || !password)
    return res.status(422).json({errMsg:'All Fields Required!'});
  
  let user= await USER.findOne({email})
  if(!user)
    return res.status(400).json({errMsg:'Invalid Credentials!'});
  
  if(await bcrypt.compare(password,user.password)){
    let token = await user.generateAuthToken();
    res.cookie('jwtoken',token
       /*,{
      expires:new Date(Date.now()+10000)
     // httpOnly:true
    }*/);
    console.log(`${user.email} logged in`);
    return res.status(200).send({token});
  }
  
  return res.status(400).json({errMsg:'Invalid Credentials!'});
});

router.get('/logout',(req, res)=>{
  res.clearCookie('jwtoken')
  res.status(200).send()
})

router.get('/auth', Authenticate, async (req, res)=>{
  if(!req.authorized)
    return res.status(200).json({authorized:false});
  return res.status(200).json({authorized:true});
  /*let user = await USER.findOne({_id:req._id});
  res.send();*/
});

router.post('/shrink', Authenticate, async (req, res)=>{
  try{
    let {longUrl} = req.body;
    if(longUrl=="")
      return res.status(422).json({errMsg:'Invalid URL!'});
    let shortUrl = longUrl;
    if(!req.authorized){
      let url = new URL({
        shortUrl,
        longUrl,
        dateOfCreation:new Date(Date.now()),
        dateOfExpiry:new Date(Date.now()+2592000000)
      });
    
      await url.save();
      return res.status(200).json({shortUrl:url.shortUrl});
    }else{
      let url = new URL({
        shortUrl,
        longUrl,
        dateOfCreation:new Date(Date.now()),
        dateOfExpiry:new Date(Date.now()+2592000000),
        userId:req._id
      });
      
      await url.save();
      console.log(url)
      USER.findByIdAndUpdate({_id:req._id},{
      "$push" : { "urls" : url._id }},(err,data)=>{
        if(err){
         console.log("error : ",err)
         return res.status(500).json(err)
        }
      })
      return res.status(200).json({shortUrl:url.shortUrl})
      /*
     USER.findByIdAndUpdate({_id:req._id},{
        "$push" : { "urls" : url._id }
      })*/
    }
  }catch(err){
    console.log("Server error /shrink : ",err)
    return res.status(500).json({errMsg:err})
  }
});

router.get('/data',Authenticate, async (req, res) => {
  if(!req.authorized)
    return res.status(401).send()
  let data = await USER.findById({_id:req._id}).populate('urls');
  let urls = [];
  for(let url of data.urls){
    let urlData = {
      'longUrl':url.longUrl,
      'shortUrl':url.shortUrl,
      'DOC':url.dateOfCreation,
      'DOE':url.dateOfExpiry,
      'clicks':url.clicks
    }
    urls.push(urlData)
  }
  let resData = {
    'noOfUrls':data.urls.length,
    'urls':urls
  }
//  console.log(resData)
  
  return res.status(200).json(resData)
});
router.post('/change', Authenticate, (req, res) => {
  console.log(req.body)
  URL.findOneAndUpdate({shortUrl:req.body.shortUrl},{longUrl:req.body.newUrl},(err,data)=>{
    if(err){
      return res.status(500).json({errMsg:'Some Interval Server Error Occurred. Try again Later!'})
    }
    res.status(200).json({msg:'LongUrl Updated!'})
  })
});

router.post('/url',async (req, res) => {
  let shortUrl = req.body.shortUrl
  console.log(req.body)
  let url = await URL.findOne({shortUrl})
  if(!url)
    return res.status(404).send({url})
  url.clicks++
  url.save()
  return res.status(200).json({longUrl:url.longUrl})
})
module.exports = router;