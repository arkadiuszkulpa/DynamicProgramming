const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
  res.send("hello");
  console.log(gridTraveler(18,18));
  console.log(canSum(5, [2, 3]));
  console.log(canSum(5, [2, 2, 5, 1]));
  console.log(canSum(5, [2, 3, 5, 1, 8, 19, 122, 23]));
});

const canSum = (targetSum, numbers) => {
  if (targetSum === 0) return true;

  for (let num of numbers) {
    const remainder = targetSum - num;
    if (canSum(remainder, numbers) === true) return true;
  }
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
