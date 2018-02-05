
function reverseString(str) {
  var temp="";
  for(i=str.length-1;i>=0;i--){
    temp +=str[i];
  }
  return temp;
}

reverseString("hello");
