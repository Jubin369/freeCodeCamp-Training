//my solution
function largestOfFour(arr) {
  var largeVal=[];
  for(i=0;i<4;i++){
    largeVal[i] = arr[i].reduce(function(previousVal, currentVal) {
      if(previousVal>currentVal)
        return previousVal;
      return currentVal;
    },0);
  }
  
  return largeVal;
}

largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]);


//Basic Code Solution:
//(Procedural approach)
function largestOfFour(arr) {
  var results = [];
  for (var n = 0; n < arr.length; n++) {
    var largestNumber = arr[n][0];
    for (var sb = 1; sb < arr[n].length; sb++) {
      if (arr[n][sb] > largestNumber) {
        largestNumber = arr[n][sb];
      }
    }

    results[n] = largestNumber;
  }

  return results;
}
