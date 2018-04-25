//my solution
function mutation(arr) {
  arr[0] = arr[0].toLowerCase();
  arr[1] = arr[1].toLowerCase();
  
  for(i=0;i<arr[1].length;i++)
    if(arr[0].indexOf(arr[1].charAt(i))==-1)
      return false;
  return true;
}

mutation(["hello", "HEllo"]);


//Basic Code Solution:
//Procedural
function mutation(arr) {
  var test = arr[1].toLowerCase();
  var target = arr[0].toLowerCase();
  for (i=0;i<test.length;i++) {
    if (target.indexOf(test[i]) === -1)
      return false;
  }
  return true;
 }


// Intermediate Code Solution:
//Declarative
function mutation(arr) {
  return arr[1].toLowerCase()
    .split('')
    .every(function(letter) {
      return arr[0].toLowerCase()
        .indexOf(letter) !== -1;
    });
}
//Code Explanation:
/*
Grab the second string, lowercase and turn it into an array; then make sure every one of its letters is a part of the lowercased first string.

Every will basically give you letter by letter to compare, which we do by using indexOf on the first string. indexOf will give you -1 if the current letter is missing. We check that not to be the case, for if this happens even once every will be false.
*/


