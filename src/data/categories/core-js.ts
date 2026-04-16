import { Question } from '../../types';

export const coreJsQuestions: Question[] = [
  {
    id: 'core-js-1',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'What are the differences between var, let, and const?',
    requiresCode: false,
    idealAnswer: "var is function-scoped and allows redeclaration. let is block-scoped and allows reassignment but not redeclaration. const is block-scoped and prevents reassignment. Modern JS prefers let and const.",
    realLifeScenario: "Use const for configuration variables like API endpoints and let for loop counters. Avoid var entirely to prevent bugs due to variable hoisting.",
    codingExample: "const API_URL = 'https://api.example.com';\nlet retryCount = 0;\nif (true) {\n  let blockScoped = 'hidden';\n}"
  },
  {
    id: 'core-js-2',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'Explain closures in JavaScript with an example.',
    requiresCode: true,
    idealAnswer: "A closure is a function that remembers its outer variables and can access them, even after the outer function has returned. It forms a lexical environment.",
    realLifeScenario: "Closures are heavily used in React Hooks (like useEffect) to maintain state, or when creating private variables in module patterns.",
    codingExample: "function makeCounter() {\n  let count = 0;\n  return function() { return count++; };\n}\nconst counter = makeCounter();\nconsole.log(counter()); // 0"
  },
  {
    id: 'core-js-3',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'What are JavaScript promises? How do you use them?',
    requiresCode: true,
    idealAnswer: "A Promise represents the eventual completion (or failure) of an asynchronous operation. It has three states: Pending, Fulfilled, and Rejected.",
    realLifeScenario: "Fetching user data from a remote server without blocking the main UI thread.",
    codingExample: "fetch('/api/user')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));"
  },
  {
    id: 'core-js-4',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'How does the async/await syntax work?',
    requiresCode: true,
    idealAnswer: "async/await is syntactic sugar over Promises. 'async' makes a function return a Promise. 'await' makes JavaScript pause execution until the Promise settles.",
    realLifeScenario: "Executing sequential asynchronous API calls where the second request depends on the result of the first.",
    codingExample: "async function getUser() {\n  try {\n    const res = await fetch('/api/user');\n    const data = await res.json();\n    return data;\n  } catch(err) {\n    console.error(err);\n  }\n}"
  },
  {
    id: 'core-js-5',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'What are JavaScript ES6 features you have used extensively?',
    requiresCode: false,
    idealAnswer: "Key features include Arrow Functions, Destructuring, Template Literals, Spread/Rest operators, Promises, Modules, and Classes.",
    realLifeScenario: "Using destructuring to cleanly extract props in a React component or spreading an object to update state immutably.",
    codingExample: "const { name, age } = user;\nconst updatedUser = { ...user, age: 30 };\nconst greet = () => `Hello ${name}`;"
  },
  {
    id: 'core-js-6',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'What is the difference between shallow and deep copies in JavaScript?',
    requiresCode: true,
    idealAnswer: "A shallow copy duplicates the top-level properties; nested objects still share references. A deep copy recursively duplicates everything.",
    realLifeScenario: "When copying a configuration object and modifying a nested array. If shallow copied, the original configuration array will be mutated, causing side effects.",
    codingExample: "// Shallow\nconst shallow = { ...obj };\n// Deep\nconst deep = structuredClone(obj);"
  },
  {
    id: 'core-js-7',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'Explain the concept of event delegation.',
    requiresCode: true,
    idealAnswer: "Adding a single event listener to a parent element instead of multiple listeners to children. It relies on event bubbling.",
    realLifeScenario: "Handling click events on a dynamically generated list of 1000 items (e.g., a Twitter feed). Instead of 1000 listeners, you attach 1 to the <ul>.",
    codingExample: "document.querySelector('#list').addEventListener('click', (e) => {\n  if(e.target.tagName === 'LI') {\n    console.log('Clicked', e.target.textContent);\n  }\n});"
  },
  {
    id: 'core-js-8',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'How does the prototype chain work in JavaScript?',
    requiresCode: false,
    idealAnswer: "When accessing a property, JS looks at the object itself. If not found, it traverses up the `__proto__` linked list until it finds it or reaches null.",
    realLifeScenario: "Array methods like .map() or .filter() don't exist on every array instance. They exist on Array.prototype, saving memory across thousands of arrays.",
    codingExample: "const arr = [];\n// arr doesn't have push directly, it inherits from Array.prototype\narr.push(1);"
  },
  {
    id: 'core-js-9',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'What is the difference between bind, call, and apply?',
    requiresCode: true,
    idealAnswer: "All manipulate the 'this' context. call() invokes immediately with comma-separated args. apply() invokes immediately with an array of args. bind() returns a new function to be invoked later.",
    realLifeScenario: "Using `.bind()` in a React class component constructor to ensure an event handler maintains the correct 'this' context.",
    codingExample: "function greet(greeting) { console.log(greeting, this.name); }\ngreet.call({name: 'Alice'}, 'Hi');\ngreet.apply({name: 'Charlie'}, ['Hey']);\nconst boundGreet = greet.bind({name: 'Bob'});\nboundGreet('Hello');"
  },
  {
    id: 'core-js-10',
    categoryId: 'core-js',
    categoryName: 'Core JavaScript',
    text: 'How do you handle memory leaks in JavaScript?',
    requiresCode: false,
    idealAnswer: "Avoid global variables, detach event listeners when elements are removed, manage closures carefully, and clear intervals/timeouts when unmounting.",
    realLifeScenario: "A Single Page Application (SPA) where navigating away from a Dashboard without calling clearInterval causes the timer to persist and eat RAM.",
    codingExample: "useEffect(() => {\n  const id = setInterval(() => {}, 1000);\n  return () => clearInterval(id); // Cleanup prevents leak\n}, []);"
  }
];
