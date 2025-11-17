console.log("User clicked Place Order");
const order = {
  items: [
    { id: 1, title: "Phone", price: 12000 },
    { id: 2, title: "Case", price: 200 },
  ],
  user: { name: "Mohamed", address: "Cairo" },
};
let total = 0;
function validateItems(items, index = 0) {
  if (index === items.length) return true;
  if (!items[index].price) throw new Error("Invalid item price");
  return validateItems(items, index + 1);
}
try {
  validateItems(order.items);
  console.log("Items validated");
} catch (err) {
  console.error("Validation error:", err.message);
}
setTimeout(() => console.log("Preparing order summary…"), 0);

Promise.resolve().then(() => {
  total = order.items.reduce((sum, item) => sum + item.price, 0);
  console.log("Total calculated:", total);
});
setTimeout(() => {
  console.log("Sending order to server...");
  Promise.resolve().then(() => {
    console.log("Payment Success! Order Confirmed ✔");
  });
}, 1000);
console.log("Waiting for server...");
/*
عشان اشرح المثال دا محتاج اقول حاجه .. js وهى شغاله بتشتغل علي مرحلتين
1- Memory Allocate(Hoisting Phase) ,
2- Execution

اول مرحله كل الى بيعمله انه بس بيحجز مكان variabls مع var بيديلها قيمه مبدئيا تبقى undefined مع let , const مش بيديله قيمه ودا بيفسر ليه واحده بتطلع undefined وواحده بتطلع refrance error
المهم بعد اول مرحله يخش ف تاني مرحله الا وهى execution يبدا هنا ينفذ الكود فيه مثل كود هيطبع حاجه يبدا ينفذ هيحط مثلا قيمه لل variables وهكذا

خليني اقولك الناتج الاول وبعدين اشرحلك دا جيه ازاي
=> User clicked Place Order
=> Items validated
=> Waiting for server...
=> Total calculated: 12200
=> Preparing order summary…
=> Sending order to server...
=> Payment Success! Order Confirmed ✔

اول ما يبدا ف التنفيذ بيلاقي ف وشه log يروح باعتها لل call stack وبعدين تتنفذ ع طول وبعدين يكمل يلاقي شويه decleration للمتغيرات الى كان خزنها ف المرحله الاول الى اسمها Memory Allocate(Hoisting Phase)
يروح عامل assign لل values دى يحط تعريف obj ف heap ويحط المتغير العادي ف stack

يكمل يلاقي فانكشن يعملها سكيب ف يلاقي try يدخل جواها ف يلاقي call للفانكشن الى خزنها اوردي يروح للفانكشن يروح على Call Stack، داخلها استدعاء recursive لكل عنصر من عناصر ال array، وبعد ما تنتهي recursion ترجع true ويطبع
Items validated

بعد ما يخلص يلاقي:
setimeout (زمنه 0): يبعتها ل web apis بدورها هتبعتها ل task queue.
Promise: يبعتها ل web apis الى بدورها برده تبعتها microtask queue.
setimeout (زمنه 1000): يبعتها ل web apis وتبدأ في انتظار الـ 1000ms.

ويروح ينفذ console.log("Waiting for server...") (وهي متزامنة).

الآن الـ Call Stack فارغ، والـ Event Loop يعمل (Microtasks أولاً):

أولوية Microtask: بعد ما call stack تخلص كل الى فيها بتقول لل microtask queue ابعت الى انت شايله انا خلصت، ف يتنفذ الـ Promise (حساب المجموع).
يطبع: Total calculated: 12200

تنفيذ Task 1: وبعدين Event Loop يقول لل task queue ابعت الى عندك (الـ micro والـ call stack فاضيين).
ف يتنفذ اول setimeout دخلت (زمنها 0) وتطلع console.log("Preparing order summary…")

تنفيذ Task 2 و Microtask داخلي: وبعدين يجي ل تاني setimeout (بعد مرور 1000ms) ينفذ فيها console.log("Sending order to server...").
ويلاقي promise ف يبعتها لل microtask queue.
تنتهي الـ Task الحالية، فيقوم الـ Event Loop بتفريغ الـ microtask queue التي تكونت للتو.
يطبع: Payment Success! Order Confirmed ✔
*/
