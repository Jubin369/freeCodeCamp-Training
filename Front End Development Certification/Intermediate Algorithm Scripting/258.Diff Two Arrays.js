
function diffArray(arr1, arr2) {
  var newArr = arr1.concat(arr2);
  newArr.sort();
  for(i=0;i<newArr.length;i++){
    if(newArr[i]==newArr[i+1]){
      newArr = newArr.slice(0,i).concat(newArr.slice(i+2));
      i-=2; 
    }
     
  }
  return newArr;
}

diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]);
