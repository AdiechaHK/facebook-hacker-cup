var checkTarget000 = function(target) {
  var sum = target.split(" ").reduce(function(sum, num) {
    return sum + Number(num);
  }, 0);
  return (sum == 0);
}

var substract = function(target, elem) {
  var first = elem.split(" ").map(function(ele) { return Number(ele); });
  return target.split(" ").reduce(function(newTarget, tEle, indx) {
    var sub = Number(tEle) - first[indx];
    return newTarget + sub + " ";
  }, "").trim();
}

var isPositive = function(target) {
  return target.split(" ").reduce(function(cond, val) {
    return cond && (Number(val) >= 0);
  }, true);
}

var newYearResolution = function(target, fruits) {

  var condition = false;

  if(fruits.length == 1) {
    return (target == fruits[0]);
  } else if(checkTarget000(target)) {
    return true;
  } else {
    var newArr = JSON.parse(JSON.stringify(fruits));
    var newTarget = substract(target, newArr.splice(0,1)[0]);
    return newYearResolution(target, newArr) || (isPositive(newTarget) && newYearResolution(newTarget, newArr));
  }

}


var fs = require('fs');

var stream = fs.createWriteStream("output.txt");

fs.readFile('./input.txt', 'utf8', function (err, data) {

  if(err) {
    return console.log(err);
  }

  var arry = data.split('\n') ;

  var count = Number(arry[0]);

  for(var i = 1, j = 1; i <= count; i++){
    var target = arry[j++];
    var fruitCount = arry[j++];
    var fruits = [];
    for (var k = 0; k < fruitCount; k++) {
      fruits.push(arry[j++]);
    };
    stream.write("Case #" + i + ": " + (newYearResolution(target, fruits)?"Yes":"No") + "\n");
  }

});
