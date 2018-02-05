function palindrome(str) {
  str=str.replace(/([^\w]*)(_*)/gi, '');
  str=str.toLowerCase();
  var i=0,j=str.length-1;
  while(i<j){
    if(str.charCodeAt(i)!=str.charCodeAt(j))
      return false;
    i++;j--;
  }
  return true;
}



palindrome("A man, a plan, a canal. Panama");
