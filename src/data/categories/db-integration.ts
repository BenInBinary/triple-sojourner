import { Question } from '../../types';

export const dbIntegrationQuestions: Question[] = [
  {
    id: 'db-41',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'How do you connect Node.js to a MongoDB database?',
    requiresCode: true,
    idealAnswer: "Usually via the official `mongodb` driver or an ODM like `mongoose`. Establishing a connection using the `mongoose.connect()` string returning a Promise.",
    realLifeScenario: "Connecting an Express backend to a cloud-hosted MongoDB Atlas cluster securely managed via connection strings stored in .env variables.",
    codingExample: "import mongoose from 'mongoose';\nawait mongoose.connect(process.env.MONGO_URI);\nconsole.log('Connected to DB');"
  },
  {
    id: 'db-42',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'What is the difference between SQL and NoSQL databases?',
    requiresCode: false,
    idealAnswer: "SQL databases are relational, structured via rigid schemas, and scale vertically. NoSQL databases are non-relational, document-based/key-value, have dynamic schemas, and scale horizontally.",
    realLifeScenario: "Using SQL (PostgreSQL) for a financial ledger requiring tight ACID compliance, while using NoSQL (MongoDB) for unstructured, rapidly changing e-commerce product catalogs.",
    codingExample: "SQL: SELECT * FROM users JOIN orders ON user.id = order.userId;\nNoSQL: db.users.aggregate([{ $lookup: { from: 'orders', localField: '_id', foreignField: 'userId', as: 'userOrders' } }])"
  },
  {
    id: 'db-43',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'How do you optimize database queries in Node.js?',
    requiresCode: false,
    idealAnswer: "To optimize, create appropriate indexes on queried fields, use pagination (limit/offset or cursors), avoid SELECT *, only fetch necessary fields (Projection), and utilize connection polling.",
    realLifeScenario: "A query searching for users by `email` takes 5 seconds on a 10-million row table. By adding an Index on the `email` column, the query drops to 5ms.",
    codingExample: "db.collection.createIndex({ email: 1 });\n// Mongoose projection\nUser.find({}, 'name email').limit(10);"
  },
  {
    id: 'db-44',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'What are the benefits of using DynamoDB over other databases?',
    requiresCode: false,
    idealAnswer: "It is a fully managed Serverless NoSQL offering single-digit millisecond latency at any scale. It requires zero maintenance, handles multi-region replication natively, and pays-per-request.",
    realLifeScenario: "A gaming backend needing to save player state for millions of concurrent users globally with ultra-low latency without managing physical database shards or clusters.",
    codingExample: "const dynamodb = new AWS.DynamoDB.DocumentClient();\nawait dynamodb.get({ TableName: 'Users', Key: { id } }).promise();"
  },
  {
    id: 'db-45',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'How do you handle transactions in MongoDB or MySQL?',
    requiresCode: true,
    idealAnswer: "Transactions ensure ACID properties. In MySQL, you use BEGIN, COMMIT, or ROLLBACK. In MongoDB (v4+), you use Sessions to perform multi-document operations atomically.",
    realLifeScenario: "A banking app transferring $100 from Account A to Account B. If the DB crashes after withdrawing from A but before depositing to B, a transaction guarantees the entire operation rolls back to prevent money loss.",
    codingExample: "const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await A.updateOne({$inc:{bal:-100}}, {session});\n  await B.updateOne({$inc:{bal:100}},  {session});\n  await session.commitTransaction();\n} catch { session.abortTransaction(); }"
  },
  {
    id: 'db-46',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'What is the difference between populate and aggregate in Mongoose?',
    requiresCode: true,
    idealAnswer: "Populate is a Mongoose syntactic sugar that runs a second query to fetch referenced documents. Aggregate uses native MongoDB pipelines to perform complex joins, grouping, and filtering natively on the DB server.",
    realLifeScenario: "Populate is fine for fetching a User's linked Profile. Aggregate is essential for calculating the total sales revenue grouped by month across a 50GB Orders collection.",
    codingExample: "// Populate\nPost.find().populate('author');\n// Aggregate\nOrder.aggregate([{ $group: { _id: '$userId', total: { $sum: '$amount' } } }]);"
  },
  {
    id: 'db-47',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'How do you implement caching in a database-driven application?',
    requiresCode: true,
    idealAnswer: "Usually by introducing an in-memory datastore like Redis. Before querying the DB, the app checks Redis. If missed, it hits the DB, saves the result to Redis with a TTL, and returns it.",
    realLifeScenario: "An API serving stock prices. Instead of hitting the SQL DB 10,000 times a second, hitting Redis returns data in microseconds, preventing database meltdown under load.",
    codingExample: "const cached = await redis.get('user:1');\nif(cached) return JSON.parse(cached);\nconst user = await DB.query('SELECT * WHERE id=1');\nredis.set('user:1', JSON.stringify(user), 'EX', 3600);"
  },
  {
    id: 'db-48',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'What is the CAP theorem, and how does it relate to database design?',
    requiresCode: false,
    idealAnswer: "CAP stands for Consistency, Availability, and Partition Tolerance. A distributed data store can only simultaneously guarantee two out of the three. Most NoSQL systems prioritize AP (Available/Partitioned) over strict Consistency.",
    realLifeScenario: "Designing a massive social media feed. If a network partition occurs between data centers, user feeds stay Available (showing slightly stale data) rather than throwing 500 errors to maintain perfect Consistency.",
    codingExample: "// Relational (SQL) = CA (Consistency, Availability)\n// NoSQL (Cassandra/Dynamo) = AP (Availability, Partition Tolerance)"
  },
  {
    id: 'db-49',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'How do you secure database connections?',
    requiresCode: false,
    idealAnswer: "Always use SSL/TLS encryption for transit (connection strings starting with `mongodb+srv` or enforcing SSL via knex). Use strong passwords/IAM auth, whitelist specific IPs to access the DB, and place the DB inside a Private VPC.",
    realLifeScenario: "Ensuring an Express server hosted on EC2 can securely talk to an RDS PostgreSQL instance without exposing the RDS instance directly to the public internet.",
    codingExample: "const pool = new Pool({\n  connectionString: process.env.DB_URL,\n  ssl: { rejectUnauthorized: false }\n});"
  },
  {
    id: 'db-50',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'How do you perform migrations in a database-driven project?',
    requiresCode: true,
    idealAnswer: "By using migration tools (like Knex, TypeORM, Prisma, etc.) that manage schema files tracking versions sequentially (Up/Down functions), running them as part of the CI/CD pipeline deployment.",
    realLifeScenario: "You need to add a `birthdate` column to the `users` table without destroying existing data. You write an `Up` migration to ALTER the table entirely programmatically.",
    codingExample: "exports.up = function(knex) {\n  return knex.schema.alterTable('users', t => {\n    t.date('birthdate');\n  });\n};\nexports.down = function(knex) { return knex.schema... }"
  }
];
