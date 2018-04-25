//my solution
function truncateString(str, num) {
  // Clear out that junk in your trunk
  var n=num;
  if(str.length>3 && n>3)
    n-=3;
  if(str.length>num)
    str=str.slice(0,n)+"...";
  return str;
}
truncateString("Absolutely Longer", 2);


//Basic Code Solution:
function truncateString(str, num) {
  // Clear out that junk in your trunk
  if (str.length > num && num > 3) {
    return str.slice(0, (num - 3)) + '...';
  } else if (str.length > num && num <= 3) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}


//Advanced Code Solution:
function truncateString(str, num) {
  if (str.length > num)
    return str.slice(0, num > 3 ? num-3 : num) + '...';
  return str;
}
