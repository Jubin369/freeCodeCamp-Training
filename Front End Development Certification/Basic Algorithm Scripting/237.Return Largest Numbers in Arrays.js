
function largestOfFour(arr) {
  var largeVal=[];
  for(i=0;i<4;i++){
    var l=0;
    largeVal[i] = arr[i].reduce(function(previousVal, currentVal) {
      if(l<previousVal)
        l=previousVal;
      if(l<currentVal)
        l=currentVal;
      return l;
    });
  }
  
  return largeVal;
}

largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]);
