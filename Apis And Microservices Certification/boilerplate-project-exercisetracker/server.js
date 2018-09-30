const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI || 'mongodb://exercise:exercise123@ds219532.mlab.com:19532/fcc' )


app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


let User = require("./models/user");

app.post('/api/exercise/new-user',(req,res) => {
  User.findOne({userName:req.body.username},(err,exist) => {
    if(exist === null){
      let user = new User();
      user.userName = req.body.username;
      user.save((err,data) => {
        if(err){
          console.log(err);
        }
        res.send(data);
      });
    }else{
      res.send({"msg":"Username already exist"});
    }
  });
});

let Exercise = require("./models/exercise");
app.post('/api/exercise/add', (req, res) => {
  User.findOne({_id:req.body.userId},(err,exist) => {
    if(exist !== undefined){
      let exercise = new Exercise();
      exercise.userId = req.body.userId;
      exercise.description = req.body.description;
      exercise.duration = req.body.duration;
      exercise.date = req.body.date;
      exercise.save((err,data) => {
        if(err){
          console.log(err);
        }
        res.send(data);
      });
    }else{
      res.send({"msg":"UserId doesn't exist"});
    }
  });
});

app.get('/api/exercise/log', (req, res) => {
  
  if(req.query.userId){
    let userId = req.query.userId;
    let from = req.query.from?new Date(req.query.from):new Date("1994-04-07");
    let to = req.query.to?new Date(req.query.to):new Date();
    let limit = req.query.limit?parseInt(req.query.limit):16;
    User.findOne({_id:userId},{__v:0},(err,exist) => {
      if(exist !== undefined){
        Exercise.find({userId,date:{ '$gte' : from , '$lte' : to }},{_id:0,__v:0,userId:0}).limit(limit).exec((err, log) => {
          let count = log.length;
          res.send({_id:exist._id,username:exist.userName,count,log});
        });
      }else{
        res.send({"msg":"UserId doesn't exist"});
      }
    });
  }
  
});

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware

app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
