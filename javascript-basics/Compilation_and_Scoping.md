# 编译特点及变量作用域

- [ ] The sequence of execution?
- [ ] How does JS Engine compile our code? What's the difference between JS Engine and Interpreter?
- [ ] What is **scoping** and **hoisting**?
- [ ] How do **function** variables run in JS behind the scene?
- [ ] What is the **temporal dead zone**?

> ⚠️ 区分概念：
>
> 1. Scope：作用域，当前执行代码**对变量的访问权限** —— 到政府部门办事的得找人，有时能办成有时办不成，得看你关系网有多强大，能不能找到能办成事的那位关键人物；但是只能靠父母 — parent node 里的变量可以随便用，兄弟姐妹靠不住 — sibling node 不可 🙅）
> 2. Execution Context：执行上下文，打群架被警察抓来警局的录口供的一帮人/犯罪团伙，**动一发则牵全身**，随便问一个啥也不知道，都说自己只跟上家联系，它吩咐什么就做什么，其他内幕什么也不知道；一审得审一窝
> 3. Call Stack：办事处，里面塞满了编译器的**待办事项/等候已久的客户**😄 编译器按顺序一个个进行处理；排队的是一段函数或者 global execution context，事情办完就被赶出去
> 4. Hoist：客户被分成三六九等，最皇 👑 的在编译器刚开始上班时就被**优先接待**，茶水伺候，得把它的事搞完了才能让下一位客户进办公室

---

## Scoping 静态作用域

**Definition**: “Where does the variable live? ” “How can I access it?” The environment where the variable lives.

Basically for functions, the scope is the variable environment. The scope of a variable is defined by its location within the source code,

There are three types of scopes:

1. **Global scope**
   1. Accessible for all variables
   2. 属于 global variables，
2. **Function/Local scope**
   1. _Function scope is actually a special type of a block scope._
3. **Block scope\(ES6\)**
   1. Only for `let`, `const` variables, and functions\(only in strict mode\) — block-scoped
   2. `if`, `with`, `for`, `while`, even empty `{}`!
   3. 当`var`变量在函数内部被定义时，即使 nest 好几层，`var`变量仍在这个函数作用域
   4. `const`

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqh7xiz2xwj31a20mows6.jpg)

分清每个变量（包括函数）的初始时在哪个 scop，然后慢慢一层一层从内往外翻:facepunch:

---

### Scope Chain 作用域链

Variable Lookup： 直线向上，就近原则

In JavaScript, variables with the same name can be specified at multiple layers of nested scope. In such a situation, local variables gain priority over global variables. If you declare a local variable and a global variable with the same name, the local variable will take precedence when you use it inside a function or block. This type of behavior is called **shadowing**. Simply put, the inner variable shadows the outer.

That’s the exact mechanism used when a JavaScript interpreter is trying to find a particular variable. It starts at the innermost scope being executed at the time, and continues until the first match is found, no matter whether there are other variables with the same name in the outer levels or not.

---

## Scope Chain VS. Call Stack

In execution, variables environments are created and pushed into call stack 压入执行上下文栈（Execution context stack，ECS）

⚠️ Scope chain has nothing to do with the order of execution/function called.

**Example**:

![Difference between scope chain and call stack](https://tva1.sinaimg.cn/large/008i3skNgy1gqh98c852pj319c0m0qjt.jpg)

---

## 执行上下文 Variable Environment

函数每次执行都会生成新的上下文，不管有没有被反复声明

There are three types of variable environments:

1. **Function variable environment**
2. **Global variable environment**
3. `eval` function

---

## 句法提升 Hoisting

Makes some types of variables accessible/usable in the code before they are actually declared. “Variables lifted to the top of their scope”.

**Behind the scenes:**

- Before execution, code is scanned for variable declarations, and for each variable, a new property is created in the **variable environment object**.
- 在 global scope 里声明的`var`变量和函数声明在“预解析”**时会被 hoist**到当前定义域（scope）的最前面，然后在按照顺序逐行执行代码；
- 只提升声明，不提升赋值

**Why Hoisting?**

- Using functions before actual declaration;
- `var` hoisting is just a byproduct of hoisting functions.
- We cannot remove this feature now :anguished:

|                                       |              HOISTED 👇               |            INITIAL VALUE👇            |                SCOPE👇                |
| :-----------------------------------: | :-----------------------------------: | :-----------------------------------: | :-----------------------------------: |
|      **`function` declarations**      |                YES ✅                 |            Actual function            |           Block or Function           |
|          **`var` variables**          |                YES ✅                 |              `undefined`              |               Function                |
|    **`let` and `const` variables**    |                 NO ⛔                 |        `<uninitialized>, TDZ`         |                 Block                 |
| **`function` expressions and arrows** | Depends if using `var` or `let/const` | Depends if using `var` or `let/const` | Depends if using `var` or `let/const` |
|            Arrow functions            |                                       |                                       |                                       |

---

### Temporal Dead Zone 暂时性死区

The section from the beginning of the block to the actual variable declaration of `let` and `const` global variables are called the **Temporal Dead Zone**.

**Error Message**:

-
- For TDZ, we got different error messages when we try to access the unavailable variables: `ReferenceError: Cannot access 'job' before initialization`

- For a variable never declared: `ReferenceError: x is not defined`

**Why TDZ?**

- Make it easier to avoid and catch errors: **accessing variables before the declaration is bad practice** and should be avoided;
- Makes `const` variables actually work —— never reassigned

**Coding Examples**

```javascript
var me = "Jonas";
let job = "teacher";
const year = 1991;

console.log(addDecl(2, 3));
console.log(addExpr(2, 3)); // TDZ Uncaught TypeError: addExpr is not a function
console.log(addArrow); // Undefined
console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

// var: Uncaught TypeError: addExpr is not a function
// Since it is `undefined(2, 3)
var addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;
```

```javascript
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));  // TDZ Uncaught TypeError: addExpr is not a function
// console.log(addArrow); // Undefined
console.log(addArrow(2, 3)); // Uncaught TypeError: addArrow is not a function

function addDecl(a, b) {
  return a + b;
}

// const: Uncaught TypeError: addExpr is not a function
// Since it is `undefined(2, 3)
const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;
```

### Extra: About Binding

Let’s first examine the life cycle of `var` variables, which don’t have temporal dead zones:

- When the scope \(its surrounding function\) of a `var` variable is entered, storage space \(a so-called _binding_\) is created for it. The variable is immediately initialized, by setting it to `undefined`.
- When the execution within the scope reaches the declaration, the variable is set to the value specified by the _initializer_ \(an assignment\) – if there is one. If there isn’t, the value of the variable remains `undefined`.

Variables declared via `let` have temporal dead zones, which means that their life cycles look like this:

- When the scope \(its surrounding block\) of a `let` variable is entered, storage space \(a so-called _binding_\) is created for it. The variable remains uninitialized.
- Getting or setting an uninitialized cause a ReferenceError.
- When the execution within the scope reaches the declaration, the variable is set to the value specified by the _initializer_ \(an assignment\) – if there is one. If there isn’t, the value of the variable is set to `undefined`.
