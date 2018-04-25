//my solution
function chunkArrayInGroups(arr, size) {
  var res=[];
  for(i=0;i<arr.length;i+=size){
    res.push(arr.slice(i,i+size));
  }
  return res;
}
chunkArrayInGroups(["a", "b", "c", "d"], 2);


//Basic Code Solution:
function chunkArrayInGroups(arr, size) {

  var temp = [];
  var result = [];

  for (var a = 0; a < arr.length; a++) {
    if (a % size !== size - 1)
      temp.push(arr[a]);
    else {
      temp.push(arr[a]);
      result.push(temp);
      temp = [];
    }
  }
  if (temp.length !== 0)
    result.push(temp);
  return result;
}
//Code Explanation:
/*
    Firstly, we create two empty arrays called temp and result, which we will eventually return.
    Our for loop loops until a is equal to or more than the length of the array in our test.
    Inside our loop, we push to temp using temp.push(arr[a]); if the remainder of a / size is not equal to size - 1.
    Otherwise, we push to temp, push temp to the result variable and reset temp to an empty array.
    Next, if temp isn’t an empty array, we push it to result.
    Finally, we return the value of result.
*/


//Advanced Code Solution:
function chunkArrayInGroups(arr, size) {
  // Break it up.
  var newArr = [];
  var i = 0;

  while (i < arr.length) {
    newArr.push(arr.slice(i, i+size));
    i += size;
  }
  return newArr;
}
chunkArrayInGroups(["a", "b", "c", "d"], 2);


//Advanced Code Solution 2:
function chunkArrayInGroups(arr, size) {
  var newArr = [];
  while (arr.length) {
    newArr.push(arr.splice(0,size));
  }
  return newArr;
}
