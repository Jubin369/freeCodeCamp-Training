//Basic Code Solution:
function findElement(arr, func) {
  // Make num undefined by default
  var num;

  // Loop thorugh the array and use the function to check
  for (var a = 0; a < arr.length; a++) {
    if (func(arr[a])) {
      // Store the first case and break the loop
      num = arr[a];
      return num;
    }
  }

  // otherwise return undefined
  return num;
}
findElement([1, 2, 5, 4,6,9], function(num){ return num % 3 === 0; });





//Intermediate Code Solution:
function findElement(arr, func) {
  filterArr = arr.filter(func); //filter array with the function provided

  return filterArr[0]; //return the first element that returns true, or undefined if no elements return true
}

// test here
findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; });
