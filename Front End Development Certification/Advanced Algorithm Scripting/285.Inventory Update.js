//Basic Code Solution:

function updateInventory(arr1, arr2) {

    // Variable for location of product
    var index;

    // A helper method to return the index of a specified product (undefined if not found)
    var getProductIndex = function (name) {
        for (var i = 0; i < this.length; i++) {
            if (this[i][1] === name) {
                return i;
            }
        }
        return undefined;
    }

    // For each item of the new Inventory
    for (var i = 0; i < arr2.length; i++) {

        // Invoke our helper function using arr1 as this
        index = getProductIndex.call(arr1, arr2[i][1]);

        // If the item doesn't exist
        if (index === undefined) {
            // Push the entire item
            arr1.push(arr2[i]);
        } else {
            // Add the new quantity of the current item
            arr1[index][0] += arr2[i][0];
        }

    }

    // Sort alphabetically, by the product name of each item
    arr1.sort(function (a, b) {
        if (a[1] > b[1]) {
            return 1;
        }
        if (a[1] < b[1]) {
            return -1;
        }
        return 0;
    });

    return arr1;
}

// test here
// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);



//Intermediate Code Solution:

function updateInventory(arr1, arr2) {
  // All inventory must be accounted for or you're fired!

  var index;
  var arrCurInvName = []; // Names of arr1's items
  var arrNeInvName = []; // Names of arr2's items

  // Same as using two for loops, this takes care of increasing the number of stock quantity.
  arr1.map(function(item1) {
    return arr2.map(function(item2) {
      if (item1[1] === item2[1]) {
        item1[0] = item1[0] + item2[0]; //Increase number of stock
      }
    });
  });

  // Get item's name for new Inventory
  arr2.map(function(item) {
    arrNeInvName.push(item[1]);
  });

  // Get item's name for Current Inventory
  arr1.map(function(item) {
    arrCurInvName.push(item[1]);
  });

  // Add new inventory items to current inventory.
  arrNeInvName.map(function(item) {
    if (arrCurInvName.indexOf(item) === -1) {
      index = arrNeInvName.indexOf(item);
      arr1.push(arr2[index]);
    }
  });

  // Sort the array alphabetically using the second element of the array as base.
  arr1.sort(function(currItem, nextItem) {

    //Ternary function to avoid using if else
    return currItem[1] > nextItem[1] ? 1 : -1;
  });

  return arr1;
}

// test here
// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);

/*
Code Explanation:

    The variable index stores the location (index) of a product.
    arrCurInvName has the names of arr1’s items.
    arrNeInvName has the names of arr2’s items.
    arr1.map(function(item1)) takes care of items already existing in inventory i.e., it increases the quantity in the inventory.
    Next, arr2.map(function(item)) and arr1.map(function(item)) get the names of items for the new and current inventory respectively.
    arrNeInvName.map(function(item)) handles items which don’t already exist in inventory i.e., it adds new items to the inventory.
    The updated array arr1 is then sorted alphabetically by product name (held in arr1[x][1]) and returned.
*/


//Advanced Code Solution:

function updateInventory(arr1, arr2) {
  var flag = 0;
  arr2.forEach(function(item) {
    flag = 0;
    arr1.forEach(function(list) {
      // If the product is already present, increase the quantity
      if(item[1] === list[1]) {
        list[0] += item[0];
        flag = 1;
      }
    });
    //If not already present, add the product
    if(flag === 0)
      arr1.push(item);
  });

  //Return the sorted inventory in alphabetical order by product name
  return arr1.sort(function(a, b) {
    return a[1] > b[1] ? 1 : -1;
  });
}

// test here
// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

/*
Code Explanation:

    The variable flag is a flag variable which checks whether a product exists in the inventory. A flag variable, in its simplest form, is a variable you define to have one value until some condition is true, in which case you change the variable’s value.
    arr2.forEach(function(item)) iterates through each item in the new delivery:
        If the product is already present, it’s quantity is simply updated and flag is made 1.
        If the product is new i.e., flag is 0, it is added to the inventory using the push() method.
    The updated array arr1 is then sorted alphabetically by product name.
*/
