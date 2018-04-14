//Documentation
/*
  Documentation on the http module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/http.html
  
  Documentation on the url module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/url.html
  
*/

//11th assgn:HTTP File Server
/*

   Write an HTTP server that serves the same text file for each request it  
  receives.  
   
  Your server should listen on the port provided by the first argument to  
  your program.  
   
  You will be provided with the location of the file to serve as the second  
  command-line argument. You must use the fs.createReadStream() method to  
  stream the file contents to the response.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  Because we need to create an HTTP server for this exercise rather than a  
  generic TCP server, we should use the http module from Node core. Like the  
  net module, http also has a method named http.createServer() but this one  
  creates a server that can talk HTTP.  
   
  http.createServer() takes a callback that is called once for each  
  connection received by your server. The callback function has the  
  signature:  
   
     function callback (request, response) {  ...  }  
   
  Where the two arguments are objects representing the HTTP request and the  
  corresponding response for this request. request is used to fetch  
  properties, such as the header and query-string from the request while  
  response is for sending data to the client, both headers and body.  
   
  Both request and response are also Node streams! Which means that you can  
  use the streaming abstractions to send and receive data if they suit your  
  use-case.  
   
  http.createServer() also returns an instance of your server. You must call  
  server.listen(portNumber) to start listening on a particular port.  
   
  A typical Node HTTP server looks like this:  
   
     var http = require('http')  
     var server = http.createServer(function (req, res) {  
       // request handling logic...  
     })  
     server.listen(8000)  
   
    
   
  The fs core module also has some streaming APIs for files. You will need  
  to use the fs.createReadStream() method to create a stream representing  
  the file you are given as a command-line argument. The method returns a  
  stream object which you can use src.pipe(dst) to pipe the data from the  
  src stream to the dst stream. In this way you can connect a filesystem  
  stream with an HTTP response stream. 

*/

const http = require('http')
const fs = require('fs')

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]))


//12th assgn:HTTP Uppercaserer
/*

  Write an HTTP server that receives only POST requests and converts  
  incoming POST body characters to upper-case and returns it to the client.  
   
  Your server should listen on the port provided by the first argument to  
  your program.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  While you're not restricted to using the streaming capabilities of the  
  request and response objects, it will be much easier if you do.  
   
  There are a number of different packages in npm that you can use to  
  "transform" stream data as it's passing through. For this exercise the  
  through2-map package offers the simplest API.  
   
  through2-map allows you to create a transform stream using only a single  
  function that takes a chunk of data and returns a chunk of data. It's  
  designed to work much like Array#map() but for streams:  
   
     var map = require('through2-map')  
     inStream.pipe(map(function (chunk) {  
       return chunk.toString().split('').reverse().join('')  
     })).pipe(outStream)  
   
  In the above example, the incoming data from inStream is converted to a  
  String (if it isn't already), the characters are reversed and the result  
  is passed through to outStream. So we've made a chunk character reverser!  
  Remember though that the chunk size is determined up-stream and you have  
  little control over it for incoming data.  
   
  To install through2-map type:  
   
     $ npm install through2-map  
   
  If you don't have an Internet connection, simply make a node_modules  
  directory and copy the entire directory for the module you want to use  
  from inside the learnyounode installation directory:    

*/
const http = require('http')
const map = require('through2-map')

const server = http.createServer(function (req, res) {
  if (req.method !== 'POST') {
    return res.end('send me a POST\n')
  }

  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]))


//13th assgn:HTTP JSON API Server
/*

   Write an HTTP server that serves JSON data when it receives a GET request  
  to the path '/api/parsetime'. Expect the request to contain a query string  
  with a key 'iso' and an ISO-format time as the value.  
   
  For example:  
   
  /api/parsetime?iso=2013-08-10T12:10:15.474Z  
   
  The JSON response should contain only 'hour', 'minute' and 'second'  
  properties. For example:  
   
     {  
       "hour": 14,  
       "minute": 23,  
       "second": 15  
     }  
   
  Add second endpoint for the path '/api/unixtime' which accepts the same  
  query string but returns UNIX epoch time in milliseconds (the number of  
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.  
  For example:  
   
     { "unixtime": 1376136615474 }  
   
  Your server should listen on the port provided by the first argument to  
  your program.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  The request object from an HTTP server has a url property that you will  
  need to use to "route" your requests for the two endpoints.  
   
  You can parse the URL and query string using the Node core 'url' module.  
  url.parse(request.url, true) will parse content of request.url and provide  
  you with an object with helpful properties.  
   
  For example, on the command prompt, type:  
   
     $ node -pe "require('url').parse('/test?q=1', true)"  
     
   
  Your response should be in a JSON string format. Look at JSON.stringify()  
  for more information.  
   
  You should also be a good web citizen and set the Content-Type properly:  
   
     res.writeHead(200, { 'Content-Type': 'application/json' })  
   
  The JavaScript Date object can print dates in ISO format, e.g. new  
  Date().toISOString(). It can also parse this format if you pass the string  
  into the Date constructor. Date.getTime() will also come in handy. 

*/
const http = require('http')
const url = require('url')

function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime: time.getTime() }
}

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true)
  const time = new Date(parsedUrl.query.iso)
  let result

  if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))
