
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


//Basic Code Solution:
function palindrome(str) {
  return str.replace(/[\W_]/g, '').toLowerCase() ===
         str.replace(/[\W_]/g, '').toLowerCase().split('').reverse().join('');
}


//Intermediate Code Solution:
function palindrome(str) {
  str = str.toLowerCase().replace(/[\W_]/g, '');
  for(var i = 0, len = str.length - 1; i < len/2; i++) {
    if(str[i] !== str[len-i]) {
      return false;
    }
  }
  return true;
}

//Advanced Code Solution (most performant):
function palindrome(str) {
  //assign a front and a back pointer
  let front = 0;
  let back = str.length - 1;

  //back and front pointers won't always meet in the middle, so use (back > front)
  while (back > front) {
    //increments front pointer if current character doesn't meet criteria
    while ( str[front].match(/[\W_]/) ) {
      front++;
      continue;
    }
    //decrements back pointer if current character doesn't meet criteria
    while ( str[back].match(/[\W_]/) ) {
      back--;
      continue;
    }
    //finally does the comparison on the current character
    if ( str[front].toLowerCase() !== str[back].toLowerCase() ) return false
    front++;
    back--;
  }
  
  //if the whole string has been compared without returning false, it's a palindrome!
  return true;

}
