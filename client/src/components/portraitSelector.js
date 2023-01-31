export function photoSelector(target) {
  // First, we create empty arrays to contain all the info we need to loop through. One to let us find the biggest height in the images we received, another to contain only the biggest images we received, then the last to contain the images that are biggest and with the most votes.
  var heightArr = [];
  var bigArr = [];
  var voteArr = [];
  // We loop through our given array of objects that contain links to the images using a "forEach" method.
  target.profiles.forEach((el) => {
    // We push only the height property of each element, we do this so we can find the biggest images we can.
    heightArr.push(el.height);
  });
  target.profiles.forEach((el) => {
    // However this time, we check to see if the current elements height property matches the height property of our custom made object.
    if (el.height === Math.max(...heightArr)) {
      // If it does then we push the element into the array that will contain all the biggest images that we received.
      bigArr.push(el);
    }
  });
  // We set up a quick check of our new arrays length.
  if (bigArr.length < 2) {
    // if it only contains one element then there is no need to do further work, so we simply end the function here and return the file path of the only element in the array. This element will be the biggest image from the array we initially received which in the vast majority of cases means it is the highest quality.
    return bigArr[0].file_path;
  }
  // If the check fails we repeat the process we just did to get the biggest height but this time we do it to get the element with the highest vote average in our new array.
  bigArr.forEach((el) => {
    voteArr.push(el.vote_average);
  });
  var index;
  // We loop through the array containing the biggest images, searching for the element that matches the vote average we found in the previous steps.
  bigArr.forEach((el) => {
    // We set up a simple "if" statement to handle it.
    if (el.vote_average === Math.max(...voteArr)) {
      // Once it is found, we set the empty variable we created one step ago to contain the "indexOF" the current element in the biggest height array.
      index = bigArr.indexOf(el);
    }
  });
  // Lastly, we return the file path to the image that will be the biggest possible size with the highest vote average.
  return bigArr[index].file_path;
}
