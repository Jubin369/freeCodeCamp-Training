//my solution
function destroyer(arr) {
  var args = Array.prototype.slice.call(arguments, 1); //  ||  var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
  
  return arr.filter(function(val) {
    for(i=0;i<args.length;i++)
      if(args[i]==val)
        return;
      
  return val;
});
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);


//Basic Code Solution:
function destroyer(arr) {
  var args = Array.prototype.slice.call(arguments);

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < args.length; j++) {
      if (arr[i] === args[j]) {
        delete arr[i];                //If the value at the current index is equal in both arrays, use delete to remove it from arr.
      }
    }
  }
  return arr.filter(Boolean);
}



//Intermediate Code Solution:
function destroyer(arr) {
  var args = Array.from(arguments).slice(1);
  return arr.filter(function(val) {
    return !args.includes(val);
  });
}

//Code Explanation:
/*
    Declare a variable named args and set it equal to a new Array object from() the arguments passed into the function. On the same or next line, use the slice() method on args starting from the second index, 1. This separates the arguments used for filtering into their own array of args.

    Return the filtered array, using includes() in the callback function to check if val is not in args; returning true to keep the value in the original array or false to remove it.
*/
