//my solution
function pairwise(arr, arg) {
  var usedPairs=new Array(),sumIndex=0,pos=1;
  for(var i=0;i<arr.length;i++){
      if(usedPairs.indexOf(i)==-1){
        for(var j=i+1;j<arr.length;j++){
          if(arr[i]+arr[j]==arg && usedPairs.indexOf(j)==-1){
            sumIndex+=i;
            sumIndex+=j;
            usedPairs[pos++]=i;
            usedPairs[pos++]=j;
            break;
          }
        }
      }
    }
  /*
  arr.reduce(function (
    accumulator,
    currentValue,
    currentIndex,
    array
  ){
    
  })*/
  return sumIndex;
}

pairwise([0, 0, 0, 0, 1, 1], 1);
