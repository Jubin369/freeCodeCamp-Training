function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function titleCase(str) {
  var temp=0;
  for(i=0;i<str.length;i++){
    if(str[i]==' ')
      temp=0;
    else
      temp++;
    if(temp==1){
      if(str.charCodeAt(i)>96&&str.charCodeAt(i)<123)
        str=setCharAt(str,i,String.fromCharCode(str.charCodeAt(i)-32));
    } else if(temp!=0){
      if(str.charCodeAt(i)>64&&str.charCodeAt(i)<91)
        str=setCharAt(str,i,String.fromCharCode(str.charCodeAt(i)+32));
    }
  }
  return str;
}

titleCase("I'm a little tea pot");
