/* interface: defines object shape, can extend */
interface IUser {
  readonly id: number; // can't change this
  name: string;
  age?: number;        // optional
}

const user1: IUser = { id: 1, name: "Ali" }; 
// user1.id = 2; // nope, readonly

/* type alias: more flexible, good for unions/primitives */
type TUser = {
  id: number;
  name: string;
  age?: number;
};

const user2: TUser = { id: 2, name: "Sara", age: 25 };

/* structural typing: if it has the right shape, it's fine */
function printName(p: { name: string }) {
  console.log(p.name);
}

printName(user1); 
const person = { name: "Omar", age: 40 };
printName(person);

/*  function type */
type GreetFn = (name: string) => string;
const greet: GreetFn = (name) => `Hello, ${name}!`;
console.log(greet("Ali"));

/* optional param example */
function add(a: number, b?: number): number {
  return a + (b ?? 0);
}
console.log(add(5, 3));
console.log(add(5));

/* generics: reusable functions that keep type info */
function identity<T>(value: T): T {
  return value;
}
console.log(identity(42));
console.log(identity("Hello"));

/* generic array helper */
function getItem<T>(arr: T[], index: number): T | undefined {
  return arr[index];
}
const nums = [10, 20, 30];
console.log(getItem(nums, 1));
console.log(getItem(nums, 5));

/* Result type for success/fail pattern */
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

const success: Result<number, string> = { ok: true, value: 100 };
const failure: Result<number, string> = { ok: false, error: "Failed" };
console.log(success, failure);

/* Utility types: Partial, Pick, Omit, Record */
type User = { id: number; name: string; age: number };

type UserPartial = Partial<User>;       // all optional
const updateUser: UserPartial = { age: 35 };

type UserPreview = Pick<User, "name">;  // just name
const preview: UserPreview = { name: "Ali" };

type UserNoAge = Omit<User, "age">;     // without age
const noAge: UserNoAge = { id: 1, name: "Sara" };

type UserRoles = Record<"admin" | "user", number>; // map keys to values
const roles: UserRoles = { admin: 2, user: 5 };

/* safe generic helpers */
function safeMap<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

function safeFilter<T>(arr: T[], fn: (item: T) => boolean): T[] {
  return arr.filter(fn);
}

const usersArr: User[] = [
  { id: 1, name: "Ali", age: 30 },
  { id: 2, name: "Sara", age: 25 },
  { id: 3, name: "Omar", age: 35 },
];

const names = safeMap(usersArr, u => u.name);
const adults = safeFilter(usersArr, u => u.age >= 30);

console.log(names);   // ["Ali", "Sara", "Omar"]
console.log(adults);  // [{ id: 1, name: "Ali", age: 30 }, { id: 3, name: "Omar", age: 35 }]
