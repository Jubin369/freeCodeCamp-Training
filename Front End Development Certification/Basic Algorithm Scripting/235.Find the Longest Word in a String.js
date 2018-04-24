//my solution
function findLongestWord(str) {
  var len=0,temp=0;
  for(i=0;i<str.length;i++){
    if(str[i]==' ')
      temp=0;
    else
      temp++;
    if(len<temp)
      len=temp;
  }
  return len;
}

findLongestWord("What if we try a super-long word such as otorhinolaryngology");


//Basic Code Solution:
function findLongestWord(str) {
  var words = str.split(' ');
  var maxLength = 0;

  for (var i = 0; i < words.length; i++) {
    if (words[i].length > maxLength) {
      maxLength = words[i].length;
    }
  }

  return maxLength;
}


//Intermediate Code Solution:
//Using .reduce()
function findLongestWord(s) {
  return s.split(' ')
    .reduce(function(x, y) {
      return Math.max(x, y.length)
    }, 0);
}


//Advanced Code Solution:(Slow code)
//Using recursiveness
function findLongestWord(str) {

  //split the string into individual words 
  //(important!!, you'll see why later)
  str = str.split(" ");

  //str only has 1 element left that is the longest element, 
  //return the length of that element
  if(str.length == 1){
    return str[0].length;
  }

  //if the first element's length is greater than the second element's (or equal) 
  //remove the second element and recursively call the function)
  if(str[0].length >= str[1].length){
    str.splice(1,1);
    return findLongestWord(str.join(" "));
  }

  //if the second element's length is greater thant the first element's start 
  //call the function past the first element 
  if(str[0].length <= str[1].length){
    // from the first element to the last element inclusive.
    return findLongestWord(str.slice(1,str.length).join(" "));
  }
}
