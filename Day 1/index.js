/**
 * Day 1
 * (Value/Reference, Typeof null, Type Coercion, Hoisting)
 */

// *********************************************************
// * 1. Copy by Value vs. Copy by Reference
// *********************************************************

// 1.1 Copy by Value (Primitives: number, string, boolean)
let numA = 10;
let numB = numA;
numA = 20;
console.log(`1.1 Value: B is ${numB}`); // 10 (Independent copy)

// 1.2 Copy by Reference (Non-Primitives: Object, Array)
let objA = { val: 10, data: 'old' };
let objB = objA;
objA.val = 20;
console.log(`1.2 Reference: B is ${objB.val}`); // 20 (Shared object)

// FIX: Use Spread Operator for an independent copy
let objC = { ...objA };
objA.data = 'new';
console.log(`1.3 FIX: C's data is ${objC.data}`); // 'old' (C is now safe)


// *********************************************************
// * 2. The 'typeof null' Bug
// *********************************************************

// Historical Bug: typeof null returns 'object'.
console.log(`2.1 TypeOf null: ${typeof null}`); // object

// SAFE CHECK for Objects (Recommended practice):
let myNull = null;
if (myNull !== null && typeof myNull === 'object') {
    // This is skipped for 'null'
} else {
    console.log("2.2 Safe Check: 'null' is correctly identified as NOT a true object.");
}


// *********************************************************
// * 3. Abstract Operations & Coercion Rules
// *********************************************************

// 3.1 The '+' Operator Rule:
// Rule 1: String present? -> Concatenation
console.log(`3.1 String Rule: ${10 + '5'}`); // "105"

// Rule 2: No String? -> Addition (ToNumber)
console.log(`3.2 Number Rule: ${true + 1}`);  // 2
console.log(`3.3 Null Rule: ${null + 5}`);    // 5

//  Edge Case: [] + {}
console.log(`3.4 Edge Case: [] + {} = ${[] + {}}`); // "[object Object]"


// *********************************************************
// * 4. Variable Hoisting (var vs. let/const)
// *********************************************************

// 4.1 'var' Hoisting (Full Initialization)
console.log("4.1 VAR before declaration:", varVariable); // Output: undefined
var varVariable = 10;

// 4.2 'let/const' Hoisting (Partial Initialization / TDZ)
// console.log("4.2 LET before declaration:", letVariable); //  ReferenceError (TDZ)
let letVariable = 20;

//  Takeaway: let/const are safer because they enforce declaration before use.