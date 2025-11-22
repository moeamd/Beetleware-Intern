// Type Inference
let inferredNumber = 42;
let inferredString = "hello";
let explicitArray: string[] = [];

// Union & Intersection
let unionValue: string | number;
unionValue = 123;
unionValue = "abc";

type A = {name: string};
type B = {age: number};
type Person = A & B;
let person: Person = {name: "Ali", age: 30};

// Literal Types
let method: "GET" | "POST";
method = "GET";

type Role = "Admin" | "User" | "Guest";
let userRole: Role = "User";

// Type Narrowing
function printId(id: string | number) {
if (typeof id === "string") return id.toUpperCase();
return id + 10;
}

// Narrowing with 'in'
type Fish = {swim: () => void};
type Bird = {fly: () => void};
function move(animal: Fish | Bird) {
if ("swim" in animal) animal.swim();
else animal.fly();
}

// Narrowing with 'instanceof'
class Dog { bark() {} }
class Cat { meow() {} }
function speak(animal: Dog | Cat) {
if (animal instanceof Dog) animal.bark();
else animal.meow();
}

// Enums vs Union
enum StatusEnum { Active, Pending, Disabled }
let enumStatus: StatusEnum = StatusEnum.Active;

type StatusUnion = "Active" | "Pending" | "Disabled";
let unionStatus: StatusUnion = "Pending";

// Typed Utilities
function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
return arr.reduce((acc, obj) => {
const k = obj[key] as unknown as string;
if (!acc[k]) acc[k] = [];
acc[k].push(obj);
return acc;
}, {} as Record<string, T[]>);
}

const users = [
{name: "Ali", role: "Admin"},
{name: "Sara", role: "User"},
{name: "Omar", role: "Admin"}
];
const grouped = groupBy(users, "role");

// Sum Array Utility
function sumArray(nums: number[]): number {
return nums.reduce((acc, n) => acc + n, 0);
}
