# **THE INTERNET, WEB, and HTTP**

## THE INTERNET

Global network of interconnected computers that communicate via TCP/IP (don't worry about that for now). Network of networks.

## THE WEB

The World Wide Web is an **information system** where documents and others resources are available over the Internet. Documents are transferred via HTTP.

## How the Internet Works

The Internet consists of millions of interconnected networks that allow all sorts of computers and devices to communicate with each other.

By convention, all devices that participate in a network are provided unique labels -- an _Internet Protocol Address or IP Address_, which is similar to a computer's phone number on the Internet. _Port numbers_ add more detail about how to communicate (think of company phone extensions).

## **HTTP Requests**

"Hyper Text Transfer Protocol"

Foundation of communication on the World Wide Web — Request and Response:
_It is a system of rules, a protocol, that serve as a link between applications and the transfer of hypertext documents. Stated differently, it's **an agreement, or message format, of how machines communicate with each other**. HTTP follows a simple model where **a client makes a request to a server and waits for a response**. Hence, it's referred to as a request response protocol. Think of the request and the response as text messages, or strings, which follow a standard format that the other machine can understand._

_When you type a URL into the address bar of your web browser, you expect to see the website displayed in your browser. When you click on a link, or submit a form, your browser may display the next page, or display errors in your form so you can correct them and submit again. **Your browser is the interface or window**, through which you interact with the world wide web._

_Under your browser's hood lies a collection of files -- CSS, HTML, Javascript, videos, images, etc. -- that makes displaying the page possible. All these files were s**ent from a server to your browser, the client, by an application protocol called HTTP** (yes, this is why URLs in your browser address bar start with "http://")._

HTTP 是 web 的核心，也是动态 web 应用的核心。理解 HTTP 是理解现代 web 应用如何工作和如何构建的核心。它是一个规则系统，是一种协议，把应用程序和超文本文档之间的传输联系起来。换句话说，HTTP 就是机器之间彼此沟通的一个协议，或者说一个消息格式。
HTTP 遵循一个简单的模型：从客户端发出请求到服务器并等待响应。因此它也被认为是一种“请求--响应协议”。请求和响应都是文本信息，或者说是字符串，信息写法遵循着一个规则，能保证其他机器能够理解上面的内容。

当你在浏览器地址栏输入 URL 的时候，你希望看到在你的浏览器里显示这个网站。当你点了一个链接，或者提交了一个表单，你的浏览器可能会显示下一个页面，或者在你的表单中显示一些错误提示，以便你能纠正它们并再次提交。你的浏览器就是一个接口，或者说一扇窗，通过她你就可以与万维网进行互动与交互。

在你的浏览器的背后，有一堆文件 -- CSS，HTML，Javascript，视频文件，图片文件等等 -- 这些文件构成了你所看到的页面。所有这些东西都是通过一个叫做 HTTP 的传输协议从**服务器**传输到你的浏览器，也就是**客户端**里（所以你现在知道为什么在浏览器地址栏输地址的时候前面加的是  `http://`  了吧）。[^1]

### _Web Server_

A computer that can satisfy requests on the Web.

"server" is also used to refer to the software running on the computer

### _Client_

Send Request to web servers. **The computer that accesses a server.**

最常见的客户端是你每天与之交互，被称为 Web 浏览器的应用程序。Web 浏览器常见的有 Internet Explorer、 火狐、 Safari，包括移动版本。Web 浏览器的职责是发送 HTTP 请求，并将响应处理成人类友好的形式显示在你的显示器上。web 浏览器并不是唯一的客户端，有很多工具或者应用都能发送 HTTP 请求。

你的请求的内容最终的接收者是被称为服务器的远程计算机。服务器也没啥神秘的，就是处理请求的设备，它们的工作就是发送一个响应回去。通常情况下，服务器发送回去的响应里面都包含了请求中指定的一些数据。

![client_and_server](https://box.kancloud.cn/2015-07-17_55a89c9326c39.png)

### 资源 (Resources)

资源是一个通用术语，指的是互联网上你通过 URL 与其交互的东西。包括了图片，视频，网页和其他文件。资源并不限于文件或者网页。资源也可能是一个软件，一个炒股的软件，一个游戏。互联网上有无数的资源。

![resources](https://box.kancloud.cn/2015-07-17_55a89c981e86c.png)

## 无状态的 (statelessness)

当一个协议设计成每一个请求/响应周期与前一个都是互相独立的话，我们就说这个协议是无状态的。对于 HTTP 要知道的一点就是，无状态协议对于服务器资源和易用性的影响。HTTP 协议下，服务器不需要在各次请求之间保留状态信息。结果就是如果一次请求出了问题，系统不必做任何清理。以上两个原因让 HTTP 协议变的很灵活，但同时也变的很难构建有状态的应用。因为 HTTP 本质上是个无状态的互联网协议，这就意味着 web 开发人员在构建有状态应用的时候，不得不努力想办法来模拟 web 应用中的有状态体验。 举个例子，当你上 Facebook 的时候，你先登录，然后你看到了一个 Facebook 的网页。这就是一个完整的请求/响应周期。你点了一张照片 -- 另一个请求/响应周期 -- 但是在第二个动作之后你并没有退出登录。如果 HTTP 是无状态的，它是怎么维持状态并且知道你刚刚已经登录过了呢？事实上，如果 HTTP 是无状态的，Facebook 是怎么知道哪个请求是你发出的？它是怎么区分你和其他用户的？这些都是 web 开发人员和 web 开发框架耍的小诡计，让 web 应用看起来像是有状态的，不过这些小诡计不在本书的讨论范围内。你所要记住的就是，尽管你觉得这个应用是有状态的，但是在它背后，这个 web 应用是构建在 HTTP，一个无状态协议之上的。以上，就是为什么 web 如此灵活和去中心化，同时又特别难控制，也是为什么 web 的安全性难以保证，为什么在 web 上构建应用不是易事。[^2]







---

## Reference

[^1]: [《HTTP 下午茶》](https://www.kancloud.cn/kancloud/tealeaf-http/43832)
[^2]: 《HTTP下午茶》

