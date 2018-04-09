 //Documentation
/*

  Documentation on the fs module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/fs.html
  
  Documentation on Buffers can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/buffer.html
  
  Documentation on the path module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/path.html
  
  To learn more about callbacks, check out:  
  (https://github.com/maxogden/art-of-node#callbacks).  
  

*/

 //2nd assgn:babystep
 /*
 
 console.log(process.argv);
 
  The first element of the process.argv array  
  is always 'node', and the second element is always the path to your  
  program.js file, so you need to start at the 3rd element (index 2), adding  
  each item to the total until you reach the end of the array. 
 */
 
 let args=process.argv,sum=0;
 for(let i=2;i<args.length;i++)
    sum +=+args[i];  // OR Number(args[i]); OR parseInt(args[i]);
 console.log(sum);
 
 //system solution
    var result = 0
    
    for (var i = 2; i < process.argv.length; i++) {
      result += Number(process.argv[i])
    }
    
    console.log(result)





//3rd assgn:MY FIRST I/O!

/*
  To perform a filesystem operation you are going to need the fs module from  
  the Node core library. To load this kind of module, or any other "global"  
  module, use the following incantation:  
   
     var fs = require('fs')  
   
  Now you have the full fs module available in a variable named fs.

  All synchronous (or blocking) filesystem methods in the fs module end with  
  'Sync'. To read a file, you'll need to use  
  fs.readFileSync('/path/to/file'). This method will return a Buffer object  
  containing the complete contents of the file.    
   
  Buffer objects are Node's way of efficiently representing arbitrary arrays  
  of data, whether it be ascii, binary or some other format. Buffer objects  
  can be converted to strings by simply calling the toString() method on  
  them. e.g. var str = buf.toString().    
   
  If you're looking for an easy way to count the number of newlines in a  
  string, recall that a JavaScript String can be .split() into an array of  
  substrings and that '\n' can be used as a delimiter. Note that the test  
  file does not have a newline character ('\n') at the end of the last line,  
  so using this method you'll end up with an array that has one more element  
  than the number of newlines.
*/
const fs = require('fs')

const contents = fs.readFileSync(process.argv[2], 'utf8')
const lines = contents.toString().split('\n').length - 1
console.log(lines)





//4th assgn:MY FIRST ASYNC I/O!
/*
  The solution to this problem is almost the same as the previous problem  
  except you must now do it the Node.js way: asynchronous.  
   
  Instead of fs.readFileSync() you will want to use fs.readFile() and  
  instead of using the return value of this method you need to collect the  
  value from a callback function that you pass in as the second argument. To  
  learn more about callbacks, check out:  
  (https://github.com/maxogden/art-of-node#callbacks).  
   
  Remember that idiomatic Node.js callbacks normally have the signature:  
   
     function callback (err, data) {...}  
   
  so you can check if an error occurred by checking whether the first  
  argument is truthy. If there is no error, you should have your Buffer  
  object as the second argument. As with readFileSync(), you can supply  
  'utf8' as the second argument and put the callback as the third argument  
  and you will get a String instead of a Buffer.
*/
const fs = require('fs')
const file = process.argv[2]

fs.readFile(file, function (err, contents) {
  if (err) {
    return console.log(err)
  }
  // fs.readFile(file, 'utf8', callback) can also be used
  const lines = contents.toString().split('\n').length - 1
  console.log(lines)
})




//5th assgn:FILTERED LS 
/*
  The fs.readdir() method takes a pathname as its first argument and a  
  callback as its second. The callback signature is:  
   
     function callback (err, list) {... }  
   
  where list is an array of filename strings.    
   
  You may also find node's path module helpful, particularly the extname  
  method.    

*/

const fs = require('fs')
const path = require('path')

const folder = process.argv[2]
const ext = '.' + process.argv[3]

fs.readdir(folder, function (err, files) {
  if (err) return console.error(err)
  files.forEach(function (file) {
    if (path.extname(file) === ext) {
      console.log(file)
    }
  })
})



//6th assgn:MAKE IT MODULAR
/*


*/
