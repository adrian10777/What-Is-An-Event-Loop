// https://www.youtube.com/watch?v=8aGhZQkoFbQ


// WHAT IS AN EVENT LOOP?

//  What is JS?
    // ans: JS is a single -threaded non-blocking asynchronous concurrent language

// JS has a call stack, an event loop. A callback queue some other apis and stuff

//If we look at the JS runtime itself like v8 which is the Runtime inside chrome

//JS runtime
    //heap = where memory allocation happens
    // callstack = where stack frames are

// v8 is googles open source high performance JS and Web Assembly engine written in c++. it is used in
    // chrome and in Node.js. It implements ECMAScript and WebAssembly

// if you clone the v8 code base and grep for things like setTimeout or DOM or HTTP requests, they're not in there

// We have the v8 runtime but then we have these things called web APIs which are extra things that
    // the browser provides DOM, AJAX, setTimeout

// What is AJAX?
//Asynchronous JavaScript And XML
// AJAX uses a combo of: a browser built-in XMLHtppRequest object (to request data from a web browser)
    // and JS/  HTML DOM ( to display or use the data)


// We have this mythical event loop and callback queue

// THE CALL STACK

//JS is a single threaded programming Language, single threated Runtime which means it has a single call stack
    // a single thread means it can do one thing at a time (run 1 piece of code at a time)

// Call Stack is a data structure which records basically where in the program we are, if we step into 
    // a function, we put something on to the stack, if we return from a function, we pop off the top of the stack

function multiply(a,b) {
    return a * b;
}

function square(n) {
    return multiply(n, n);
}

function printSquare(n) {
    var squared = square(n);
    console.log(squared);
}

printSquare(4);

// printSquare is a function call so we push that on to the stack
    // then immediately inside printSquare we are going to call square(n)
    // then multiply(n, n) gets pushed onto stack
    // when we get to multiply we are returning so we are pushing off the stack
    // after going through all returns call stack is left empty

function foo() {
    throw new Error('Oops');
}

function bar() {
    foo();
}

function baz() {
    bar();
}

baz();

// this^, gives u an error that says
/*
Uncaught Error: oops!
foo
bar
baz
(anonymous function)
*/

// seems to be going from bottom to top

// What happens when things are slow?

//Blocking -> just code that is slow
// console.log is not slow
//while loop from 1 to 1 billion is slow, network requests are slow, image requests are slow, image processing is slow


// in a programming language that is single threaded you're not using threads like say Ruby,
    // we make network requests until its done no way to handle that

// Why is this a prob? because we are running code in browsers

// So how do we avoid blocking the stack to provide people with nice fluid UI's?
    // simplest solution is asynchronous callbacks
//

console.log('hi'); //runs 1st

setTimeout(function () { 
    console.log('there');
}, 5000);
//runs last

console.log('JSConfEU'); // runs 2nd

// We can only do 1 thing at a time with JS runtime, u cant make an AJAX request while doing other code
    // it cant do a setTimeout while you are doing other code

//The reason we can do things concurrently is because browser is more than just the runtime

// The JS runtime can do 1 thing at a time, but browser gives us these web APIS, the are
    // these are effectively threads that u can access like u can just make calls to, and those pieces of the
    // browser are aware of this concurrency kicks in.

// event loop is like the simplest little piece in this whole equation, and it has 1 simple
    // job. Its job is to look stack and look at the task queue.
    // If the stack is empty it takes the 1st thing on the queue and pushes it on to the stack
    // which effectively runs it.

//Callback functions
    // callbacks can be any func that any other func calls
    // or it can be a aynchronous callback, one that gets pushed back on the callback queue in the future

// putting code to animate or image processors in the call stack makes the ui sluggish

// Flooding the callback queue can also make the website slow when u trigger all these callbacks

// 