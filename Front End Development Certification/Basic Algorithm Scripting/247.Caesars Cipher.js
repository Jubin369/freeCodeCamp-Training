//Basic Code Solution:
function rot13(str) {
  // Split str into a character array
  return str.split('')
  // Iterate over each character in the array
    .map.call(str, function(char) {
      // Convert char to a character code
      x = char.charCodeAt(0);
      // Checks if character lies between A-Z
      if (x < 65 || x > 90) {
        return String.fromCharCode(x);  // Return un-converted character
      }
      //N = ASCII 78, if the character code is less than 78, shift forward 13 places
      else if (x < 78) {
        return String.fromCharCode(x + 13);
      }
      // Otherwise shift the character 13 places backward
      return String.fromCharCode(x - 13);
    }).join('');  // Rejoin the array into a string
}


//Intermediate Code Solution:
// Solution with Regular expression and Array of ASCII character codes
function rot13(str) {
  var rotCharArray = [];
  var regEx = /[A-Z]/ ;
  str = str.split("");
  for (var x in str) {
    if (regEx.test(str[x])) {
      // A more general approach
      // possible because of modular arithmetic
      // and cyclic nature of rot13 transform
      rotCharArray.push((str[x].charCodeAt() - 65 + 13) % 26 + 65);
    } else {
      rotCharArray.push(str[x].charCodeAt());
    }
  }
  str = String.fromCharCode.apply(String, rotCharArray);
  return str;
}

// Change the inputs below to test
rot13("LBH QVQ VG!");


//Advanced Code Solution:
function rot13(str) { // LBH QVQ VG!
  return str.replace(/[A-Z]/g, L => String.fromCharCode((L.charCodeAt(0) % 26) + 65));
}
//Code Explanation:
/*
    String.prototype.replace function34 lets you transform a String based on some pattern match (defined by a regular expression), and the transformation function53 (which is applied to each of the pattern matches).
    Arrow function147 syntax is used to write the function parameter to replace().
    L represents a single unit, from every pattern match with /[A-Z]/g - which is every uppercase letter in the alphabet, from A to Z, present in the string.
    The arrow function applies the rot13 transform on every uppercase letter from English alphabet present in the given string.
*/
