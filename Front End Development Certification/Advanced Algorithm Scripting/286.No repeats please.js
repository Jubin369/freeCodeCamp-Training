//Basic Code Solution:

function permAlone(str) {

  // Create a regex to match repeated consecutive characters.
  var regex = /(.)\1+/g;

  // Split the string into an array of characters.
  var arr = str.split('');
  var permutations = [];
  var tmp;

  // Return 0 if str contains same character.
  if (str.match(regex) !== null && str.match(regex)[0] === str) return 0;

  // Function to swap variables' content.
  function swap(index1, index2) {
    tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;
  }

  // Generate arrays of permutations using the algorithm.
  function generate(int) {
    if (int === 1) {
      // Make sure to join the characters as we create  the permutation arrays
      permutations.push(arr.join(''));
    } else {
      for (var i = 0; i != int; ++i) {
        generate(int - 1);
        swap(int % 2 ? 0 : i, int - 1);
      }
    }
  }

  generate(arr.length);

  // Filter the array of repeated permutations.
  var filtered = permutations.filter(function(string) {
    return !string.match(regex);
  });

  // Return how many have no repetitions.
  return filtered.length;
}

// Test here.
permAlone('aab');

/*
Code Explanation:

    regex contains the regular expression to match repeated consecutive characters.
    The string str is split into an array of characters, arr.
    0 is returned if str contains same characters.
    The function swap() is used for the purpose of swapping the contents of two variable’s contents.
    The next block of code uses Heap’s algorithm to generate arrays of permutations in permutations.
    The filtered variable filters permutations to include only non-repeated permutations.
    filtered.length returns the number of total permutations of the provided string that don’t have repeated consecutive letters.
*/


//Advanced Code Solution:

function permAlone(str) {
  if(str=='') return 1
  const bag=new Map()
  for(const c of str){
    bag.set(c,(bag.get(c)||0)+1)
  }
  const essence=[]
  for(let v of bag.values()){
    essence[--v]=(essence[v]||0)+1
  }
  let fact
  {const f=[1]
    fact= n=>f[n]||(f[n]=n*fact(n-1))
  }
  const essL=essence.length
  let bits=essL//essence.reduce((s,v)=>s+v,essL)
  let bExp=-1// essence as a bits expression
  let pFact=1, bMask=1
  for(let i=0;i<essL && bits<=32;i++){
    if(essence[i]==null) essence[i]=0
    const v=essence[i]; bits+=v
    pFact*= fact(i+1)**v * fact(v)
    bExp-=bMask; bMask<<=v+1
  }
  if(bits>32) 
    throw `Too many bits requiered: ${bits} >32`
  bExp+=bMask--
  // console.log(essence)
  // console.log(bExp.toString(2))

  class MapA extends Map{
    set(key, idx, value){
      if(value==null)
        return super.set(key, idx),this
      let ar=super.get(key)
      if(typeof ar!='object')
        {ar=[]; super.set(key, ar)}
      ar[idx]=value
      return this
    }
  }
  let crMap=new MapA()
  crMap.set((3<<bits-essL-1)-1, 0, 1)
  for(let lcrM=1;lcrM<str.length; lcrM++){
    const nxMap=new MapA()
    for(const [key, value] of crMap){
      const bDiff=key^bExp, 
        bnSprout=~((~key&bMask)>>>1 & key),
        bnImp=~bDiff&bnSprout,
        sum=value.reduce((s,v)=>s+v,0)
      let i=0, v=0, allowed=0
      for(let crBit=1;crBit&bMask;crBit<<=1){
        if(crBit&key) v++; else {i++; v=0}
        if(crBit&bnImp) continue
        cLabel:{
          if(crBit&bDiff)
            if(crBit&key)allowed++
            else allowed--
          else break cLabel
          if(crBit&bnSprout) continue
        }if(allowed)
          nxMap.set(key+crBit, i, i?v*sum-value[i-1]:sum)
      }
    }
    //could be done: recycle crMap
    crMap=nxMap;
  }
  return pFact*crMap.get(bExp).reduce((s,v)=>s+v,0)
}
