function confirmEnding(str, target) {
  var targetLen=target.length*-1;
  if(target==str.substr(targetLen))
    return true;
  return false;
}

confirmEnding("Bastian", "n");
