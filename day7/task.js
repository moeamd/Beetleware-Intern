/*
=> Steps
    1- change the parametras to function and the dependencies
    2- check if dependencies is in cash obj then retun from cash 
    3- if not store a new dependencies in the cash obj
*/


const memoSum = () => {
  const casheData = {};
  return function (fun, dependencies) {
    const key = JSON.stringify(dependencies);
    if (casheData[key] !== undefined) {
      console.log("from cashe---", dependencies);
      return casheData[key];
    }
    console.log("from new calculate---", key);
    const result = fun();
    casheData[key] = result;
    return result;
  };
};
function sumetion(x, y) {
  return x + y;
}
const sum = memoSum();
console.log(sum(() => sumetion(1, 2), [1, 2]));
console.log(sum(() => sumetion(3, 2), [3, 2]));
console.log(sum(() => sumetion(1, 2), [1, 2]));
console.log(sum(() => sumetion(3, 2), [3, 2]));
