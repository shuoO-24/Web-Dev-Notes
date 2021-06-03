# 编译过程

## \(optional\) 语言类型

* **动态类型语言**：在运行过程当中需要检查数据类型的语言，比如JS
* **静态类型语言**：它的数据类型是在编译期进行检查的，也就是说变量在使用前要声明变量的数据类型，比如C/C++和Java
* **强类型语言**：一个变量不经过强制转换，它永远是这个数据类型，不允许隐式的类型转换。举个例子：如果你定义了一个double类型变量a,不经过强制类型转换那么程序int b = a无法通过编译。典型代表是Java。
* **弱类型语言**：它与强类型语言定义相反,允许编译器进行隐式的类型转换，典型代表C/C++和JavaScript。

## 编译过程

在传统的编译型语言处理中，一块儿源代码，你的程序，在它被执行 _之前_ 通常将会经历三个步骤，大致被称为“编译”：

### 分词/词法分析

将一连串字符打断成（对于语言来说）有意义的片段，称为 token（记号）。举例来说，考虑这段程序：`var a = 2;`。这段程序很可能会被打断成如下 token：`var`，`a`，`=`，`2`，和 `;`。空格也许会被保留为一个 token，这要看它是否是有意义的。

**注意**： 分词和词法分析之间的区别是微妙和学术上的，其中心在于这些 token 是否以 _无状态_ 或 _有状态_ 的方式被识别。简而言之，如果分词器去调用有状态的解析规则来弄清`a`是否应当被考虑为一个不同的 token，还是只是其他 token 的一部分，那么这就是 词法分析。

### 解析

将一个 token 的流（数组）转换为一个嵌套元素的树，它综合地表示了程序的语法结构。这棵树称为“抽象语法树”（AST —— Abstract Syntax Tree）。

`var a = 2;` 的树也许开始于称为 `VariableDeclaration`（变量声明）顶层节点，带有一个称为 `Identifier`（标识符）的子节点（它的值为 `a`），和另一个称为 `AssignmentExpression`（赋值表达式）的子节点，而这个子节点本身带有一个称为 `NumericLiteral`（数字字面量）的子节点（它的值为`2`）。

### 代码生成

这个处理将抽象语法树转换为可执行的代码。这一部分将根据语言，它的目标平台等因素有很大的不同。

所以，与其深陷细节，我们不如笼统地说，有一种方法将我们上面描述的 `var a = 2;` 的抽象语法树转换为机器指令，来实际上 _创建_ 一个称为 `a` 的变量（包括分配内存等等），然后在 `a` 中存入一个值。

**注意**： 引擎如何管理系统资源的细节远比我们要挖掘的东西深刻，所以我们将理所当然地认为引擎有能力按其需要创建和存储变量。

### JS

和大多数其他语言的编译器一样，JavaScript 引擎要比这区区三步复杂太多了。例如，在解析和代码生成的处理中，一定会存在优化执行效率的步骤，包括压缩冗余元素，等等。

JavaScript 引擎没有（像其他语言的编译器那样）大把的时间去优化，因为 JavaScript 的编译和其他语言不同，不是提前发生在一个构建的步骤中。

对 JavaScript 来说，在许多情况下，编译发生在代码被执行前的仅仅几微秒之内（或更少！）。为了确保最快的性能，JS 引擎将使用所有的招数（比如 JIT，它可以懒编译甚至是热编译，等等），而这远超出了我们关于“作用域”的讨论。

## 编译特点及变量作用域

* [ ] The sequence of execution?
* [ ] How does JS Engine compile our code? What's the difference between JS Engine and Interpreter?
* [ ] What is **scoping** and **hoisting**? 
* [ ] How do **function** variables run in JS behind the scene? 
* [ ] What is the **temporal dead zone**?

> **当JavaScript代码执行一段可执行代码\(executable code\)时，会创建对应的执行上下文\(execution context\)。**
>
> 对于每个执行上下文，都有三个重要属性：
>
> * 变量对象\(Variable object，VO\)
> * 作用域链\(Scope chain\)
> * this
>
> ⚠️区分概念：
>
> 1. Scope：作用域，当前执行代码**对变量的访问权限** —— 到政府部门办事的得找人，有时能办成有时办不成，得看你关系网有多强大，能不能找到能办成事的那位关键人物；但是只能靠父母 — parent node里的变量可以随便用，兄弟姐妹靠不住 — sibling node不可🙅）
> 2. Execution Context：执行上下文，打群架被警察抓来警局的录口供的一帮人/犯罪团伙，**动一发则牵全身**，随便问一个啥也不知道，都说自己只跟上家联系，它吩咐什么就做什么，其他内幕什么也不知道；一审得审一窝
> 3. Call Stack：办事处，里面塞满了编译器的**待办事项/等候已久的客户**😄 编译器按顺序一个个进行处理；排队的是一段函数或者global execution context，事情办完就被赶出去
> 4. Hoist：客户被分成三六九等，最皇👑的在编译器刚开始上班时就被**优先接待**，茶水伺候，得把它的事搞完了才能让下一位客户进办公室

### Scoping 静态作用域

**Definition**: “Where does the variable live? ” “How can I access it?” The environment where the variable lives.

Basically for functions, the scope is the variable environment. The scope of a variable is defined by its location within the source code.

#### Scope

There are three types of scopes:

1. **Global scope**
   1. Accessible for all variables
   2. 属于 global variables，
2. **Function/Local scope**
   1. _Function scope is actually a special type of a block scope._
3. **Block scope\(ES6\)**
   1. Only for `let`, `const` variables, and functions\(only in strict mode\) — block-scoped
   2. `if`, `with`, `for`, `while`, even empty `{}`!
   3. 当`var`变量在函数内部被定义时，即使nest好几层，`var`变量仍在这个函数作用域
   4. `const`

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gqh7xiz2xwj31a20mows6.jpg)

分清每个变量（包括函数）的初始时在哪个scop，然后慢慢一层一层从内往外翻:facepunch:

#### Scope Chain

Variable Lookup： 直线向上，就近原则

In JavaScript, variables with the same name can be specified at multiple layers of nested scope. In such a situation, local variables gain priority over global variables. If you declare a local variable and a global variable with the same name, the local variable will take precedence when you use it inside a function or block. This type of behavior is called **shadowing**. Simply put, the inner variable shadows the outer.

That’s the exact mechanism used when a JavaScript interpreter is trying to find a particular variable. It starts at the innermost scope being executed at the time, and continues until the first match is found, no matter whether there are other variables with the same name in the outer levels or not.

### Scope Chain VS.  Call Stack

In execution, variables environments are created and pushed into call stack 压入执行上下文栈（Execution context stack，ECS）

⚠️Scope chain has nothing to do with the order of execution/function called.

定义部分：

* 栈：提供代码运行的环境，存储各种基本类型的变量
* 调用栈：相当于引擎的调用部门，会维护程序执行期间的上下文状态
* 堆：主要负责像对象Object这种引用变量类型的存储

对比：

* 栈（类比货架）：栈为自动分配的内存空间。栈内存中存储的数据一般都是已知大小的，算是一种简单储存。栈中数据读取速度相对较快
* 堆（类比仓库）：堆是动态分配的内存。堆内存中存储的数据在大小方面，似乎没有规定，而且一般大小都是未知的。堆中数据读取速度相对较慢（要拿着地址值去取数据）

### 执行上下文 Variable Environment

There are three types of variable environments:

1. **Function variable environment**
   * 函数每次执行都会生成新的上下文，不管有没有被反复声明
2. **Global variable environment**
3. `eval` function 

#### Executable Code

JavaScript 的可执行代码\(executable code\)的类型：

1. 全局代码
2. 函数代码
3. eval代码

#### Executable Context Stack\(ECS\)

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

伪代码理解：

```javascript
// 伪代码

// fun1()
ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// 擦，fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```

**A Good Example**

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

观察它和下面👇一段有什么区别：

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

模拟第一段代码的执行过程：

```javascript
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();
```

模拟第二段代码的执行过程：

```javascript
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```

⚠️它们执行上下文栈的顺序变化不一样哦

### 句法提升 Hoisting

Makes some types of variables accessible/usable in the code before they are actually declared. “Variables lifted to the top of their scope”.

**Behind the scenes:**

* Before execution, code is scanned for variable declarations, and for each variable, a new property is created in the **variable environment object**.
* 在global scope里声明的`var`变量和函数声明在“预解析”**时会被hoist**到当前定义域（scope）的最前面，然后在按照顺序逐行执行代码；
* 只提升声明，不提升赋值

**Why Hoisting?**

* Using functions before actual declaration;
* `var` hoisting is just a byproduct of hoisting functions.
* We cannot remove this feature now :anguished:

|  | HOISTED 👇 | INITIAL VALUE👇 | SCOPE👇 |
| :---: | :---: | :---: | :---: |
| **`function` declarations** | YES ✅ | Actual function | Block or Function |
| **`var` variables** | YES ✅ | `undefined` | Function |
| **`let` and `const` variables** | NO ⛔ | `<uninitialized>, TDZ` | Block |
| **`function` expressions and arrows** | Depends if using `var` or `let/const` | Depends if using `var` or `let/const` | Depends if using `var` or `let/const` |
| Arrow functions |  |  |  |

**Temporal Dead Zone 暂时性死区**

The section from the beginning of the block to the actual variable declaration of `let` and `const` global variables are called the **Temporal Dead Zone**.

**Error Message**

For TDZ, we got different error messages when we try to access the unavailable variables: `ReferenceError: Cannot access 'job' before initialization`

For a variable never declared: `ReferenceError: x is not defined`

**Why TDZ?**

* Make it easier to avoid and catch errors: **accessing variables before the declaration is bad practice** and should be avoided;
* Makes `const` variables actually work —— never reassigned

**Coding Examples**

```javascript
var me = 'Jonas';
let job = 'teacher';
const year = 1991;

console.log(addDecl(2, 3));
console.log(addExpr(2, 3));  // TDZ Uncaught TypeError: addExpr is not a function
console.log(addArrow); // Undefined
console.log(addArrow(2, 3))  


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
console.log(addArrow(2, 3))  // Uncaught TypeError: addArrow is not a function


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

**Binding**

Let’s first examine the life cycle of `var` variables, which don’t have temporal dead zones:

* When the scope \(its surrounding function\) of a `var` variable is entered, storage space \(a so-called _binding_\) is created for it. The variable is immediately initialized, by setting it to `undefined`.
* When the execution within the scope reaches the declaration, the variable is set to the value specified by the _initializer_ \(an assignment\) – if there is one. If there isn’t, the value of the variable remains `undefined`.

Variables declared via `let` have temporal dead zones, which means that their life cycles look like this:

* When the scope \(its surrounding block\) of a `let` variable is entered, storage space \(a so-called _binding_\) is created for it. The variable remains uninitialized.
* Getting or setting an uninitialized cause a ReferenceError.
* When the execution within the scope reaches the declaration, the variable is set to the value specified by the _initializer_ \(an assignment\) – if there is one. If there isn’t, the value of the variable is set to `undefined`.

## Primitive VS. Reference Values

### Primitive

Inside **call stack** after declaring a variable:

1. Create an unituqe identifier with variable name 
2. A piece of memory will be allocated 
3. The value is stored in memory at the specified address
4. The value stored at the address **is immutable**

When call a variable, actually call its address. Variable holds address. 可以用多个变量指向同一地址；

当给原本与其他变量指向同一地址的变量重新赋值时，变量会指向新的地址

### Reference

**An new object** is created and stored in **heap**.

The **identifier** of the object points to a piece of address in **call stack**, then the piece of **memory** in the stack points to object in the **heap** by storing its memory\(in heap\) as value.

A piece of memory in the call stack has a reference to the piece of memory in the **heap** which holds an object.

If we assign a new `const` variable with an existing object, the new identifier will point to the same memory as the existing identifier in the call stack which references to the existing object in the **heap**.

:warning:We can modify the new `const` object’s properties because the `const` only applies to the value of the identifier in the call stack which holds the memory of the object\(with its properties\) in the heap. We just change the value of value in the heap.

:ballot\_box\_with\_check: `const` is immutable only true for **primitive values**, not for **reference** values.

So after changing the values of object in the heap, the value we get using the two identifiers are “changed”.

![Example and Diagram](https://tva1.sinaimg.cn/large/008i3skNgy1gqjhtchohyj31bu0n8170.jpg)

> A Reference consists of three components, the base value, the referenced name and the Boolean valued strict reference flag.

### 拷贝 Copying Objects

为什么要拷贝？

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

#### 浅拷贝 Shallow Copy

Only copy the first-level properties of object and will **not copy the objects inside the object**

```javascript
const [main, , secondary] = restaurant.categories;
console.log(main, secondary);

const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);
```

If running `main = secondary; secondary = temp;`, it will return an `Uncaught TypeError: Assignment to constant variable.`, because you modify the identifier of the `const` object.

#### 深拷贝 Deep Copy

## More Advanced Stuff

### 从ECMScript规范解读this

> Types are further subclassified into ECMAScript language types 语言类型 and specification types 规范类型.
>
> An ECMAScript language type corresponds to values that are directly manipulated by an ECMAScript programmer using the ECMAScript language. The ECMAScript language types are Undefined, Null, Boolean, String, Number, and Object.
>
> A specification type corresponds to **meta-values** that are used within **algorithms** to describe the **semantics** of ECMAScript language constructs and ECMAScript language types. The specification types are Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, and Environment Record.

也就是说，在 ECMAScript 规范中还有一种只存在于规范中的类型，它们的作用是用来描述语言底层行为逻辑，其中的 Reference 类型与 this 的指向有着密切的关联。

> The Reference type is used to explain the behaviour of such operators as delete, typeof, and the assignment operators.
>
> A Reference consists of three components, the base value, the referenced name and the Boolean valued strict reference flag.
>
> The base value is either undefined, an Object, a Boolean, a String, a Number, or an environment record \(10.2.1\). A base value of undefined indicates that **the reference could not be resolved to a binding**. The referenced name is a String. referenced name 就是属性的名称

所以 Reference 类型就是用来解释诸如 delete、typeof 以及赋值等操作行为的。

举个例子：

```javascript
var foo = 1;

// 对应的Reference是：
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};
```

### Microtask Queueing and Execution Within The Browser's Event Loop

[Tasks, microtasks, queues and schedules - JakeArchibald.com](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

## Reference

[Call Stack 是什么? \| 来Offer \(laioffer.com\)](https://www.laioffer.com/zh/news/2017-06-22-what-is-call-stack/#:~:text=Call)

