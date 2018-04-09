 
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
   
  Documentation on the fs module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyou  
  node/node_apidoc/fs.html  
   
  Buffer objects are Node's way of efficiently representing arbitrary arrays  
  of data, whether it be ascii, binary or some other format. Buffer objects  
  can be converted to strings by simply calling the toString() method on  
  them. e.g. var str = buf.toString().  
   
  Documentation on Buffers can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyou  
  node/node_apidoc/buffer.html  
   
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


