import { Question } from '../../types';

export const apiQuestions: Question[] = [
  {
    id: 'api-51',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'How do you design RESTful APIs?',
    requiresCode: false,
    idealAnswer: "By treating entities as resources (nouns), using standard HTTP methods (GET, POST, PUT, DELETE) for CRUD operations, utilizing stateless communication, standardizing JSON payloads, and using proper HTTP status codes (200, 201, 400, 404).",
    realLifeScenario: "Designing an endpoint to update a user's email. Instead of `POST /updateUserEmail`, use `PUT /users/:id` or `PATCH /users/:id` with the email in the request body.",
    codingExample: "// REST Best Practice\napp.get('/api/users/:id', getUser);\napp.post('/api/users', createUser);\napp.put('/api/users/:id', updateUser);\napp.delete('/api/users/:id', deleteUser);"
  },
  {
    id: 'api-52',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'What is the difference between REST and GraphQL?',
    requiresCode: false,
    idealAnswer: "REST exposes multiple endpoints for different resources, often leading to over-fetching or under-fetching of data. GraphQL exposes a single endpoint, allowing clients to query exactly the specific fields and nested relationships they need.",
    realLifeScenario: "A mobile app needs a user's name and their top 3 recent posts. In REST, this might require 2 endpoints or fetching giant payloads. In GraphQL, the client constructs a query explicitly requesting exactly what is needed, saving bandwidth.",
    codingExample: "query {\n  user(id: 1) {\n    name\n    posts(limit: 3) { title }\n  }\n}"
  },
  {
    id: 'api-53',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'How do you implement authentication in an API?',
    requiresCode: true,
    idealAnswer: "Most commonly using JSON Web Tokens (JWT). The client logs in, receives a signed JWT, and sends the JWT in the `Authorization: Bearer <token>` header for subsequent requests. The API verifies the signature middleware.",
    realLifeScenario: "A React SPA logs in against a Node API. Node authenticates credentials, signs a JWT with user data (`{id: 1, role: 'user'}`), and React stores it securely to send with subsequent restricted API calls.",
    codingExample: "const verifyToken = (req, res, next) => {\n  const token = req.headers['authorization'].split(' ')[1];\n  jwt.verify(token, process.env.SECRET, (err, decoded) => {\n    if(err) return res.status(403).send();\n    req.user = decoded;\n    next();\n  });\n};"
  },
  {
    id: 'api-54',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'What is rate-limiting, and how do you implement it in an API?',
    requiresCode: true,
    idealAnswer: "Rate-limiting controls the number of requests a single IP or API Key can make in a given timeframe to prevent abuse, DDoS attacks, or brute force attempts. Easily implemented using libraries like `express-rate-limit`.",
    realLifeScenario: "Preventing brute force login attacks. An attacker tries 5,000 passwords a minute. Rate-limiting restricts the `/login` route to 5 requests per 15 minutes per IP address.",
    codingExample: "import rateLimit from 'express-rate-limit';\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5,\n  message: 'Too many login attempts.'\n});\napp.use('/login', loginLimiter);"
  },
  {
    id: 'api-55',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'How do you handle versioning in APIs?',
    requiresCode: false,
    idealAnswer: "Usually via the URL path (e.g., `/api/v1/users`), via Headers (`Accept: application/vnd.company.v1+json`), or as query parameters. Path versioning is the most common and explicit mechanism.",
    realLifeScenario: "You need to change the data structure returned by an endpoint drastically. Instead of breaking older mobile app versions, you release `/api/v2/products` while continuing to maintain `/api/v1/products` for legacy clients.",
    codingExample: "app.use('/api/v1', require('./routes/v1'));\napp.use('/api/v2', require('./routes/v2'));"
  },
  {
    id: 'api-56',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'Explain CORS and how to handle it in a Node.js application.',
    requiresCode: true,
    idealAnswer: "Cross-Origin Resource Sharing (CORS) is a browser security feature preventing a webpage from making requests to a different domain than the one that served the webpage. Node servers must explicitly return `Access-Control-Allow-Origin` headers.",
    realLifeScenario: "Your frontend is hosted on `app.com` and backend on `api.com`. Browsers block fetch requests to `api.com` automatically unless the Node backend explicitly whitelists `app.com`.",
    codingExample: "import cors from 'cors';\napp.use(cors({\n  origin: 'https://app.com',\n  methods: ['GET', 'POST']\n}));"
  },
  {
    id: 'api-57',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'How do you test APIs using Postman or similar tools?',
    requiresCode: false,
    idealAnswer: "By defining Workspaces with collections of HTTP requests. You can inject environment variables (like API Keys or staging URLs), construct headers/bodies manually, and run automated assertion scripts in the 'Tests' tab.",
    realLifeScenario: "Testing an authenticated endpoint locally without requiring a React frontend. You run the `/login` request in Postman, an automated Postman script extracts the returned JWT and saves it as a collection variable, unlocking all subsequent requests.",
    codingExample: "// Example Postman Script (Tests tab)\npm.test(\"Status is 200\", () => {\n  pm.response.to.have.status(200);\n});\npm.environment.set(\"token\", pm.response.json().token);"
  },
  {
    id: 'api-58',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'What is gRPC, and how is it different from REST?',
    requiresCode: false,
    idealAnswer: "gRPC is an RPC framework created by Google that uses HTTP/2 for transport and Protocol Buffers (protobuf binary formats) instead of JSON. It offers highly efficient, serialized, strict-contract communication, much faster than JSON REST.",
    realLifeScenario: "Communication directly between internal microservices. While REST is fine for the client-facing API, backend Service A requesting massive data from Service B via gRPC yields a 10x performance boost.",
    codingExample: "// Protobuf Definition Example\nservice Greeter {\n  rpc SayHello (HelloRequest) returns (HelloReply) {}\n}"
  },
  {
    id: 'api-59',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'How do you handle file uploads in an API?',
    requiresCode: true,
    idealAnswer: "By parsing `multipart/form-data` request bodies. Tools like `multer` in Express parse the raw binary stream, optionally save the file to disk/memory temporarily, and yield it so it can be pushed to cloud storage like AWS S3.",
    realLifeScenario: "A user uploading a profile avatar. The browser submits a FormData payload. Node's Multer intercepts it, buffers the JPG into memory, maps it to an S3 bucket Uploadstream, and saves the resulting CDN URL to the database.",
    codingExample: "import multer from 'multer';\nconst upload = multer({ dest: 'uploads/' });\napp.post('/avatar', upload.single('image'), (req, res) => {\n  console.log(req.file.path);\n});"
  },
  {
    id: 'api-60',
    categoryId: 'api',
    categoryName: 'API Development and Integration',
    text: 'How do you secure APIs against attacks like CSRF and XSS?',
    requiresCode: false,
    idealAnswer: "For XSS: Never trust user input, sanitize all data before DB storage, and escape output in frontend components (React does this natively). For CSRF: Utilize Anti-CSRF tokens if using Cookies, or just rely on stateless JWT Authorization Headers which are inherently immune to CSRF.",
    realLifeScenario: "Preventing a script injection attack on a blog comments section. A hacker inputs `<script>alert(cookie)</script>`. React automatically escapes it to literal string `<script>` unless explicitly dangerouslySetInnerHTML is used.",
    codingExample: "import xss from 'xss-clean';\nimport helmet from 'helmet';\n// Sanitizes req.body, req.query\napp.use(xss());\n// Sets secure HTTP headers targeting XSS\napp.use(helmet());"
  }
];
