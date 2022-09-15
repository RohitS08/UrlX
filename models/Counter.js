const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true
  },
  seq:{
    type:Number,
    default:0
  }
});

const Counter = mongoose.model('counter',CounterSchema);

const getNextSequence = (seqName) => {
  return new Promise((resolve, reject) => {
    Counter.findByIdAndUpdate({_id:seqName},
      {'$inc':{'seq':1}},
      (error, counter) => {
        if(error)
          return reject(error)
        if(counter)
          return resolve(counter.seq+1)
        else
          return resolve(null)
      }
    )
  })
}

const insertCounter = async (seqName) => {
  let newSeq = new Counter({_id:seqName,seq:1});
  let isCreated = await newSeq.save();
  if(isCreated){
    return newSeq.seq;
  }else{
    throw new Error("Could not Create Counter Collection!!")
  }
}

module.exports = {
  Counter,
  getNextSequence,
  insertCounter
}