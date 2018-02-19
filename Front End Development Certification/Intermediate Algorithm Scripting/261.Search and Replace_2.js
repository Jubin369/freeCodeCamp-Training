
function myReplace(str, before, after) {
  var re = new RegExp(before,"gi");
    // create a function that will change the casing of any number of letter in parameter "target"
    // matching parameter "source"
    function applyCasing(source, target) {
        // split the source and target strings to array of letters
        var targetArr = target.split("");
        var sourceArr = source.split("");
        // iterate through all the items of sourceArr and targetArr arrays till loop hits the end of shortest array
        for (var i = 0; i < Math.min(targetArr.length, sourceArr.length); i++){
            // find out the casing of every letter from sourceArr using regular expression
            // if sourceArr[i] is upper case then convert targetArr[i] to upper case
            if (/[A-Z]/.test(sourceArr[i])) {
                targetArr[i] = targetArr[i].toUpperCase();
            }
            // if sourceArr[i] is not upper case then convert targetArr[i] to lower case
            else targetArr[i] = targetArr[i].toLowerCase();
        }
        // join modified targetArr to string and return
        return (targetArr.join(""));
    }


    // replace "before" with "after" with "before"-casing
    return str.replace(re, applyCasing(before, after));
}

myReplace("AJumped quick Jumped brown fox jumped over the lazy dog", "JumPed", "leaped");
