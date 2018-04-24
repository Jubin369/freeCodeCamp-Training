//my solution
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



//Basic Code Solution:
function titleCase(str) {
  var convertToArray = str.toLowerCase().split(" ");
  var result = convertToArray.map(function(val){
      return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
  });
  return result.join(" ");
}

titleCase("I'm a little tea pot");



//Intermediate Code Solution:
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};

function titleCase(str) {
    var newTitle = str.split(' ');
    var updatedTitle = [];
    for (var st in newTitle) {
        updatedTitle[st] = newTitle[st].toLowerCase().replaceAt(0, newTitle[st].charAt(0).toUpperCase());
    }
    return updatedTitle.join(' ');
}



//Advanced Code Solution:
function titleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
}

//Code Explanation:
/*
The solution works by first lowercasing all the characters in the string and then only uppercasing the first character of each word.

    Lowercase the whole string using str.toLowerCase().

    Replace every word’s first character to uppercase using .replace.

    Search for character at the beginning of each word i.e. matching any character following a space or matching the first character of the whole string, by using the following pattern.

    Regex explanation:
        Find all non-whitespace characters (\S)
        At the beginning of string (^)
        Or after any whitespace character (\s)

    The g modifier searches for other such word pattern in the whole string and replaces them.

    This solution works with national symbols and accented letters as illustrated by following examples
    international characters: ‘бабушка курит трубку’ // -> ‘Бабушка Курит Трубку’
    accented characters: ‘località àtilacol’ // -> ‘Località Àtilacol’

*/
