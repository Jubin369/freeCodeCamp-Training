//my solution
function repeatStringNumTimes(str, num) {
  var res="";
  while(num>0){
    res +=str;
    num--;
  }
  return res;
}
repeatStringNumTimes("abc", 3);


//Intermediate Code Solution:
function repeatStringNumTimes(str, num) {
  if(num < 0)
    return "";
  if(num === 1)
    return str;
  else
    return str + repeatStringNumTimes(str, num - 1);
}
repeatStringNumTimes("abc", 3);


//Advanced Code Solution:
function repeatStringNumTimes(str, num) {
  return num > 0 ? str.repeat(num) : '';
}
repeatStringNumTimes("abc", 3);
