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
