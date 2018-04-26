//my solution
var min;
function sumAll(arr) {
  min=Math.min(...arr);
  return sumCon(Math.max(...arr));
}

function sumCon(max) {
   if(min==max)
     return max;
  else
    return max+sumCon(max-1);
}
sumAll([1, 4]);



//Basic Code Solution:
function sumAll(arr) {
    var max = Math.max(arr[0], arr[1]);
    var min = Math.min(arr[0], arr[1]);
    var temp = 0;
    for (var i=min; i <= max; i++){
        temp += i;
    }
  return(temp);
}
sumAll([1, 4]);


//Intermediate Code Solution:
function sumAll(arr) {
  // Using ES6 arrow function (one-liner)
  var sortedArr = arr.sort((a,b) => a-b);
  var firstNum = arr[0];
  var lastNum = arr[1];
  // Using Arithmetic Progression summing formula

  var sum = (lastNum - firstNum + 1) * (firstNum + lastNum) / 2;
  return sum;
}


//Advanced Code Solution:
function sumAll(arr) {
    var sum = 0;
    for (var i = Math.min(...arr); i <= Math.max(...arr); i++){
        sum += i;
    }
  return sum;
}
sumAll([1, 4]);
//Code Explanation:
/*
    Creating a variable sum to store the sum of the elements.
    Starting iteration of the loop from min element of given array and stopping when it reaches the max element.
    Using a spread operator (…arr) allows passing the actual array to the function instead of one-by-one elements.
*/
