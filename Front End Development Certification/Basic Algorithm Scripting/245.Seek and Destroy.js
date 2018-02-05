
function destroyer(arr) {
  var args = Array.prototype.slice.call(arguments, 1);
  
  return arr.filter(function(val) {
    for(i=0;i<args.length;i++)
      if(args[i]==val)
        return;
      
  return val;
});
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
