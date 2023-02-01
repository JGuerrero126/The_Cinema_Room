export function photoSelector(target) {
  try {
    var heightArr = [];
    var englishArr = [];
    var bigArr = [];
    var voteArr = [];
    target.posters.forEach((el) => {
      if (el.iso_639_1 === "en") {
        englishArr.push(el);
      }
    });
    if (englishArr.length > 0) {
      englishArr.forEach((el) => {
        heightArr.push(el.height);
      });
      englishArr.forEach((el) => {
        if (el.height === Math.max(...heightArr)) {
          bigArr.push(el);
        }
      });
      if (bigArr.length < 2) {
        return bigArr[0].file_path;
      }
      bigArr.forEach((el) => {
        voteArr.push(el.vote_average);
      });
      var index;
      bigArr.forEach((el) => {
        if (el.vote_average === Math.max(...voteArr)) {
          index = bigArr.indexOf(el);
        }
      });
      return bigArr[index].file_path;
    } else {
      target.posters.forEach((el) => {
        heightArr.push(el.height);
      });
      target.posters.forEach((el) => {
        if (el.height === Math.max(...heightArr)) {
          bigArr.push(el);
        }
      });
      if (bigArr.length < 2) {
        return bigArr[0].file_path;
      }
      bigArr.forEach((el) => {
        voteArr.push(el.vote_average);
      });
      var index;
      bigArr.forEach((el) => {
        if (el.vote_average === Math.max(...voteArr)) {
          index = bigArr.indexOf(el);
        }
      });
      return bigArr[index].file_path;
    }
  } catch (e) {
    console.log(e.message);
  }
}
