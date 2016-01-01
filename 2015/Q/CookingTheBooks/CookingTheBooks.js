var swipe = function(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
  return arr;
}

var cookingTheBooks = function(input) {
  var arr = input.split("");

  var assumed = {
    maxIndex: 0,
    minIndex: 0,
    max: Number(arr[0]),
    min: Number(arr[0])
  };
  var indexs = arr.reduce(function(result, current, i) {
    var curNum = Number(current);
    if(curNum > result.max) {
      result.max = curNum;
      result.maxIndex = i;
    }
    if(curNum < result.min && curNum != 0) {
      result.min = curNum;
      result.minIndex = i;
    }
    return result;
  }, assumed);
  var max = swipe(JSON.parse(JSON.stringify(arr)), indexs.maxIndex, 0).join("");
  var min = swipe(JSON.parse(JSON.stringify(arr)), indexs.minIndex, 0).join("");
  return min + " " + max;
}


var fs = require('fs');

var stream = fs.createWriteStream("output.txt");

fs.readFile('./input.txt', 'utf8', function (err, data) {

  if(err) {
    return console.log(err);
  }

  var arry = data.split('\n') ;

  var count = arry.length < Number(arry[0]) + 1? arry.length: Number(arry[0]);

  for(var i = 1; i < count + 1; i++){
    stream.write("Case #" + i + ": " + cookingTheBooks(arry[i]) + "\n");
  }

});
