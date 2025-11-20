/*
=> Steps
    1- Change the parameters to a function and the dependencies.
    2- Check if the dependencies exist in the cache object; if yes, return from cache.
    3- If not, store the new dependency in the cache object.
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
