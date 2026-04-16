import { Question } from '../../types';

export const securityQuestions: Question[] = [
  {
    id: 'sec-71',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'How do you handle security in a Node.js application?',
    requiresCode: false,
    idealAnswer: "By implementing secure HTTP headers (Helmet), validating/sanitizing inputs (Joi/Validator), utilizing parameterized queries against SQL Injection, hashing passwords (Bcrypt/Argon2), applying rate limiting, and securely handling authentication tokens (HttpOnly Cookies).",
    realLifeScenario: "Preventing a massive data breach. Utilizing `helmet` disables the `X-Powered-By: Express` header, masking the underlying technology stack from automated vulnerability scanners entirely.",
    codingExample: "import helmet from 'helmet';\napp.use(helmet());\napp.disable('x-powered-by');"
  },
  {
    id: 'sec-72',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'What is OWASP, and how does it apply to fullstack development?',
    requiresCode: false,
    idealAnswer: "The Open Worldwide Application Security Project (OWASP) provides a Top 10 list of the most critical security risks (e.g., Broken Access Control, Cryptographic Failures, Injection). It serves as the primary checklist for fullstack engineers to audit their apps against.",
    realLifeScenario: "Applying OWASP Top 10 #1 (Broken Access Control) checks to ensure that User A cannot modify the URL from `/orders/1` to `/orders/2` and view User B's private invoice data.",
    codingExample: "const order = await Order.findById(req.params.id);\nif (order.userId.toString() !== req.user.id) {\n  throw new Error('Unauthorized Action'); \n}"
  },
  {
    id: 'sec-73',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'How do you secure API keys and secrets in an application?',
    requiresCode: false,
    idealAnswer: "Never hardcoding them in source code. Injecting them securely at runtime via `.env` files locally, or using secure vaults like AWS Secrets Manager or HashiCorp Vault in production. Committing `.env` to Git is a critical failure.",
    realLifeScenario: "Instead of putting the Stripe Secret Key directly into the codebase, the Node app requests the AWS Secrets Manager via an IAM Role at boot time, caching the key purely in internal RAM.",
    codingExample: "import SecretsManager from 'aws-sdk/clients/secretsmanager';\nconst client = new SecretsManager();\nconst secret = await client.getSecretValue({SecretId: 'PROD_STRIPE_KEY'}).promise();"
  },
  {
    id: 'sec-74',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'How do you implement role-based access control (RBAC)?',
    requiresCode: true,
    idealAnswer: "By assigning roles (e.g., 'admin', 'editor', 'user') directly to user accounts in the auth layer. Backend API middleware subsequently verifies the decoded JWT role matches the required permission scope of the endpoint.",
    realLifeScenario: "A blogging platform where only standard Users can 'Comment', but Editors can 'Publish', and Admins can 'Delete Users'. Middleware intercepts the HTTP request rejecting standard users from hitting `DELETE /users`.",
    codingExample: "const authorize = (roles = []) => (req, res, next) => {\n  if (!roles.includes(req.user.role)) return res.status(403).json('Forbidden');\n  next();\n};\napp.delete('/users/:id', authorize(['admin']), deleteUser);"
  },
  {
    id: 'sec-75',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'What are the best practices for securing React applications?',
    requiresCode: false,
    idealAnswer: "Avoiding manual DOM manipulation (`dangerouslySetInnerHTML`), never securely storing JWTs directly in `localStorage` if vulnerable to XSS (prefer HttpOnly cookies instead), stripping sensitive data from initial Redux state, and avoiding `eval()`.",
    realLifeScenario: "A Hacker attempts XSS by making their username `<script>stealCookie()</script>`. React's native string interpolation `{user.name}` automatically escapes the tags securely into literal safe text rendering.",
    codingExample: "const userBio = \"<img src=x onerror=alert('hack')>\";\n// Safe (React escapes this): <div>{userBio}</div>\n// UNSAFE: <div dangerouslySetInnerHTML={{ __html: userBio }} />"
  },
  {
    id: 'sec-76',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'How do you prevent SQL injection in a Node.js application?',
    requiresCode: true,
    idealAnswer: "Strictly by using Parameterized Queries or Prepared Statements, and utilizing ORMs/Query Builders (like Prisma, Knex) which serialize user inputs accurately before hitting the backend SQL engine.",
    realLifeScenario: "A user submitting `admin'; DROP TABLE Users;--` into the username field. Without parameterization, this permanently deletes the database. With parameterization, the DB safely searches for a user literally named `admin'; DROP...`",
    codingExample: "const username = req.body.user;\n// VULNERABLE: client.query(`SELECT * FROM users WHERE name = '${username}'`);\n// SECURE:\nclient.query('SELECT * FROM users WHERE name = $1', [username]);"
  },
  {
    id: 'sec-77',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'What is XSS, and how do you protect against it?',
    requiresCode: true,
    idealAnswer: "Cross-Site Scripting (XSS) occurs when an application includes untrusted data in a browser indiscriminately. Protect by utilizing Content-Security-Policy (CSP) headers, escaping all dynamically generated HTML content, and using secure frameworks like React.",
    realLifeScenario: "Preventing inline executing scripts indiscriminately loaded via an infected CDN by rigidly defining a CSP header allowing scripts ONLY definitively hosted via `self` or trusted domains.",
    codingExample: "app.use(helmet.contentSecurityPolicy({\n  directives: {\n    defaultSrc: [\"'self'\"],\n    scriptSrc: [\"'self'\", \"trusted-cdn.com\"]\n  }\n}));"
  },
  {
    id: 'sec-78',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'How do you secure communication between microservices?',
    requiresCode: false,
    idealAnswer: "By implementing mutual TLS (mTLS) to encrypt payload traffic fundamentally within internal VPC networks securely, using service meshes (like Istio), or strictly verifying internal JWT/IAM tokens dynamically.",
    realLifeScenario: "Ensuring the `Payments` internal microservice only strictly ever accepts traffic securely originating identically from the `Orders` internal microservice, completely ignoring unauthorized direct curl requests from within the wider VPC network.",
    codingExample: "An Istio Service Mesh automatically upgrades pure HTTP traffic internally communicating between microservice pods distinctly wrapping them natively with mTLS sidecars."
  },
  {
    id: 'sec-79',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'What is the principle of least privilege, and how do you apply it in AWS?',
    requiresCode: true,
    idealAnswer: "Granting a user or system entity purely the exceedingly minimum tightly scoped permissions strictly theoretically necessary fundamentally to effectively perform their definitively assigned exact task, completely forbidding excessive wildcard `*` privileges.",
    realLifeScenario: "Instead of definitively attaching `AmazonS3FullAccess` systematically to a Lambda identically resizing images securely, creating a rigid custom IAM Policy absolutely restricting standard PutObject access comprehensively entirely natively purely to the exact destination `bucket`. ",
    codingExample: "{\n \"Effect\": \"Allow\",\n \"Action\": [\"s3:PutObject\"],\n \"Resource\": \"arn:aws:s3:::my-destination-bucket/images/*\"\n}"
  },
  {
    id: 'sec-80',
    categoryId: 'security',
    categoryName: 'Security',
    text: 'How do you set up logging and monitoring for security purposes?',
    requiresCode: false,
    idealAnswer: "By systematically capturing detailed audit trails containing IP addresses, Timestamps, and Action metadata securely utilizing centralized logging repositories inherently like ELK Stack or Datadog seamlessly parsing WAF and API logs distinctly securely.",
    realLifeScenario: "Detecting securely fundamentally anomalous definitively rapid authentication fundamentally failing requests identical originating strictly from a singular distinctly foreign IP aggressively and dynamically seamlessly definitively triggering PagerDuty SOC reliably alerts.",
    codingExample: "import winston from 'winston';\nconst logger = winston.createLogger({ transports: [new winston.transports.File({ filename: 'audit.log' })] });\nlogger.info({ user: req.user.id, action: 'DOWNLOAD_REPORT', ip: req.ip });"
  }
];
