function compareNumbers(a, b) {
  return a - b;
}

function getIndexToIns(arr, num) {
  arr.sort(compareNumbers);
  
  for(i=0;i<arr.length;i++)
    if(num<=arr[i])
      return i;
      
  return i;
}

getIndexToIns([3, 5, 20, 3],5);
