
function palindrome(str) {
  str=str.toLowerCase();
  var i=0,j=str.length-1;
  while(i<j){
    while(!(str.charCodeAt(i)>96&&str.charCodeAt(i)<123||str.charCodeAt(i)>47&&str.charCodeAt(i)<58))
      i++;
    while(!(str.charCodeAt(j)>96&&str.charCodeAt(j)<123||str.charCodeAt(j)>47&&str.charCodeAt(j)<58))
      j--;
    if(str.charCodeAt(i)!=str.charCodeAt(j))
      return false;

    i++;j--;
  }
  return true;
}



palindrome("A man, a plan, a canal. Panama");
