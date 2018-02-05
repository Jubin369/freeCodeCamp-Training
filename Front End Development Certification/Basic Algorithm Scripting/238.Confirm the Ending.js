
function confirmEnding(str, target) {
  var targetVal=target.length;
  var pos=str.length-targetVal;
  if(target==str.substr(pos))
    return true;
  return false;
}

confirmEnding("Bastian", "n");
