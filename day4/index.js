/*
====================================================
Day 4 — this, Prototypes & Object Model
====================================================
*/
/*
1) this Binding — Types of binding
*/

// Implicit Binding — this = object calling the method
const obj1 = {
  name: "Mo",
  sayHi() {
    console.log("implicit this =", this);
  }
};
obj1.sayHi();

// Explicit Binding — call / apply / bind
function hi() {
  console.log("explicit this =", this.name);
}
const user = { name: "Abdo" };

hi.call(user);
hi.apply(user);
const bound = hi.bind(user);
bound();

// New Binding — this = new instance
function Person(name) {
  this.name = name;
}
const p = new Person("Zeyad");
console.log(p.name);
/*
2) call / apply / bind
*/

function funcA(a, b) {
  console.log("call:", this, a, b);
}
funcA.call({ id: 1 }, 10, 20);

function funcB(a, b) {
  console.log("apply:", this, a, b);
}
funcB.apply({ id: 2 }, [10, 20]);

function funcC() {
  console.log("bind:", this);
}
const fixed = funcC.bind({ id: 3 });
fixed();
/*
3) Prototype Chain
*/
const parent = {
  sayHi() {
    console.log("Hi from parent");
  }
};
const child = Object.create(parent);
child.sayHi();
/*
4) Constructor Pattern
*/

function Car(model) {
  this.model = model;
}

Car.prototype.start = function () {
  console.log(this.model, "is starting...");
};

const c1 = new Car("BMW");
c1.start();
/*
5) Method Borrowing
*/
const user1 = {
  name: "Ali",
  say() {
    console.log("Name:", this.name);
  }
};

const user2 = { name: "mohamed" };

user1.say.call(user2); // borrowing the method result => Name : mohamed
/*
6) this Example — mixed
*/

const obj2 = {
  x: 50,

  regularF: function () {
    console.log("1) regular method:", this);

    return () => {
      console.log("2) inside arrow:", this);

      return function () {
        console.log("3) inside returned regular:", this);
      };
    };
  }
};

obj2.regularF()()(); 
/*
Output of obj.regularF()()():

1) regular method: 
Object { x: 50, regularF: ƒ }

2) method ==> arrow: 
Object { x: 50, regularF: ƒ }

3) method ==> arrow ==> regular: 
Window { ... }  
*/
