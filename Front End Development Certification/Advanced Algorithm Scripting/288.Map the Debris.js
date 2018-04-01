//Basic Code Solution:

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var a = 2 * Math.PI;
  var newArr = [];
  var getOrbPeriod = function(obj) {
    var c = Math.pow(earthRadius + obj.avgAlt, 3);
    var b = Math.sqrt(c / GM);
    var orbPeriod = Math.round(a * b);
    delete obj.avgAlt;
    obj.orbitalPeriod = orbPeriod;
    return obj;
  };

  for (var elem in arr) {
    newArr.push(getOrbPeriod(arr[elem]));
  }

  return newArr;
}

// test here
orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);

/*
Code Explanation:

    GM and earthRadius are both given to us.
    To make the code easier to edit and read, each part of the equation is written separately.
    Create newArr to store the orbPeriod's.
    a is 2 times pi. The part that is a constant is on the global scope while the rest is part of a function.
    Create a function, gerOrbPeriod() that will do the required work for any amount of objects.
    c is (earthRadius + avgAlt) to the cube.
    b is the square root of c divided by GM.
    Create orbPeriod to store the product of a and b, with the Math.round() function applied to round up to the next whole number.
    Then we delete the key avgAlt, and add the new key and its value.
*/

//Intermediate Code Solution:

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;

  //Looping through each key in arr object
  for(var prop in arr) {
    //Rounding off the orbital period value
    var orbitalPer = Math.round(2 * Math.PI * Math.sqrt(Math.pow(arr[prop].avgAlt + earthRadius, 3) / GM));
    //deleting the avgAlt property
    delete arr[prop].avgAlt;
    //adding orbitalPeriod property
    arr[prop].orbitalPeriod = orbitalPer;
  }

  return arr;
}

// test here
orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);


//Advanced Code Solution:

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;

  // Loop through each item in the array arr
  arr.forEach(function(item) {
    // Calculate the Orbital period value
    var tmp = Math.round(2 * Math.PI * Math.sqrt(Math.pow(earthRadius + item.avgAlt, 3) / GM));
    //Delete the avgAlt property
    delete item.avgAlt;
    //Add orbitalPeriod property
    item.orbitalPeriod = tmp;
  });
  return arr;
}

// test here
orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);

/*
Code Explanation:

    GM and earthRadius are both given to us.
    The forEach() method is used to execute the function once per element (item) in arr.
    tmp holds the value of orbital period for each element calculated using the formula.
    The key avgAlt is deleted, and orbital period (tmp) found is assigned to the key orbitalPeriod.
*/
