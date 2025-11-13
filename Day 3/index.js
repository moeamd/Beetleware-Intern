/* ============================================
📅 DAY 3: Functions, Scope & Closures — Cheat Sheet
============================================ */

/*-------------------------------------------------
1️⃣ FUNCTION TYPES
-------------------------------------------------*/

// ✅ Function Declaration (Hoisted)
function sayHello(name) {
  return `Hello, ${name}!`;
}

// ✅ Function Expression (NOT hoisted)
const sayHi = function (name) {
  return `Hi, ${name}!`;
};

// ✅ Arrow Function (no own this / arguments)
const greet = (name) => `Hey, ${name}!`;

// ⚠️ Difference: `this` Binding
const obj = {
  regular: function () {
    console.log("regular this →", this); // refers to obj
  },
  arrow: () => {
    console.log("arrow this →", this); // refers to outer (global)
  },
};
obj.regular();
obj.arrow();

/*-------------------------------------------------
2️⃣ LEXICAL SCOPING & SCOPE CHAIN
-------------------------------------------------*/

// Scope is determined by *where code is written*, not executed.
const x = 10;

function outer() {
  const y = 20;
  function inner() {
    const z = 30;
    console.log(x + y + z); // 10 + 20 + 30 = 60
  }
  inner();
}
outer();

// 🔍 Scope Chain order:
// inner() → outer() → global

/*-------------------------------------------------
3️⃣ CLOSURE (الإغلاق)
-------------------------------------------------*/

// A Closure = function + its preserved lexical environment.

// ✅ Example 1: Basic Counter
function createCounter() {
  let count = 0; // private variable
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getValue());  // 2

// ✅ Example 2: makeAdder — function factory
function makeAdder(x) {
  return function (y) {
    return x + y; // remembers x even after outer function ends
  };
}
const add5 = makeAdder(5);
console.log(add5(10)); // 15

// ✅ Example 3: once() — executes only once
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
const startApp = once(() => console.log("App started!"));
startApp(); // runs
startApp(); // ignored

// ✅ Example 4: memoize() — caching results
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Example usage:
const slowSquare = (n) => {
  console.log("Calculating...");
  return n * n;
};

const fastSquare = memoize(slowSquare);
console.log(fastSquare(5)); // "Calculating..." → 25
console.log(fastSquare(5)); // Cached → 25

/*-------------------------------------------------
🧠 CONCEPT SUMMARY
-------------------------------------------------
🔹 Function Declaration → Hoisted + has its own `this`
🔹 Arrow Function → No own `this`, `arguments`, `super`
🔹 Lexical Scope → Determined at code-write time
🔹 Scope Chain → Local → Outer → Global
🔹 Closure → A function remembering its environment

📚 Recommended Search Keywords:
"JavaScript Function Hoisting"
"Arrow function vs regular function binding"
"JavaScript Lexical Scope deep dive"
"How JavaScript Closures work internally"
"Closure for Data Privacy"
"Closure in Currying"
-------------------------------------------------*/
