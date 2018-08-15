'use strict';

let express = require('express');
let mongo = require('mongodb');
let mongoose = require('mongoose');
const bodyParser = require("body-parser");
const validUrl = require('valid-url');
//const urlExists = require('url-exists');


let cors = require('cors');

let app = express();

// Basic Configuration 
let port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

let Schema = mongoose.Schema;
let urlShortenSchema = new Schema({
    original_url: {
        type: String,
        required: true
      },
    short_url: {
        type:Number,
        required: true
      }
  });

let UrlShorten = mongoose.model('UrlShorten',urlShortenSchema);

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// shorturl API endpoint... 
app.post("/api/shorturl/new", function (req, res) {
  let url=req.body.url;
  UrlShorten.findOne({original_url:url}).select({_id:0,original_url:1,short_url:1}).exec(function(err,data){
    if(!data){
      
      // urlExists("https://stackoverflow.com", function(err, exists) {
        console.log(url,"  ",validUrl.isUri(url)); 
        if(validUrl.isUri(url)){
          UrlShorten.where({}).countDocuments(function(err, count) {
            if (err){
              console.log(err);
              res.status(404).send();
            }

            let urlShorten = new UrlShorten({original_url:url,short_url:count+1});
            urlShorten.save(function(err,shortUrlData){
              res.json({original_url:shortUrlData.original_url,short_url:shortUrlData.short_url});
            });
          });
        }else{
          res.json({"error":"invalid URL"});
        }
      // });
    }else{
      res.send(data);
    }
  });
});

// shorturl API endpoint... 
app.get("/api/shorturl/:short", function (req, res) {
  let shortUrl=parseInt(req.params.short);
  console.log(shortUrl);
  UrlShorten.findOne({short_url:shortUrl},function(err,data){
    console.log(data);
    if(data){
      res.redirect(data.original_url);
    }else{
      res.json({error:"invalid short url"});
    }
  });
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});