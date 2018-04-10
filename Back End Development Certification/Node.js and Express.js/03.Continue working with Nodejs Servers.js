//Documentation
/*
  <https://npmjs.com/bl> <https://npmjs.com/concat-stream>
  
  Documentation for both of these modules has been installed along with  
  learnyounode on your system and you can read them by pointing your browser  
  here:  
   
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/docs/bl.html  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/docs/concat-stream.html
  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_modules/bl  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_modules/concat-stream
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
