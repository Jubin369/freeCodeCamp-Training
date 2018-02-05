
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
