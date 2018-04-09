 
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
