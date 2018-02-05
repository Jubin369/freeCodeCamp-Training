
function bouncer(arr) {
  var result = arr.filter(Boolean);

  return result;
}

bouncer([false, null, 0, NaN, undefined, ""]);
