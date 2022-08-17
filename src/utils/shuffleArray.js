const shuffleArray = (arr) => {
  let start = arr.length,  randIdx;

  while (start > 0) {
    start--;
    randIdx = Math.floor(Math.random() * start);
    
    [arr[start], arr[randIdx]] = [arr[randIdx], arr[start]];
  }

  return arr;
}

export default shuffleArray;
