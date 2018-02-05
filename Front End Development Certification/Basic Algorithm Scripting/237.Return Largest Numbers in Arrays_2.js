function largestOfFour(arr) {
  var largeVal=[0,0,0,0];
  for(i=0;i<4;i++){
    for(j=0;j<4;j++){
      if(largeVal[i]<arr[i][j])
        largeVal[i]=arr[i][j];
    }
  }
  
  return largeVal;
}

largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]);
