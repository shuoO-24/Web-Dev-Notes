---
description: 深拷贝和浅拷贝的区别
---

# 拷贝

> 拷贝，具体分两种：深拷贝、浅拷贝
>
> * JS中有不同的方法来复制对象，但是在拷贝中存在很多陷阱
> * 理解数据在内存中的存储方式，即理解栈、堆等原理能让我们避开很多拷贝的陷阱

### 什么是深拷贝、浅拷贝

* 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会**影响到另一个对象**。
* 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象**不会影响原对象**。

## 拷贝 Copying Objects

为什么要拷贝？

仔细阅读下面👇一大段代码：

```javascript
// Primitive Type
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);
// Davis Williams

// Reference Type
const jessica = {
  firstName: 'Jessica',
  lastName: 'Willams',
  age: 27,
};
const marriedJessica = jessica; // copy the reference and point to the same object in heap
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage: ', marriedJessica);
// Before marriage: {firstName: "Jessica", lastName: "Davis", age: 27}
// After marriage:  {firstName: "Jessica", lastName: "Davis", age: 27}

// marriedJessica = {};
// we cannot change the value in stack: Uncaught TypeError: Assignment to constant variable.
// Different: change property, change the complete object

// -----
// 深拷贝？不！是浅拷贝
// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
const jessicaCopy = Object.assign({}, jessica2); // A new object is created in the heap and jessicaCopy is created in stack and points to it
jessicaCopy.lastName = 'Davis';
console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);
// Before marriage: {firstName: "Jessica", lastName: "Williams", age: 27}
// After marriage:  {firstName: "Jessica", lastName: "Davis", age: 27}
// But this will not copy the objects inside the object Jessica

// Manipulate object inside the same object -- change both objects
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

// LoadDash -- 深拷贝
console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);
```

### 浅拷贝 Shallow Copy

Only copy the first-level properties of object and will **not copy the objects inside the object**

```javascript
const [main, , secondary] = restaurant.categories;
console.log(main, secondary);

const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);
```

If running `main = secondary; secondary = temp;`, it will return an `Uncaught TypeError: Assignment to constant variable.`because you modify the identifier of the `const` object.

### 深拷贝 Deep Copy

