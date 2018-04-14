//Documentation
/*
  <https://npmjs.com/bl> <https://npmjs.com/concat-stream>
  
  Documentation for both of these modules has been installed along with  
  learnyounode on your system and you can read them by pointing your browser here:  
   
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/docs/bl.html  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/docs/concat-stream.html
  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_modules/bl  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_modules/concat-stream
  
  Documentation on the net module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/net.html
*/

//8th assgn: HTTP COLLECT
/*
Write a program that performs an HTTP GET request to a URL provided to you  
  as the first command-line argument. Collect all data from the server (not  
  just the first "data" event) and then write two lines to the console  
  (stdout).  
   
  The first line you write should just be an integer representing the number  
  of characters received from the server. The second line should contain the  
  complete String of characters sent by the server.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  There are two approaches you can take to this problem:  
   
  1) Collect data across multiple "data" events and append the results  
  together prior to printing the output. Use the "end" event to determine  
  when the stream is finished and you can write the output.  
   
  2) Use a third-party package to abstract the difficulties involved in  
  collecting an entire stream of data. Two different packages provide a  
  useful API for solving this problem (there are likely more!): bl (Buffer  
  List) and concat-stream; take your pick!  
   
  <https://npmjs.com/bl> <https://npmjs.com/concat-stream>  
   
  To install a Node package, use the Node Package Manager npm. Simply type:  
   
     $ npm install bl  
   
  And it will download and install the latest version of the package into a  
  subdirectory named node_modules. Any package in this subdirectory under  
  your main program file can be loaded with the require syntax without being  
  prefixed by './':  
   
     var bl = require('bl')  
   
  Node will first look in the core modules and then in the node_modules  
  directory where the package is located.  
   
  If you don't have an Internet connection, simply make a node_modules  
  directory and copy the entire directory for the package you want to use  
  from inside the learnyounode installation directory:  
   
    
   
  Both bl and concat-stream can have a stream piped in to them and they will  
  collect the data for you. Once the stream has ended, a callback will be  
  fired with the data:  
   
     response.pipe(bl(function (err, data) { ...  }))  
     // or  
     response.pipe(concatStream(function (data) {  ...  }))  
   
  Note that you will probably need to data.toString() to convert from a  
  Buffer.    

*/
const http = require('http')
const bl = require('bl')

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err) {
      return console.error(err)
    }
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})

//9th assgn: Juggling Async
/*

  This problem is the same as the previous problem (HTTP COLLECT) in that  
  you need to use http.get(). However, this time you will be provided with  
  three URLs as the first three command-line arguments.  
   
  You must collect the complete content provided to you by each of the URLs  
  and print it to the console (stdout). You don't need to print out the  
  length, just the data as a String; one line per URL. The catch is that you  
  must print them out in the same order as the URLs are provided to you as  
  command-line arguments.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  Don't expect these three servers to play nicely! They are not going to  
  give you complete responses in the order you hope, so you can't naively  
  just print the output as you get it because they will be out of order.  
   
  You will need to queue the results and keep track of how many of the URLs  
  have returned their entire contents. Only once you have them all, you can  
  print the data to the console.  
   
  Counting callbacks is one of the fundamental ways of managing async in  
  Node. Rather than doing it yourself, you may find it more convenient to  
  rely on a third-party library such as [async](https://npmjs.com/async) or  
  [after](https://npmjs.com/after). But for this exercise, try and do it  
  without any external helper library.

*/

const http = require('http')
const bl = require('bl')
const results = []
let count = 0

function printResults () {
  for (let i = 0; i < 3; i++) {
    console.log(results[i])
  }
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err)
      }

      results[index] = data.toString()
      count++

      if (count === 3) {
        printResults()
      }
    }))
  })
}

for (let i = 0; i < 3; i++) {
  httpGet(i)
}


//10th assgn:TIME SERVER
/*
  Write a TCP time server!  
   
  Your server should listen to TCP connections on the port provided by the  
  first argument to your program. For each connection you must write the  
  current date & 24 hour time in the format:  
   
     "YYYY-MM-DD hh:mm"  
   
  followed by a newline character. Month, day, hour and minute must be  
  zero-filled to 2 integers. For example:  
   
     "2013-07-06 17:42"  
   
  After sending the string, close the connection.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  For this exercise we'll be creating a raw TCP server. There's no HTTP  
  involved here so we need to use the net module from Node core which has  
  all the basic networking functions.  
   
  The net module has a method named net.createServer() that takes a  
  function. The function that you need to pass to net.createServer() is a  
  connection listener that is called more than once. Every connection  
  received by your server triggers another call to the listener. The  
  listener function has the signature:  
   
     function listener(socket) {  ...  }  
   
  net.createServer() also returns an instance of your server. You must call  
  server.listen(portNumber) to start listening on a particular port.  
   
  A typical Node TCP server looks like this:  
   
     var net = require('net')  
     var server = net.createServer(function (socket) {  
       // socket handling logic  
     })  
     server.listen(8000)  
   
  Remember to use the port number supplied to you as the first command-line  
  argument.  
   
  The socket object contains a lot of meta-data regarding the connection,  
  but it is also a Node duplex Stream, in that it can be both read from, and  
  written to. For this exercise we only need to write data and then close  
  the socket.  
   
  Use socket.write(data) to write data to the socket and socket.end() to  
  close the socket. Alternatively, the .end() method also takes a data  
  object so you can simplify to just: socket.end(data).  
   
    
   
  To create the date, you'll need to create a custom format from a new  
  Date() object. The methods that will be useful are:  
   
     date.getFullYear()  
     date.getMonth()     // starts at 0  
     date.getDate()      // returns the day of month  
     date.getHours()  
     date.getMinutes()  
   
  Or, if you want to be adventurous, use the strftime package from npm. The  
  strftime(fmt, date) function takes date formats just like the unix date  
  command. You can read more about strftime at:  
  (https://github.com/samsonjs/strftime)

*/

const net = require('net')

function zeroFill (i) {
  return (i < 10 ? '0' : '') + i
}

function now () {
  const d = new Date()
  return d.getFullYear() + '-' +
    zeroFill(d.getMonth() + 1) + '-' +
    zeroFill(d.getDate()) + ' ' +
    zeroFill(d.getHours()) + ':' +
    zeroFill(d.getMinutes())
}

const server = net.createServer(function (socket) {
  socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))
