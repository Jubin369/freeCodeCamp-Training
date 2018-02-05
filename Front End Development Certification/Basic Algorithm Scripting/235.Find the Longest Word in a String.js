
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
