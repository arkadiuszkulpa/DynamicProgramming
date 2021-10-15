const express = require("express");
const https = require("https");
const path = require("path");

const app = express();

app.get("/", function(req, res) {
  res.send("hello");
  console.log(bestSum(7, [5, 3, 4, 7])); //[7]
  console.log(bestSum(8, [2, 3, 5])); //[3,5]
  console.log(bestSum(8, [1, 4, 5])); //[4,4]
  console.log(bestSum(100, [1, 2, 5, 25])); //[25,25,25,25]
});

app.get("/Construct", function(req, res) {
  res.send();
  console.log("constructor is on");
});

const bestSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  let shortestCombination = null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderCombination = bestSum(remainder, numbers, memo);

    if (remainderCombination !== null) {
      const combination = [ ... remainderCombination, num ]
      //if the combination is shorter than the current 'shortest'. update
      if (shortestCombination === null || combination.length < shortestCombination.length) {
        shortestCombination = combination;
      }
    }
  }
  memo[targetSum] = shortestCombination;
  return shortestCombination;
}

// m = target sum
// n - numbers.length

// brute force
// time: O(n^m * m)
// space: O(m^2)

// Memoized
// time: O(m^2 * n)
// space: O(m^2)


const howSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum < 0) return null;
  if (targetSum === 0) return [];


  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = howSum(remainder, numbers, memo);

    if (remainderResult !== null) {
      memo[targetSum] = [ ...remainderResult, num];
      return memo[targetSum];
    }
  }
  memo[targetSum] = null;
  return null;
}

const canSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return [targetSum];
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let num of numbers) {
    const remainder = targetSum - num;
    if (canSum(remainder, numbers, memo) === true) {
      memo [targetSum] = true;
      return true;
    }
  }
  memo[targetSum] = false;
  return false;
}

const gridTraveler = (m, n, memo={}) => {
  const key = m + "," + n;

  if (key in memo) return memo[key];
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;

  memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
  return memo[key];
}

app.listen(3000, function() {
  console.log("Server Started at port 3000");
});
