import { Question } from '../../types';

export const nodejsQuestions: Question[] = [
  {
    id: 'nodejs-11',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'What is the difference between synchronous and asynchronous programming in Node.js?',
    requiresCode: true,
    idealAnswer: "Synchronous blocks the execution thread until the task completes. Asynchronous delegates the task to the system, allowing the thread to continue processing other requests.",
    realLifeScenario: "Reading a massive 2GB log file asynchronously allows a Node web server to keep responding to other HTTP requests instead of hanging for everyone.",
    codingExample: "import fs from 'node:fs/promises';\n// Async\nasync function readFile() {\n  const data = await fs.readFile('data.txt');\n  console.log(data);\n}"
  },
  {
    id: 'nodejs-12',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'How does the event loop work in Node.js?',
    requiresCode: false,
    idealAnswer: "The event loop has phases (Timers, Pending Callbacks, Poll, Check, Close Callbacks). It coordinates the execution of callbacks pushed from the thread pool or OS kernels.",
    realLifeScenario: "When a database query finishes, its callback enters the Event Loop's Poll phase, ensuring the Node.js single thread knows what to execute next.",
    codingExample: "setTimeout(() => console.log('Timer'), 0);\nsetImmediate(() => console.log('Check'));\n// The Check phase runs before the next Timers phase."
  },
  {
    id: 'nodejs-13',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'Explain the use of streams in Node.js.',
    requiresCode: true,
    idealAnswer: "Streams process data piece by piece (chunks) instead of loading the whole payload into memory. Types: Readable, Writable, Duplex, Transform.",
    realLifeScenario: "Streaming a 4K video from a backend server to a client directly, dramatically reducing RAM usage since only small chunks exist in memory at once.",
    codingExample: "import { createReadStream, createWriteStream } from 'node:fs';\nconst readStr = createReadStream('large.mp4');\nconst writeStr = createWriteStream('copy.mp4');\nreadStr.pipe(writeStr);"
  },
  {
    id: 'nodejs-14',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'How do you handle error management in Node.js?',
    requiresCode: false,
    idealAnswer: "Using try/catch for async/await, centralized error handling middleware in Express, process event listeners for uncaught exceptions, and properly wrapping Promises.",
    realLifeScenario: "A centralized error handler that catches API errors, formats them into a standard JSON response with HTTP codes, and sends a log to Sentry.",
    codingExample: "app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).send({ error: 'Something broke!' });\n});"
  },
  {
    id: 'nodejs-15',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'What is middleware in Express.js? How do you use it?',
    requiresCode: true,
    idealAnswer: "Middleware are functions that have access to the req, res, and next() function in the request-response cycle. They can modify requests or end the cycle early.",
    realLifeScenario: "Authentication middleware that checks a JWT token. If valid, it adds `req.user` and calls next(). If invalid, it returns 401 Unauthorized instantly.",
    codingExample: "const auth = (req, res, next) => {\n  if(!req.headers.authorization) return res.status(401).send();\n  next();\n};\napp.get('/dashboard', auth, (req, res) => res.send('Secret Area'));"
  },
  {
    id: 'nodejs-16',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'How do you optimize the performance of a Node.js application?',
    requiresCode: false,
    idealAnswer: "Use Clustering/PM2 for multi-core usage, Redis caching, proper indexing in the DB, avoiding sync functions, gzip compression, and using streams for massive payloads.",
    realLifeScenario: "A high-traffic e-commerce API failing under load. Implementing Redis to cache the homepage product listing drops response times from 300ms to 15ms.",
    codingExample: "// PM2 configuration for zero-downtime clustering\nmodule.exports = {\n  apps : [{\n    name: 'api',\n    script: 'app.js',\n    instances: 'max',\n    exec_mode: 'cluster'\n  }]\n}"
  },
  {
    id: 'nodejs-17',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'Explain the role of the EventEmitter class in Node.js.',
    requiresCode: true,
    idealAnswer: "EventEmitter facilitates the Observer pattern. It allows objects to trigger custom events and attach listener functions that react to those events asynchronously.",
    realLifeScenario: "A web scraper class extending EventEmitter. As it scrapes, it emits 'pageFetched' events, allowing decoupled analytics services to listen and track progress.",
    codingExample: "import { EventEmitter } from 'node:events';\nconst emitter = new EventEmitter();\nemitter.on('login', user => console.log('Welcome', user));\nemitter.emit('login', 'Alice');"
  },
  {
    id: 'nodejs-18',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'How do you handle authentication and authorization in a Node.js application?',
    requiresCode: false,
    idealAnswer: "Authentication typically uses JWTs or session cookies. Authorization verifies if the authenticated user has the necessary Role-Based Access Control (RBAC) privileges.",
    realLifeScenario: "An Admin Dashboard route where middleware first decodes the JWT (Authentication) and then checks if `user.role === 'ADMIN'` (Authorization).",
    codingExample: "const roleCheck = (role) => (req, res, next) => {\n  if (req.user.role !== role) return res.status(403).send('Forbidden');\n  next();\n};"
  },
  {
    id: 'nodejs-19',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'What are worker threads in Node.js, and when would you use them?',
    requiresCode: true,
    idealAnswer: "Worker threads allow execution of CPU-intensive JavaScript blocks in parallel without blocking the main event loop. They share memory via SharedArrayBuffer.",
    realLifeScenario: "Generating a massive PDF report or hashing millions of passwords. Doing this on the main thread would freeze the API for other users.",
    codingExample: "import { Worker } from 'node:worker_threads';\nconst worker = new Worker('./hash-worker.js');\nworker.on('message', hash => console.log('Hashed:', hash));"
  },
  {
    id: 'nodejs-20',
    categoryId: 'nodejs',
    categoryName: 'Node.js',
    text: 'How do you manage environment variables in Node.js?',
    requiresCode: false,
    idealAnswer: "By storing secrets outside the codebase in a `.env` file, reading them via `process.env`, and using tools like `dotenv` for local dev.",
    realLifeScenario: "Ensuring your production database password isn't checked into GitHub. The production CI/CD server injects the actual password securely at deployment time.",
    codingExample: "import 'dotenv/config';\nconst port = process.env.PORT || 3000;\nconst dbUrl = process.env.DATABASE_URL;"
  }
];
