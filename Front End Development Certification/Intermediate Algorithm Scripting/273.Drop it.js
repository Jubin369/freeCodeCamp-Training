// Basic Code Solution:
function dropElements(arr, func) {
  // drop them elements.
  var times = arr.length;
  for (var i = 0; i < times; i++) {
    if (func(arr[0])) {
      break;
    } else {
      arr.shift();
    }
  }
  return arr;
}

dropElements([1, 2,5, 3], function(n) {return n > 3; });




//Intermediate Code Solution:
function dropElements(arr, func) {
  return arr.slice(arr.findIndex(func) >= 0 ? arr.findIndex(func): arr.length, arr.length);
}

// test here
dropElements([1, 2, 3, 4], function(n) {return n >= 3;});





//Advanced Code Solution:
function dropElements(arr, func) {
  while(arr.length > 0 && !func(arr[0])) {
    arr.shift();
  }
  return arr;
}

// test here
dropElements([1, 2, 3, 4], function(n) {return n >= 3;});
