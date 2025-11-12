
/* ========= 1. Array Method Chaining ========= */
// Example with filter + map (2 passes)
const arr = [5, 12, 8, 20];
const r1 = arr.filter(x => x > 10).map(x => x * 2);
console.log(r1); // [24, 40]

// One-pass alternative with reduce
const r2 = arr.reduce((acc, x) => (x > 10 ? [...acc, x * 2] : acc), []);
console.log(r2);

/* ========= 2. Immutability ========= */
// ❌ Changes original array
const nums = [1, 2, 3];
nums.push(4);

// ✅ Immutable ways (new arrays/objects)
const newArr = [...nums, 5];                  // add
const filtered = nums.filter(x => x !== 2);   // remove
const updated = nums.map(x => (x === 1 ? 99 : x)); // update

const user = { name: "Ali", age: 25 };
const newUser = { ...user, age: 26 }; // new object
const nested = { n: "Mona", a: { city: "Giza" } };
const copy = { ...nested, a: { ...nested.a, city: "Alex" } };

/* ========= 3. Spread Operator ========= */
// Shallow copy (only first level)
const obj = { a: 1, b: { c: 2 } };
const shallow = { ...obj };
shallow.b.c = 99; // affects original

// Deep copy (safe)
const deep1 = JSON.parse(JSON.stringify(obj)); // simple
const deep2 = structuredClone(obj);           // modern way

/* ========= 4. Rest Params & Destructuring ========= */
// Rest parameters
function sum(...nums) { return nums.reduce((a, n) => a + n, 0); }
console.log(sum(1, 2, 3)); // 6

// Destructure object
function showUser({ name, age }) { console.log(name, age); }
showUser({ name: "Omar", age: 30 });

// Nested destructuring
function showAddr({ name, address: { city } }) {
  console.log(`${name} in ${city}`);
}
showAddr({ name: "Aya", address: { city: "Cairo" } });

/* ========= 5. switch(true) & Logical Operators ========= */
const score = 85;
switch (true) { // useful for ranges
  case score >= 90: console.log("A"); break;
  case score >= 80: console.log("B"); break;
  default: console.log("F");
}

// Short-circuit logic
const userName = "" || "Guest"; // OR → first truthy
const isAdmin = true && "Welcome"; // AND → last truthy
console.log(userName, isAdmin);

// Nullish coalescing
const count = 0 ?? 10; // keeps 0
console.log(count);

// Example with conditional discount
function getDiscount(price, type) {
  const discount = type === "gold" ? 0.3 : type === "silver" ? 0.15 : 0;
  return price && price - price * discount;
}
console.log(getDiscount(100, "gold")); // 70

/*
===========================================
JavaScript Deep Reduce Cheatsheet
reduce = powerful array transformer
Can: sum, flatten, group, build objects, etc.
===========================================
*/

// 1. Sum / combine numbers
const numbers = [10, 20, 30];
const total = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", total); // 60

// 2. Flatten nested arrays
const nestedArr = [1, [2, 3], [4, [5]]];
const flat = nestedArr.reduce(
  (acc, val) => acc.concat(Array.isArray(val) ? val.flat(Infinity) : val),
  []
);
console.log("Flatten:", flat); // [1,2,3,4,5]

// 3. Count occurrences
const data = ["A", "B", "A", "C", "A"];
const counts = data.reduce((acc, val) => {
  acc[val] = (acc[val] || 0) + 1; // لو مش موجود يبدا من 0
  return acc;
}, {});
console.log("Count:", counts); // {A:3, B:1, C:1}

// 4. Group by property
const users = [
  { name: "Ali", age: 25 },
  { name: "Sara", age: 25 },
  { name: "Omar", age: 30 }
];

const grouped = users.reduce((acc, u) => {
  (acc[u.age] ||= []).push(u); // init array if missing
  return acc;
}, {});
console.log("Group by age:", grouped);

// 5. Transform array to object
const people = ["Ali", "Sara", "Mona"];
const objFromArr = people.reduce((acc, name, i) => {
  acc[i] = name;
  return acc;
}, {});
console.log("Indexed object:", objFromArr);

// 6. Merge multiple objects
const arrObjs = [{ a: 1, b: 2 }, { b: 3, c: 4 }];
const merged = arrObjs.reduce((acc, o) => ({ ...acc, ...o }), {});
console.log("Merged:", merged);

// 7. Build map of arrays (group by first letter)
const names = ["Ali", "Ahmed", "Sara", "Salma"];
const groupedByFirst = names.reduce((acc, n) => {
  const k = n[0];
  (acc[k] ||= []).push(n);
  return acc;
}, {});
console.log("Grouped by letter:", groupedByFirst);

/*
===========================================
Tips:
- Always set an initial value ({} or [])
- Use ||= to safely initialize arrays/objects
- reduce = map + filter + forEach in one
===========================================
*/
