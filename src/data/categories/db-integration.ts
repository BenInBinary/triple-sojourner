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
  },
  {
    id: 'db-51',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to find all users who have placed more than 2 orders.',
    requiresCode: true,
    idealAnswer: "This is a classic GROUP BY with HAVING question. We join the users table with orders, group by user, and filter groups having count more than 2. HAVING filters after aggregation while WHERE filters before it. In production, make sure there is an index on orders.user_id for fast joins on large tables.",
    realLifeScenario: "An ecommerce admin dashboard wants to identify repeat customers who have ordered more than twice, so they can send loyalty discount emails or target them for premium membership offers.",
    codingExample: "-- Find users with more than 2 orders\nSELECT u.id, u.name, COUNT(o.id) AS order_count\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name\nHAVING COUNT(o.id) > 2\nORDER BY order_count DESC;"
  },
  {
    id: 'db-52',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to get the top 5 most expensive products in each category.',
    requiresCode: true,
    idealAnswer: "This needs a window function — ROW_NUMBER() or RANK(). We partition by category and order by price descending inside the window, then filter where rank is 5 or less. Window functions run after WHERE and GROUP BY in SQL execution order. Use RANK() if you want ties to share the same rank, or DENSE_RANK() if you want no gaps.",
    realLifeScenario: "A product listing page on Amazon or Flipkart showing the top premium products in each category like Electronics, Clothing, Books — so customers can quickly see the high-end options available.",
    codingExample: "-- Top 5 most expensive products per category using window function\nWITH ranked AS (\n  SELECT \n    p.id, p.name, p.price, p.category,\n    ROW_NUMBER() OVER (\n      PARTITION BY p.category \n      ORDER BY p.price DESC\n    ) AS rank\n  FROM products p\n)\nSELECT id, name, price, category\nFROM ranked\nWHERE rank <= 5\nORDER BY category, rank;"
  },
  {
    id: 'db-53',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to find all users who have NEVER placed an order.',
    requiresCode: true,
    idealAnswer: "This is about finding records with no match in another table. The best approaches are LEFT JOIN with NULL check, or NOT EXISTS subquery. LEFT JOIN returns all users — those without orders will have NULL in order columns. NOT EXISTS is often faster on large datasets because it can short-circuit once it finds one match. Avoid using NOT IN with nullable columns as it can give wrong results.",
    realLifeScenario: "A marketing team wants to send a special first-purchase discount email to all registered users who have never placed an order, to convert them from visitors to buyers.",
    codingExample: "-- Method 1: LEFT JOIN with NULL check\nSELECT u.id, u.name, u.email\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE o.id IS NULL;\n\n-- Method 2: NOT EXISTS (often faster)\nSELECT u.id, u.name, u.email\nFROM users u\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.user_id = u.id\n);"
  },
  {
    id: 'db-54',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to get total revenue per month for the year 2024.',
    requiresCode: true,
    idealAnswer: "We use DATE_TRUNC or EXTRACT to group orders by month, then SUM the total amount. DATE_TRUNC is PostgreSQL specific and gives cleaner output. For MySQL you would use DATE_FORMAT or YEAR/MONTH functions. Always filter the year in WHERE clause first so the database scans fewer rows before grouping.",
    realLifeScenario: "A finance team building a monthly revenue report dashboard to track business growth trends, identify seasonal patterns, and compare month-over-month performance for investor presentations.",
    codingExample: "-- PostgreSQL: Total revenue per month in 2024\nSELECT \n  DATE_TRUNC('month', created_at) AS month,\n  SUM(total_amount) AS revenue,\n  COUNT(*) AS total_orders\nFROM orders\nWHERE created_at >= '2024-01-01' \n  AND created_at < '2025-01-01'\nGROUP BY DATE_TRUNC('month', created_at)\nORDER BY month;\n\n-- MySQL version:\n-- SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total_amount) AS revenue\n-- FROM orders WHERE YEAR(created_at) = 2024\n-- GROUP BY DATE_FORMAT(created_at, '%Y-%m');"
  },
  {
    id: 'db-55',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to find products that are out of stock and have been ordered at least once.',
    requiresCode: true,
    idealAnswer: "We need products where stock equals zero AND the product exists in the order_items table. This combines a WHERE filter with an EXISTS or JOIN. This query is useful for restocking decisions — these are proven sellers that need immediate attention because customers want them but they are unavailable.",
    realLifeScenario: "An inventory management system flagging products that are out of stock but have proven demand — so the procurement team can prioritize restocking items that will actually sell rather than guessing.",
    codingExample: "-- Products out of stock but ordered at least once\nSELECT p.id, p.name, p.category\nFROM products p\nWHERE p.stock = 0\n  AND EXISTS (\n    SELECT 1 FROM order_items oi\n    WHERE oi.product_id = p.id\n  );\n\n-- Alternative with JOIN:\nSELECT DISTINCT p.id, p.name, p.category\nFROM products p\nINNER JOIN order_items oi ON p.id = oi.product_id\nWHERE p.stock = 0;"
  },
  {
    id: 'db-56',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to get the second highest priced product — without using LIMIT.',
    requiresCode: true,
    idealAnswer: "Without LIMIT, we use a subquery approach. Find the MAX price, then find the MAX price that is less than that maximum. Another approach is using a correlated subquery to count how many distinct prices are higher. This is a classic interview question testing your ability to think beyond basic syntax.",
    realLifeScenario: "A pricing analytics tool that needs to find the runner-up product in each price tier for competitive analysis, especially when the database engine or ORM does not support LIMIT easily in subqueries.",
    codingExample: "-- Method 1: Subquery with MAX\nSELECT MAX(price) AS second_highest\nFROM products\nWHERE price < (SELECT MAX(price) FROM products);\n\n-- Method 2: Get full product details\nSELECT *\nFROM products\nWHERE price = (\n  SELECT MAX(price) FROM products\n  WHERE price < (SELECT MAX(price) FROM products)\n);\n\n-- Method 3: Correlated subquery\nSELECT * FROM products p1\nWHERE 1 = (\n  SELECT COUNT(DISTINCT p2.price)\n  FROM products p2\n  WHERE p2.price > p1.price\n);"
  },
  {
    id: 'db-57',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to find duplicate email addresses in the users table.',
    requiresCode: true,
    idealAnswer: "Group by email and use HAVING COUNT > 1 to find duplicates. This is simple but powerful. To see which specific rows are duplicates, you can use a CTE or self-join. In production, you should prevent duplicates at the database level using a UNIQUE constraint on the email column rather than just checking after the fact.",
    realLifeScenario: "During a database cleanup or migration, the team discovers that the users table has no unique constraint on email and some users registered twice. You need to find and merge or remove these duplicate accounts.",
    codingExample: "-- Find duplicate emails with count\nSELECT email, COUNT(*) AS count\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- Find the actual duplicate rows with details\nSELECT u.*\nFROM users u\nINNER JOIN (\n  SELECT email FROM users\n  GROUP BY email HAVING COUNT(*) > 1\n) dup ON u.email = dup.email\nORDER BY u.email, u.created_at;\n\n-- Prevention: ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);"
  },
  {
    id: 'db-58',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to show each user\'s name, total orders, and total amount spent — even if they have zero orders.',
    requiresCode: true,
    idealAnswer: "The key word is EVEN IF they have zero orders — this means LEFT JOIN, not INNER JOIN. INNER JOIN would skip users with no orders. We LEFT JOIN users to orders, then use COUNT and COALESCE with SUM. COALESCE converts NULL sums to 0 for users who never ordered. Always remember — LEFT JOIN preserves ALL rows from the left table.",
    realLifeScenario: "A customer relationship management dashboard showing all registered users with their spending summary — including those who signed up but never purchased — to help the sales team prioritize outreach.",
    codingExample: "-- All users with order summary (including zero-order users)\nSELECT \n  u.id,\n  u.name,\n  COUNT(o.id) AS total_orders,\n  COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name\nORDER BY total_spent DESC;\n\n-- Note: COUNT(o.id) not COUNT(*)\n-- COUNT(*) would return 1 even for users with no orders\n-- COUNT(o.id) returns 0 because NULL ids are not counted"
  },
  {
    id: 'db-59',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to get all orders placed in the last 7 days with customer name and product names.',
    requiresCode: true,
    idealAnswer: "This requires joining three tables — orders, users, and order_items with products. We filter using WHERE with NOW() minus an interval. The tricky part is that one order can have multiple products, so we use STRING_AGG or GROUP_CONCAT to combine product names into one row per order. Always index the date column for time-range queries on large tables.",
    realLifeScenario: "A customer support dashboard showing recent orders with full details — so when a customer calls about a recent purchase, the agent can quickly see what they ordered without navigating multiple screens.",
    codingExample: "-- Recent orders with customer and product details\nSELECT \n  o.id AS order_id,\n  u.name AS customer,\n  STRING_AGG(p.name, ', ') AS products,\n  o.total_amount,\n  o.status,\n  o.created_at\nFROM orders o\nINNER JOIN users u ON o.user_id = u.id\nINNER JOIN order_items oi ON o.id = oi.order_id\nINNER JOIN products p ON oi.product_id = p.id\nWHERE o.created_at >= NOW() - INTERVAL '7 days'\nGROUP BY o.id, u.name, o.total_amount, o.status, o.created_at\nORDER BY o.created_at DESC;"
  },
  {
    id: 'db-60',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to update all pending orders older than 30 days to status cancelled.',
    requiresCode: true,
    idealAnswer: "This is a bulk UPDATE with a WHERE clause combining status check and date comparison. Always be careful with bulk updates — run a SELECT first to verify which rows will be affected. In production, consider doing this in batches to avoid locking the entire table. Also add an updated_at timestamp so you know when the cancellation happened.",
    realLifeScenario: "An automated cleanup job that runs nightly to cancel stale orders that were never completed — freeing up reserved inventory and keeping the order management system clean for the operations team.",
    codingExample: "-- First: CHECK which rows will be affected\nSELECT id, user_id, total_amount, created_at\nFROM orders\nWHERE status = 'pending'\n  AND created_at < NOW() - INTERVAL '30 days';\n\n-- Then: UPDATE them\nUPDATE orders\nSET \n  status = 'cancelled',\n  updated_at = NOW()\nWHERE status = 'pending'\n  AND created_at < NOW() - INTERVAL '30 days';\n\n-- Batch approach for large tables:\n-- UPDATE orders SET status = 'cancelled'\n-- WHERE id IN (\n--   SELECT id FROM orders\n--   WHERE status = 'pending' AND created_at < NOW() - INTERVAL '30 days'\n--   LIMIT 1000\n-- );"
  },
  {
    id: 'db-61',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to find the most popular product — the one that appears in the most orders.',
    requiresCode: true,
    idealAnswer: "Join order_items with products, group by product, count occurrences, and order descending with LIMIT 1. If you want to handle ties, use RANK() window function instead of LIMIT. The difference between counting order_items rows versus counting DISTINCT order IDs matters — one counts total quantity, other counts unique orders containing that product.",
    realLifeScenario: "An ecommerce homepage featuring a Best Seller badge on the most ordered product. The marketing team uses this data to decide which products to promote in email campaigns and banner ads.",
    codingExample: "-- Most popular product by number of orders\nSELECT \n  p.id, p.name, p.category,\n  COUNT(DISTINCT oi.order_id) AS order_count,\n  SUM(oi.quantity) AS total_units_sold\nFROM products p\nINNER JOIN order_items oi ON p.id = oi.product_id\nGROUP BY p.id, p.name, p.category\nORDER BY order_count DESC\nLIMIT 1;\n\n-- If you want top 5 with ties:\n-- WITH ranked AS (\n--   SELECT p.*, COUNT(DISTINCT oi.order_id) AS cnt,\n--     RANK() OVER (ORDER BY COUNT(DISTINCT oi.order_id) DESC) AS rnk\n--   FROM products p JOIN order_items oi ON p.id = oi.product_id\n--   GROUP BY p.id\n-- ) SELECT * FROM ranked WHERE rnk <= 5;"
  },
  {
    id: 'db-62',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to implement page 3 of a product listing — 10 products per page, sorted by price descending.',
    requiresCode: true,
    idealAnswer: "Page 3 with 10 items per page means OFFSET 20 and LIMIT 10. The formula is OFFSET = (page - 1) * pageSize. However, OFFSET-based pagination is slow on large datasets because the database still scans and discards all offset rows. For millions of rows, cursor-based pagination using WHERE price < last_seen_price is much faster.",
    realLifeScenario: "A product catalog page with pagination buttons showing page numbers. As the user clicks page 3, the API needs to return the correct slice of products sorted by price from highest to lowest.",
    codingExample: "-- OFFSET-based pagination: Page 3, 10 items per page\nSELECT id, name, price, category\nFROM products\nORDER BY price DESC\nLIMIT 10 OFFSET 20;  -- (3-1) * 10 = 20\n\n-- Problem: On page 10000, DB scans 100000 rows then discards 99990\n\n-- Better: Cursor-based pagination\n-- Frontend sends last_seen_price and last_seen_id from previous page\nSELECT id, name, price, category\nFROM products\nWHERE (price, id) < (4999.99, 'last-seen-id')\nORDER BY price DESC, id DESC\nLIMIT 10;"
  },
  {
    id: 'db-63',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to find all products where stock is less than 10 and category is Electronics.',
    requiresCode: true,
    idealAnswer: "This is a simple WHERE clause with two conditions using AND. While the query itself is basic, the interview insight is about indexing — if you have millions of products, a composite index on (category, stock) will make this query fast. The order matters — put the equality condition column first in the index, then the range condition column.",
    realLifeScenario: "An inventory alert system that sends Slack notifications to the warehouse team when electronics products are running low on stock, so they can reorder before items go completely out of stock.",
    codingExample: "-- Low stock electronics products\nSELECT id, name, stock, price\nFROM products\nWHERE category = 'Electronics'\n  AND stock < 10\nORDER BY stock ASC;\n\n-- Performance: Create composite index\n-- CREATE INDEX idx_category_stock ON products(category, stock);\n-- This index works because category is equality (=) and stock is range (<)\n-- If reversed as (stock, category), the index would be less efficient"
  },
  {
    id: 'db-64',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to calculate the average order value per user, only show users whose average is above 5000.',
    requiresCode: true,
    idealAnswer: "This uses GROUP BY with AVG aggregate function and HAVING to filter groups. Remember — WHERE filters individual rows before grouping, HAVING filters groups after aggregation. You cannot use WHERE with aggregate functions. Also use ROUND to make the output readable. This is a very common pattern for analytical queries.",
    realLifeScenario: "A premium customer identification system — users with average order value above 5000 are flagged as high-value customers and get early access to sales, free shipping, and dedicated customer support.",
    codingExample: "-- High-value customers by average order value\nSELECT \n  u.id,\n  u.name,\n  COUNT(o.id) AS total_orders,\n  ROUND(AVG(o.total_amount), 2) AS avg_order_value,\n  SUM(o.total_amount) AS lifetime_value\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name\nHAVING AVG(o.total_amount) > 5000\nORDER BY avg_order_value DESC;"
  },
  {
    id: 'db-65',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to get product name and total quantity sold — for all products, even unsold ones.',
    requiresCode: true,
    idealAnswer: "Again the keyword is ALL products, even unsold — so LEFT JOIN from products to order_items. Use COALESCE to show 0 instead of NULL for unsold products. This query helps identify dead inventory. In production, you might combine this with a date filter to see what sold in the last 30 days versus what has been sitting unsold.",
    realLifeScenario: "An inventory report showing every product alongside how many units have been sold. Products with zero sales for 90+ days might be candidates for clearance pricing or removal from the catalog.",
    codingExample: "-- All products with total quantity sold\nSELECT \n  p.id,\n  p.name,\n  p.category,\n  COALESCE(SUM(oi.quantity), 0) AS total_qty_sold,\n  p.stock AS current_stock\nFROM products p\nLEFT JOIN order_items oi ON p.id = oi.product_id\nGROUP BY p.id, p.name, p.category, p.stock\nORDER BY total_qty_sold DESC;\n\n-- COALESCE is important here\n-- Without it, unsold products show NULL instead of 0\n-- NULL in reports confuses business users"
  },
  {
    id: 'db-66',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write an aggregation to get total revenue per product category — only categories with revenue above 50000.',
    requiresCode: true,
    idealAnswer: "This uses MongoDB aggregation pipeline with $lookup to join orders with products, $group to sum revenue by category, and $match at the end to filter groups above 50000. The pipeline processes stages sequentially — like SQL execution order. The $match after $group acts like HAVING in SQL. Always put $match as early as possible to reduce documents flowing through the pipeline.",
    realLifeScenario: "A business analytics dashboard showing top-performing product categories. Only categories generating significant revenue (above 50K) are displayed to help the management team decide where to invest marketing budget.",
    codingExample: "// Total revenue per category, only above 50000\ndb.orders.aggregate([\n  { $unwind: '$items' },\n  { $lookup: {\n      from: 'products',\n      localField: 'items.productId',\n      foreignField: '_id',\n      as: 'product'\n  }},\n  { $unwind: '$product' },\n  { $group: {\n      _id: '$product.category',\n      totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },\n      totalOrders: { $sum: 1 }\n  }},\n  { $match: { totalRevenue: { $gt: 50000 } } },\n  { $sort: { totalRevenue: -1 } }\n]);"
  },
  {
    id: 'db-67',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a MongoDB query to find all orders where status is either shipped or delivered and total amount is above 10000.',
    requiresCode: true,
    idealAnswer: "Use the $in operator for matching multiple values and $gt for greater than comparison. This is similar to SQL WHERE status IN ('shipped', 'delivered') AND total > 10000. MongoDB query operators start with $ sign. For better performance, create a compound index on { status: 1, totalAmount: 1 } since both fields are in the filter.",
    realLifeScenario: "A logistics dashboard filtering high-value orders that are already in transit or completed. The finance team uses this to reconcile payments and the shipping team uses it to prioritize delivery tracking for expensive shipments.",
    codingExample: "// Find shipped/delivered orders above 10000\ndb.orders.find({\n  status: { $in: ['shipped', 'delivered'] },\n  totalAmount: { $gt: 10000 }\n}).sort({ totalAmount: -1 });\n\n// With Mongoose:\nconst orders = await Order.find({\n  status: { $in: ['shipped', 'delivered'] },\n  totalAmount: { $gt: 10000 }\n}).sort('-totalAmount').populate('userId', 'name email');\n\n// Create index for performance:\n// db.orders.createIndex({ status: 1, totalAmount: 1 })"
  },
  {
    id: 'db-68',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write an aggregation to get the top 3 customers by total amount spent.',
    requiresCode: true,
    idealAnswer: "Group all orders by userId, sum their total amounts, sort descending, and limit to 3. Then use $lookup to join with users collection to get customer names. The order of pipeline stages matters for performance — group and sort first to reduce data, then lookup only the top 3 users instead of looking up all users first.",
    realLifeScenario: "A VIP customer rewards program that identifies the top 3 spenders each month to send them exclusive deals, early access to new products, or invite them to special events as brand ambassadors.",
    codingExample: "// Top 3 customers by total spending\ndb.orders.aggregate([\n  { $group: {\n      _id: '$userId',\n      totalSpent: { $sum: '$totalAmount' },\n      orderCount: { $sum: 1 }\n  }},\n  { $sort: { totalSpent: -1 } },\n  { $limit: 3 },\n  { $lookup: {\n      from: 'users',\n      localField: '_id',\n      foreignField: '_id',\n      as: 'customer'\n  }},\n  { $unwind: '$customer' },\n  { $project: {\n      _id: 0,\n      name: '$customer.name',\n      email: '$customer.email',\n      totalSpent: 1,\n      orderCount: 1\n  }}\n]);"
  },
  {
    id: 'db-69',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a MongoDB query to find all products where the Electronics category has stock less than 20.',
    requiresCode: true,
    idealAnswer: "This is a simple find query with two conditions. MongoDB uses implicit AND when you put multiple fields in the filter object. For explicit AND/OR logic, use $and and $or operators. Always use projection to return only needed fields — it reduces network bandwidth and memory usage, especially when documents are large with many fields.",
    realLifeScenario: "An automated inventory monitoring system that checks electronics stock levels every hour. When stock drops below 20 units, it triggers a purchase order to the supplier and sends an alert to the warehouse manager.",
    codingExample: "// Find low-stock electronics\ndb.products.find(\n  { category: 'Electronics', stock: { $lt: 20 } },\n  { name: 1, stock: 1, price: 1 }  // projection: only return these fields\n).sort({ stock: 1 });\n\n// With Mongoose:\nconst lowStock = await Product.find({\n  category: 'Electronics',\n  stock: { $lt: 20 }\n}).select('name stock price').sort('stock');\n\n// With explicit $and (same result but useful for complex logic):\n// db.products.find({ $and: [\n//   { category: 'Electronics' },\n//   { stock: { $lt: 20 } }\n// ] })"
  },
  {
    id: 'db-70',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write an aggregation that joins orders with users and shows customer name, order total, and status.',
    requiresCode: true,
    idealAnswer: "Use $lookup to join collections — it is the MongoDB equivalent of SQL JOIN. $lookup takes four parameters: from (target collection), localField, foreignField, and as (output array name). Since $lookup returns an array, we $unwind it to flatten. Then $project to shape the final output. This is essentially a LEFT JOIN — orders without matching users will have an empty array.",
    realLifeScenario: "An admin orders page showing a table with customer name, order amount, and current status. Without $lookup, the frontend would need to make separate API calls for user data — $lookup does it in one database round trip.",
    codingExample: "// Join orders with users\ndb.orders.aggregate([\n  { $lookup: {\n      from: 'users',\n      localField: 'userId',\n      foreignField: '_id',\n      as: 'customer'\n  }},\n  { $unwind: '$customer' },\n  { $project: {\n      _id: 1,\n      customerName: '$customer.name',\n      customerEmail: '$customer.email',\n      totalAmount: 1,\n      status: 1,\n      createdAt: 1\n  }},\n  { $sort: { createdAt: -1 } },\n  { $limit: 50 }\n]);\n\n// $unwind is needed because $lookup returns an array\n// Even for 1-to-1 joins, the result is [{...}] not {...}"
  },
  {
    id: 'db-71',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a MongoDB query to increment the stock of a product by 5 when a return is processed.',
    requiresCode: true,
    idealAnswer: "Use the $inc operator to atomically increment a field value. $inc is atomic — meaning even if two return requests hit the server at the same time, MongoDB guarantees both increments will be applied correctly without race conditions. This is much safer than reading the value, adding 5 in application code, and writing back — that approach has a race condition.",
    realLifeScenario: "A return processing system where when a customer returns a product, the stock count is automatically increased. Using $inc ensures thread-safety — if 10 returns happen simultaneously, all 10 increments are correctly applied without any lost updates.",
    codingExample: "// Increment stock by 5 atomically\ndb.products.updateOne(\n  { _id: ObjectId('product123') },\n  { $inc: { stock: 5 }, $set: { updatedAt: new Date() } }\n);\n\n// With Mongoose:\nawait Product.findByIdAndUpdate(productId, {\n  $inc: { stock: 5 },\n  $set: { updatedAt: new Date() }\n}, { new: true });\n\n// WRONG approach (race condition):\n// const product = await Product.findById(id);\n// product.stock += 5;  // Another request might read old value here\n// await product.save(); // Lost update possible!"
  },
  {
    id: 'db-72',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a MongoDB query to find documents where the images array has exactly 3 elements.',
    requiresCode: true,
    idealAnswer: "Use the $size operator to match arrays by their exact length. Note that $size only supports exact match — it does not work with ranges like $gt or $lt. For range queries on array length, you need to either store a separate count field or use $expr with $size in aggregation. This is a common MongoDB interview trick question.",
    realLifeScenario: "A product listing quality check system that identifies products with exactly 3 images — maybe 3 is the minimum required for the featured section, and this query helps the content team find products that just barely meet the requirement.",
    codingExample: "// Find documents with exactly 3 images\ndb.products.find({ images: { $size: 3 } });\n\n// DOES NOT WORK: $size does not support ranges\n// db.products.find({ images: { $size: { $gt: 2 } } }); // ERROR!\n\n// For range queries on array size, use $expr:\ndb.products.find({\n  $expr: { $gte: [{ $size: '$images' }, 3] }\n});\n\n// Or use dot notation with indexed position:\n// Has at least 3 elements (index 2 exists = at least 3 items)\ndb.products.find({ 'images.2': { $exists: true } });"
  },
  {
    id: 'db-73',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write an aggregation to count how many orders are in each status — pending, shipped, delivered, cancelled.',
    requiresCode: true,
    idealAnswer: "Group by the status field and count documents in each group using $sum: 1. This is equivalent to SQL SELECT status, COUNT(*) GROUP BY status. You can add $sort to order the results. For a dashboard, you might also want percentages — calculate those by using $facet to get both the counts and the total in one pipeline.",
    realLifeScenario: "An order management dashboard showing a summary bar chart — how many orders are pending, shipped, delivered, and cancelled. This gives the operations team an instant overview of the fulfillment pipeline health.",
    codingExample: "// Count orders by status\ndb.orders.aggregate([\n  { $group: {\n      _id: '$status',\n      count: { $sum: 1 },\n      totalValue: { $sum: '$totalAmount' }\n  }},\n  { $sort: { count: -1 } },\n  { $project: {\n      _id: 0,\n      status: '$_id',\n      count: 1,\n      totalValue: 1\n  }}\n]);\n\n// Output example:\n// { status: 'delivered', count: 1250, totalValue: 8500000 }\n// { status: 'shipped', count: 340, totalValue: 2100000 }\n// { status: 'pending', count: 120, totalValue: 890000 }\n// { status: 'cancelled', count: 45, totalValue: 310000 }"
  },
  {
    id: 'db-74',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a MongoDB query to find all users who registered in the last 30 days and have not placed any order.',
    requiresCode: true,
    idealAnswer: "This requires checking two collections — users and orders. The approach depends on your schema. If using references, you need aggregation with $lookup to left-join with orders, then filter where the joined array is empty. If you have an orderCount field on the user document, a simple find query works. The aggregation approach is more reliable but slower.",
    realLifeScenario: "A marketing automation system targeting new signups who have not converted yet. These users get a welcome email with a first-purchase discount code to encourage their first order within 30 days of registration.",
    codingExample: "// Method 1: Aggregation with $lookup\ndb.users.aggregate([\n  { $match: {\n      createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) }\n  }},\n  { $lookup: {\n      from: 'orders',\n      localField: '_id',\n      foreignField: 'userId',\n      as: 'orders'\n  }},\n  { $match: { orders: { $size: 0 } } },\n  { $project: { name: 1, email: 1, createdAt: 1 } }\n]);\n\n// Method 2: With Mongoose (two queries)\nconst thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000);\nconst newUsers = await User.find({ createdAt: { $gte: thirtyDaysAgo } });\nconst userIds = newUsers.map(u => u._id);\nconst usersWithOrders = await Order.distinct('userId', { userId: { $in: userIds } });\nconst result = newUsers.filter(u => !usersWithOrders.includes(u._id));"
  },
  {
    id: 'db-75',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Write a query to add a new field discountedPrice to all Electronics products — 10% less than current price.',
    requiresCode: true,
    idealAnswer: "Use updateMany with $mul operator or aggregation pipeline update syntax. In MongoDB 4.2+, you can use an aggregation pipeline inside update to reference existing field values. The older approach of reading each document, calculating, and writing back is slow and has race conditions. Pipeline updates solve this by doing everything server-side in one atomic operation.",
    realLifeScenario: "A seasonal sale where all electronics get a flat 10% discount. Instead of calculating discounted prices in the application for every API request, pre-compute and store them so the product listing API remains fast and simple.",
    codingExample: "// MongoDB 4.2+ : Aggregation pipeline update\ndb.products.updateMany(\n  { category: 'Electronics' },\n  [{\n    $set: {\n      discountedPrice: {\n        $round: [{ $multiply: ['$price', 0.9] }, 2]\n      },\n      discountPercent: 10,\n      updatedAt: new Date()\n    }\n  }]\n);\n\n// With Mongoose:\nawait Product.updateMany(\n  { category: 'Electronics' },\n  [{\n    $set: {\n      discountedPrice: { $round: [{ $multiply: ['$price', 0.9] }, 2] }\n    }\n  }]\n);\n\n// Note: The [] around the update makes it a pipeline update\n// Without [], you cannot reference $price (the document's own field)"
  },
  {
    id: 'db-76',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'You have a products table with 10 million rows. Query on category column is slow. What do you do and why?',
    requiresCode: true,
    idealAnswer: "The first thing I would do is run EXPLAIN ANALYZE on the query to confirm it is doing a Sequential Scan. Then I would create an index on the category column. An index is like a book's table of contents — instead of reading every page, the database jumps directly to the relevant rows. For 10 million rows, an index can reduce query time from seconds to milliseconds. If the query also filters on price, I would create a composite index on (category, price).",
    realLifeScenario: "A product listing API on Flipkart takes 5 seconds when filtering by category. After adding an index on the category column, the same query runs in 12 milliseconds. The difference is between scanning 10 million rows versus looking up a B-tree index that finds matching rows in O(log n) time.",
    codingExample: "-- Step 1: Check the query plan\nEXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Electronics';\n-- Output shows: Seq Scan on products (cost=0.00..185432.00 rows=10000000)\n\n-- Step 2: Create an index\nCREATE INDEX idx_products_category ON products(category);\n\n-- Step 3: Verify improvement\nEXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Electronics';\n-- Output shows: Index Scan using idx_products_category (cost=0.43..8.45 rows=1)\n\n-- For multiple conditions:\nCREATE INDEX idx_cat_price ON products(category, price);\n-- This helps: WHERE category = 'Electronics' AND price < 5000"
  },
  {
    id: 'db-77',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'A junior developer wrote WHERE email = NULL and it returns no results even though NULL emails exist. What is wrong and how do you fix it?',
    requiresCode: true,
    idealAnswer: "NULL in SQL is not a value — it means unknown or missing. You cannot compare anything with NULL using equals operator. NULL = NULL returns NULL (not true, not false). The correct syntax is IS NULL or IS NOT NULL. This is because NULL follows three-valued logic in SQL — true, false, and unknown. Any comparison with NULL results in unknown, which is treated as false in WHERE clause.",
    realLifeScenario: "A bug report says the user export feature is missing users who never provided their email. The developer used WHERE email = NULL which silently returns zero rows. After fixing to IS NULL, the correct 2,300 users without emails appear in the export.",
    codingExample: "-- WRONG: This returns ZERO rows even if NULLs exist\nSELECT * FROM users WHERE email = NULL;\n-- NULL = NULL evaluates to NULL (unknown), not TRUE\n\n-- CORRECT: Use IS NULL\nSELECT * FROM users WHERE email IS NULL;\n\n-- CORRECT: Find non-null emails\nSELECT * FROM users WHERE email IS NOT NULL;\n\n-- Also be careful with NOT IN:\n-- If subquery returns ANY null, NOT IN returns empty!\nSELECT * FROM users WHERE id NOT IN (1, 2, NULL);\n-- Returns NOTHING because id != NULL is unknown\n\n-- Safe alternative: Use NOT EXISTS instead of NOT IN\nSELECT * FROM users u\nWHERE NOT EXISTS (SELECT 1 FROM blocked WHERE user_id = u.id);"
  },
  {
    id: 'db-78',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Explain what happens step by step when you run: SELECT category, COUNT(*) FROM products WHERE price > 1000 GROUP BY category HAVING COUNT(*) > 5 ORDER BY COUNT(*) DESC.',
    requiresCode: true,
    idealAnswer: "SQL has a specific execution order that is different from the written order. It goes: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. First, the database reads the products table. Then WHERE filters rows where price > 1000. Then GROUP BY groups remaining rows by category. HAVING filters groups with count > 5. SELECT picks the output columns. Finally ORDER BY sorts. Understanding this order explains why you cannot use column aliases in WHERE but can in ORDER BY.",
    realLifeScenario: "A developer writes SELECT category AS cat, COUNT(*) AS cnt FROM products WHERE cnt > 5 and gets an error. Understanding execution order explains why — WHERE runs before SELECT, so the alias cnt does not exist yet. HAVING runs after GROUP BY, so aggregate functions work there.",
    codingExample: "-- The query:\nSELECT category, COUNT(*) \nFROM products \nWHERE price > 1000 \nGROUP BY category \nHAVING COUNT(*) > 5 \nORDER BY COUNT(*) DESC;\n\n-- Execution order (NOT the written order):\n-- 1. FROM products        → Load all 10M rows\n-- 2. WHERE price > 1000   → Filter to 2M rows where price > 1000\n-- 3. GROUP BY category    → Group 2M rows into ~50 category buckets\n-- 4. HAVING COUNT(*) > 5  → Remove groups with 5 or fewer products\n-- 5. SELECT category, COUNT(*) → Pick output columns\n-- 6. ORDER BY COUNT(*) DESC    → Sort remaining groups\n\n-- This is why:\n-- WHERE cannot use aliases (SELECT hasn't run yet)\n-- HAVING can use aggregates (GROUP BY already ran)\n-- ORDER BY can use aliases (SELECT already ran)"
  },
  {
    id: 'db-79',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Your teammate says just use SELECT * everywhere, it is easier. What problems will this cause in production?',
    requiresCode: true,
    idealAnswer: "SELECT * has five major problems in production. First, it fetches unnecessary columns which wastes network bandwidth and memory. Second, if someone adds a large BLOB or TEXT column later, all existing queries suddenly slow down. Third, it prevents covering index optimization — the database must always go to the actual table rows. Fourth, it breaks your API if column names change. Fifth, it exposes sensitive columns like password hashes accidentally in API responses.",
    realLifeScenario: "A product API using SELECT * starts returning 2MB per request after someone adds a description_html column with full HTML content. The mobile app crashes because it runs out of memory parsing the response. Using SELECT id, name, price would return just 200 bytes per product.",
    codingExample: "-- BAD: SELECT * in production\nSELECT * FROM users;\n-- Returns: id, name, email, password_hash, ssn, address, profile_image_blob\n-- Problems: sends password hash to frontend, 2MB profile images in response\n\n-- GOOD: Select only what you need\nSELECT id, name, email FROM users;\n-- Returns: only 3 small columns, fast and safe\n\n-- Covering index benefit:\nCREATE INDEX idx_users_email ON users(email, name);\nSELECT name, email FROM users WHERE email = 'a@b.com';\n-- Index-only scan: never touches the table at all (fastest possible)\n\nSELECT * FROM users WHERE email = 'a@b.com';\n-- Must go to table to fetch all columns (slower)"
  },
  {
    id: 'db-80',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'A user places an order — it needs to deduct stock, create an order record, and create order items. What happens if the server crashes after deducting stock but before creating the order? How do you prevent this?',
    requiresCode: true,
    idealAnswer: "Without a transaction, you get an inconsistent state — stock is reduced but no order exists. The customer paid, stock went down, but there is no record of what happened. The solution is database transactions. A transaction groups multiple operations into one atomic unit — either ALL succeed or ALL fail. If anything fails or the server crashes mid-transaction, the database automatically rolls back all changes. This is the A in ACID — Atomicity.",
    realLifeScenario: "On a flash sale, the server crashes after deducting iPhone stock from 5 to 4, but before creating the order. Without a transaction, you have a phantom stock reduction — one iPhone disappeared from inventory with no record of who bought it. With a transaction, the stock change is rolled back to 5 automatically.",
    codingExample: "// WITHOUT transaction (DANGEROUS):\nawait Product.updateOne({ _id: productId }, { $inc: { stock: -1 } });\n// SERVER CRASHES HERE — stock reduced but no order created!\nawait Order.create({ userId, items, total });\n\n// WITH transaction (SAFE):\nconst session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Product.updateOne(\n    { _id: productId, stock: { $gte: 1 } },  // also check stock > 0\n    { $inc: { stock: -1 } },\n    { session }\n  );\n  await Order.create([{ userId, items, total }], { session });\n  await session.commitTransaction();\n} catch (error) {\n  await session.abortTransaction();  // Everything rolls back\n  throw error;\n} finally {\n  session.endSession();\n}\n\n-- SQL equivalent:\n-- BEGIN;\n-- UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock >= 1;\n-- INSERT INTO orders (user_id, total) VALUES (1, 5000);\n-- COMMIT; -- or ROLLBACK on error"
  },
  {
    id: 'db-81',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'You have an index on (category, price). A developer writes WHERE price < 5000. Will the index be used? Why or why not?',
    requiresCode: true,
    idealAnswer: "No, the index will likely NOT be used efficiently. This is because of the leftmost prefix rule. A composite index on (category, price) is like a phone book sorted first by last name then by first name. If you search only by first name (price), the book is not helpful because entries are not grouped by first name. The index works for: WHERE category = X, or WHERE category = X AND price < 5000, but NOT for WHERE price < 5000 alone.",
    realLifeScenario: "A developer creates a composite index thinking it will speed up all queries on those columns. But queries filtering only by price still do full table scans. Understanding the leftmost prefix rule saves them from creating redundant indexes and explains why query performance varies with different WHERE conditions.",
    codingExample: "-- Index: CREATE INDEX idx_cat_price ON products(category, price);\n\n-- WILL use the index (follows leftmost prefix):\nSELECT * FROM products WHERE category = 'Electronics';\nSELECT * FROM products WHERE category = 'Electronics' AND price < 5000;\n\n-- WILL NOT use the index efficiently:\nSELECT * FROM products WHERE price < 5000;\n-- The index is sorted by category first, price is only sorted WITHIN each category\n-- So finding all prices < 5000 across ALL categories requires scanning the whole index\n\n-- Fix: Create a separate index on price\nCREATE INDEX idx_price ON products(price);\n\n-- Or reorder the composite index if price queries are more common:\nCREATE INDEX idx_price_cat ON products(price, category);\n-- Now WHERE price < 5000 works, and WHERE price < 5000 AND category = 'X' also works"
  },
  {
    id: 'db-82',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'What is the N+1 problem? Give a real example with users and orders. How do you fix it in SQL and in Mongoose?',
    requiresCode: true,
    idealAnswer: "N+1 is when your code makes 1 query to get N records, then N more queries to get related data for each record — total N+1 queries. For example, fetching 100 users then looping and fetching orders for each user individually = 101 queries. The fix is eager loading — fetch everything in 1 or 2 queries using JOIN in SQL or populate in Mongoose. This can reduce query count from 101 to just 1 or 2.",
    realLifeScenario: "An API endpoint GET /users returns 100 users with their orders. Without fixing N+1, it makes 101 database queries and takes 3 seconds. After using JOIN or populate, it makes 2 queries and responds in 50 milliseconds. On high traffic, N+1 can bring down your entire database.",
    codingExample: "// N+1 PROBLEM in Mongoose:\nconst users = await User.find();  // 1 query: get 100 users\nfor (const user of users) {\n  user.orders = await Order.find({ userId: user._id }); // 100 queries!\n}\n// Total: 101 queries!\n\n// FIX with populate:\nconst users = await User.find().populate('orders');\n// Total: 2 queries (1 for users, 1 for all orders with $in)\n\n// FIX with aggregation:\nconst result = await User.aggregate([\n  { $lookup: { from: 'orders', localField: '_id', foreignField: 'userId', as: 'orders' } }\n]);\n// Total: 1 query\n\n-- SQL FIX with JOIN:\n-- Instead of: SELECT * FROM users; then loop SELECT * FROM orders WHERE user_id = ?\n-- Use: SELECT u.*, o.* FROM users u LEFT JOIN orders o ON u.id = o.user_id;\n-- 1 query instead of 101"
  },
  {
    id: 'db-83',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Why should you never store money as FLOAT in a database? What should you use instead?',
    requiresCode: true,
    idealAnswer: "FLOAT uses binary floating-point representation which cannot exactly represent many decimal numbers. For example, 0.1 + 0.2 = 0.30000000000000004 in floating point, not 0.3. Over thousands of financial transactions, these tiny errors accumulate and your accounts will not balance. Use DECIMAL or NUMERIC type instead — they store exact decimal values. Alternatively, store money as integers in the smallest unit (like paisa or cents) and divide for display.",
    realLifeScenario: "An ecommerce platform stores prices as FLOAT. After processing 50,000 orders, the daily revenue report shows Rs 4,99,999.73 but the actual sum of all order amounts is Rs 5,00,000.00. The 27 paisa error comes from floating point precision loss across thousands of additions. Banks and payment gateways reject this kind of discrepancy.",
    codingExample: "-- WRONG: Using FLOAT for money\nCREATE TABLE products (\n  price FLOAT  -- DANGEROUS!\n);\nSELECT 0.1 + 0.2;  -- Returns 0.30000000000000004 !\n\n-- CORRECT: Using DECIMAL\nCREATE TABLE products (\n  price DECIMAL(10, 2)  -- 10 digits total, 2 after decimal\n);\nSELECT CAST(0.1 AS DECIMAL) + CAST(0.2 AS DECIMAL);  -- Returns 0.3 exactly\n\n-- Alternative: Store as integer (paisa/cents)\nCREATE TABLE products (\n  price_paisa INTEGER  -- Store 49999 for Rs 499.99\n);\n-- Display: price_paisa / 100\n\n-- In Mongoose schema:\n// price: { type: Number }  // JavaScript Number is float - be careful!\n// Better: store as integer cents\n// price_cents: { type: Number }  // 4999 for $49.99\n// Or use a decimal library like decimal.js for calculations"
  },
  {
    id: 'db-84',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Your MongoDB document for a user has an orders array inside it. After 2 years, some users have 10000 orders embedded. What problem will occur and how do you fix the schema?',
    requiresCode: true,
    idealAnswer: "MongoDB has a 16MB document size limit. With 10,000 embedded orders, the document will approach or exceed this limit and writes will fail. Even before hitting the limit, performance degrades because every time you read the user document, all 10,000 orders are loaded into memory. The fix is to move orders to a separate collection and use references instead of embedding. Embed only when the data is small, bounded, and always accessed together.",
    realLifeScenario: "A food delivery app embeds orders inside user documents. After 2 years, a power user who orders twice daily has 1,460 embedded orders. The user profile API takes 4 seconds because it loads all historical orders just to show the user's name. Moving orders to a separate collection fixes this instantly.",
    codingExample: "// BAD: Embedding unbounded arrays\nconst userSchema = {\n  name: String,\n  orders: [{          // This array grows forever!\n    items: [Object],\n    total: Number,\n    date: Date\n  }]\n};\n// After 2 years: document size = 14MB, approaching 16MB limit\n// Every User.findById() loads 10000 orders into memory\n\n// GOOD: Reference pattern (separate collection)\nconst userSchema = {\n  name: String,\n  email: String\n  // No orders array here\n};\n\nconst orderSchema = {\n  userId: { type: ObjectId, ref: 'User', index: true },\n  items: [{ productId: ObjectId, quantity: Number, price: Number }],\n  total: Number,\n  createdAt: Date\n};\n\n// Now: User.findById() returns small document (1KB)\n// Orders loaded separately: Order.find({ userId }).sort('-createdAt').limit(10)\n\n// Rule of thumb for embedding vs referencing:\n// Embed: small, bounded data (max 20-50 items), always accessed together\n// Reference: large, unbounded data, accessed independently"
  },
  {
    id: 'db-85',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'When would you pick PostgreSQL over MongoDB for a new project? Give a real scenario where MongoDB would be the wrong choice.',
    requiresCode: false,
    idealAnswer: "Pick PostgreSQL when your data has strong relationships, needs ACID transactions across multiple tables, requires complex joins and aggregations, or when data integrity is critical (like financial systems). MongoDB is the wrong choice for banking, accounting, or any system where you need multi-table transactions, strict schema enforcement, and referential integrity. MongoDB shines when schema is flexible, data is document-shaped, and you need horizontal scaling for read-heavy workloads.",
    realLifeScenario: "Building a banking application — PostgreSQL is the right choice because transfers between accounts need ACID transactions across multiple tables (accounts, transactions, audit_log). MongoDB would be risky because multi-document transactions were only added in v4.0, are slower, and have limitations. For a CMS or blog platform with varying content structures, MongoDB would be better because each article type can have different fields without migrations."
  },
  {
    id: 'db-86',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Design the complete schema for a food delivery app like Zomato — what tables or collections would you create and why?',
    requiresCode: true,
    idealAnswer: "A food delivery app needs these core entities: Users (customers and delivery partners), Restaurants, MenuItems, Orders, OrderItems, Addresses, Reviews, and Payments. The key decisions are: use SQL for transactional data (orders, payments) and optionally MongoDB for restaurant catalogs (flexible menus). Orders need a status field for tracking (placed, preparing, picked_up, delivered). Store price_at_purchase in order_items because restaurant prices change over time.",
    realLifeScenario: "Building a Zomato-like app. The interviewer wants to see if you think about real-world concerns — like why you need a separate delivery_partners table, why restaurant menus need flexible schemas, why you store price snapshot in orders, and how you handle multiple delivery addresses per user.",
    codingExample: "-- PostgreSQL Schema for Food Delivery App\n\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  phone VARCHAR(15) UNIQUE NOT NULL,\n  role VARCHAR(20) DEFAULT 'customer', -- customer, restaurant_owner, delivery\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE restaurants (\n  id SERIAL PRIMARY KEY,\n  owner_id INT REFERENCES users(id),\n  name VARCHAR(200) NOT NULL,\n  cuisine_type VARCHAR(100),\n  rating DECIMAL(2,1) DEFAULT 0,\n  is_active BOOLEAN DEFAULT true,\n  address TEXT NOT NULL\n);\n\nCREATE TABLE menu_items (\n  id SERIAL PRIMARY KEY,\n  restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,\n  name VARCHAR(200) NOT NULL,\n  price DECIMAL(10,2) NOT NULL,\n  category VARCHAR(50), -- starter, main, dessert, drinks\n  is_available BOOLEAN DEFAULT true\n);\n\nCREATE TABLE addresses (\n  id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id),\n  label VARCHAR(50), -- Home, Work, Other\n  full_address TEXT NOT NULL,\n  lat DECIMAL(10,8),\n  lng DECIMAL(11,8)\n);\n\nCREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id),\n  restaurant_id INT REFERENCES restaurants(id),\n  delivery_address_id INT REFERENCES addresses(id),\n  delivery_partner_id INT REFERENCES users(id),\n  status VARCHAR(30) DEFAULT 'placed', -- placed, confirmed, preparing, picked_up, delivered, cancelled\n  total_amount DECIMAL(10,2) NOT NULL,\n  delivery_fee DECIMAL(10,2) DEFAULT 0,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE order_items (\n  id SERIAL PRIMARY KEY,\n  order_id INT REFERENCES orders(id) ON DELETE CASCADE,\n  menu_item_id INT REFERENCES menu_items(id),\n  quantity INT NOT NULL,\n  price_at_purchase DECIMAL(10,2) NOT NULL -- snapshot, not current price!\n);\n\nCREATE TABLE reviews (\n  id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id),\n  restaurant_id INT REFERENCES restaurants(id),\n  rating INT CHECK (rating BETWEEN 1 AND 5),\n  comment TEXT,\n  created_at TIMESTAMP DEFAULT NOW(),\n  UNIQUE(user_id, restaurant_id) -- one review per user per restaurant\n);"
  },
  {
    id: 'db-87',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'A product can belong to multiple categories and a category can have multiple products. How do you model this in SQL? Write the tables.',
    requiresCode: true,
    idealAnswer: "This is a many-to-many relationship. You cannot model it with just a foreign key in either table. You need a junction table (also called bridge table or pivot table) that connects both. The junction table has two foreign keys — one to products and one to categories. The combination of both foreign keys is the primary key, ensuring no duplicate associations. This is one of the most fundamental SQL patterns.",
    realLifeScenario: "On Amazon, a wireless keyboard belongs to both Electronics and Computer Accessories categories. A single foreign key on the product table would only allow one category. The junction table product_categories allows unlimited category assignments per product, and unlimited products per category.",
    codingExample: "-- Products table\nCREATE TABLE products (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(200) NOT NULL,\n  price DECIMAL(10,2) NOT NULL,\n  stock INT DEFAULT 0\n);\n\n-- Categories table\nCREATE TABLE categories (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL UNIQUE,\n  description TEXT\n);\n\n-- Junction table (many-to-many)\nCREATE TABLE product_categories (\n  product_id INT REFERENCES products(id) ON DELETE CASCADE,\n  category_id INT REFERENCES categories(id) ON DELETE CASCADE,\n  PRIMARY KEY (product_id, category_id)  -- composite PK prevents duplicates\n);\n\n-- Insert a product into multiple categories\nINSERT INTO product_categories (product_id, category_id) VALUES\n  (1, 3),  -- Product 1 in Electronics\n  (1, 7);  -- Product 1 also in Accessories\n\n-- Get all categories for a product\nSELECT c.name FROM categories c\nJOIN product_categories pc ON c.id = pc.category_id\nWHERE pc.product_id = 1;\n\n-- Get all products in a category\nSELECT p.name, p.price FROM products p\nJOIN product_categories pc ON p.id = pc.product_id\nWHERE pc.category_id = 3;"
  },
  {
    id: 'db-88',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'How would you implement a coupon system in your ecommerce database — where each coupon can only be used once per user?',
    requiresCode: true,
    idealAnswer: "Create a coupons table for coupon definitions and a coupon_usages table to track which user used which coupon. The uniqueness constraint UNIQUE(coupon_id, user_id) on the usage table ensures at the database level that a user cannot use the same coupon twice. Application-level checks can fail under race conditions, but a database constraint never fails. Also add expiry dates and max_uses to the coupon itself for global limits.",
    realLifeScenario: "During a Diwali sale, a coupon DIWALI50 gives 50% off. Without the unique constraint, a user could apply the coupon on multiple orders by sending concurrent API requests. The database constraint guarantees one use per user regardless of race conditions or API abuse.",
    codingExample: "-- Coupons definition table\nCREATE TABLE coupons (\n  id SERIAL PRIMARY KEY,\n  code VARCHAR(50) UNIQUE NOT NULL,\n  discount_percent INT CHECK (discount_percent BETWEEN 1 AND 100),\n  max_discount DECIMAL(10,2),  -- cap: max Rs 500 off\n  min_order_value DECIMAL(10,2) DEFAULT 0,\n  max_total_uses INT DEFAULT NULL,  -- NULL = unlimited\n  expires_at TIMESTAMP NOT NULL,\n  is_active BOOLEAN DEFAULT true,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\n-- Track coupon usage per user\nCREATE TABLE coupon_usages (\n  id SERIAL PRIMARY KEY,\n  coupon_id INT REFERENCES coupons(id),\n  user_id INT REFERENCES users(id),\n  order_id INT REFERENCES orders(id),\n  discount_amount DECIMAL(10,2) NOT NULL,\n  used_at TIMESTAMP DEFAULT NOW(),\n  UNIQUE(coupon_id, user_id)  -- DB-level enforcement: one use per user!\n);\n\n-- Apply coupon (in a transaction):\nBEGIN;\n  -- Check coupon validity\n  SELECT * FROM coupons WHERE code = 'DIWALI50' AND is_active = true AND expires_at > NOW();\n  -- Insert usage (fails with unique violation if already used)\n  INSERT INTO coupon_usages (coupon_id, user_id, order_id, discount_amount)\n  VALUES (1, 42, 100, 500.00);\n  -- Apply discount to order\n  UPDATE orders SET discount = 500.00, total_amount = total_amount - 500.00 WHERE id = 100;\nCOMMIT;"
  },
  {
    id: 'db-89',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'You need to store product reviews — each user can review a product only once, rating is 1 to 5. How do you enforce this at the database level, not just application level?',
    requiresCode: true,
    idealAnswer: "Use a UNIQUE constraint on (user_id, product_id) to prevent duplicate reviews at the database level. Use a CHECK constraint to enforce rating between 1 and 5. Database-level constraints are superior to application-level validation because they cannot be bypassed by bugs, race conditions, direct SQL access, or multiple application servers. The database is the last line of defense for data integrity.",
    realLifeScenario: "Without database constraints, a bot sends 1000 fake 5-star reviews for a product by hitting the API rapidly. Application-level checks with if-exists fail under concurrent requests. The UNIQUE constraint makes the database reject duplicates with zero possibility of bypass.",
    codingExample: "-- Reviews table with database-level enforcement\nCREATE TABLE reviews (\n  id SERIAL PRIMARY KEY,\n  user_id INT NOT NULL REFERENCES users(id),\n  product_id INT NOT NULL REFERENCES products(id),\n  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),  -- DB enforces 1-5\n  title VARCHAR(200),\n  comment TEXT,\n  created_at TIMESTAMP DEFAULT NOW(),\n  updated_at TIMESTAMP DEFAULT NOW(),\n  UNIQUE(user_id, product_id)  -- DB enforces one review per user per product\n);\n\n-- Attempting duplicate insert:\nINSERT INTO reviews (user_id, product_id, rating, comment)\nVALUES (1, 5, 4, 'Great product');\n-- First time: SUCCESS\n\nINSERT INTO reviews (user_id, product_id, rating, comment)\nVALUES (1, 5, 5, 'Changed my mind');\n-- ERROR: duplicate key violates unique constraint\n\n-- To allow updating existing review, use UPSERT:\nINSERT INTO reviews (user_id, product_id, rating, comment)\nVALUES (1, 5, 5, 'Changed my mind')\nON CONFLICT (user_id, product_id)\nDO UPDATE SET rating = 5, comment = 'Changed my mind', updated_at = NOW();"
  },
  {
    id: 'db-90',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'How would you design a notification system — users receive notifications, they can be read or unread. Which database would you use and why?',
    requiresCode: true,
    idealAnswer: "For notifications, MongoDB is a good fit because notification content varies by type (order update, promotion, system alert), schema is flexible, and queries are simple (find by userId, sort by date). However, PostgreSQL with JSONB column works equally well. The key design decisions are: indexing on (userId, isRead, createdAt), marking as read in bulk, and auto-cleanup of old notifications. For real-time delivery, combine with Redis pub/sub or WebSockets.",
    realLifeScenario: "A social media app where users receive notifications for likes, comments, follows, and mentions. Each type has different data (a like notification has postId, a follow notification has followerId). MongoDB's flexible schema handles this naturally without creating separate tables for each notification type.",
    codingExample: "// MongoDB schema (flexible for different notification types)\nconst notificationSchema = new Schema({\n  userId: { type: ObjectId, ref: 'User', required: true, index: true },\n  type: { type: String, enum: ['order_update', 'promo', 'system', 'social'], required: true },\n  title: { type: String, required: true },\n  message: { type: String, required: true },\n  isRead: { type: Boolean, default: false },\n  metadata: { type: Schema.Types.Mixed },  // flexible data per type\n  createdAt: { type: Date, default: Date.now, expires: 7776000 } // TTL: auto-delete after 90 days\n});\n\n// Compound index for fast queries\nnotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });\n\n// Get unread notifications\nconst unread = await Notification.find({ userId, isRead: false }).sort('-createdAt').limit(20);\n\n// Get unread count (for badge)\nconst count = await Notification.countDocuments({ userId, isRead: false });\n\n// Mark all as read\nawait Notification.updateMany({ userId, isRead: false }, { $set: { isRead: true } });\n\n-- PostgreSQL alternative:\n-- CREATE TABLE notifications (\n--   id SERIAL PRIMARY KEY,\n--   user_id INT REFERENCES users(id),\n--   type VARCHAR(50) NOT NULL,\n--   title VARCHAR(200) NOT NULL,\n--   message TEXT NOT NULL,\n--   is_read BOOLEAN DEFAULT false,\n--   metadata JSONB,  -- flexible data per type\n--   created_at TIMESTAMP DEFAULT NOW()\n-- );\n-- CREATE INDEX idx_notif_user ON notifications(user_id, is_read, created_at DESC);"
  },
  {
    id: 'db-91',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Your API endpoint GET /products is taking 3 seconds to respond. The products table has 2 million rows. Walk me through how you debug and fix this.',
    requiresCode: true,
    idealAnswer: "I would debug step by step. First, check if the query itself is slow by running EXPLAIN ANALYZE. If it shows Seq Scan, add appropriate indexes. Second, check if SELECT * is used — switch to specific columns. Third, check if pagination is missing — add LIMIT. Fourth, check if there is N+1 problem in the ORM. Fifth, check if connection pooling is configured. Sixth, consider adding Redis cache for frequently accessed data. Most API slowness is caused by missing indexes or missing pagination.",
    realLifeScenario: "Production alert: GET /products P95 latency is 3.2 seconds. You SSH into the server, check database slow query log, find a full table scan on 2 million rows with no index on the category column. Adding the index drops response time to 45ms. Then you add Redis cache and it drops to 5ms.",
    codingExample: "-- Step 1: Find the slow query\n-- Check PostgreSQL slow query log or use pg_stat_statements\n\n-- Step 2: Run EXPLAIN ANALYZE\nEXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Electronics' ORDER BY price;\n-- Shows: Seq Scan on products, rows=2000000, time=2800ms\n\n-- Step 3: Add index\nCREATE INDEX idx_products_category ON products(category);\nCREATE INDEX idx_products_cat_price ON products(category, price);\n\n-- Step 4: Fix the query\n-- Before: SELECT * FROM products WHERE category = 'Electronics'\n-- After:\nSELECT id, name, price, thumbnail FROM products\nWHERE category = 'Electronics'\nORDER BY price\nLIMIT 20 OFFSET 0;\n\n// Step 5: Add caching in Node.js\nconst cacheKey = `products:${category}:page:${page}`;\nconst cached = await redis.get(cacheKey);\nif (cached) return JSON.parse(cached);\n\nconst products = await db.query(/* optimized query */);\nawait redis.set(cacheKey, JSON.stringify(products), 'EX', 300); // 5 min cache\nreturn products;\n\n// Step 6: Ensure connection pooling\n// const pool = new Pool({ max: 20 }); // reuse connections"
  },
  {
    id: 'db-92',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Two users try to buy the last item in stock at the exact same time. How do you prevent both orders from succeeding? Write the solution.',
    requiresCode: true,
    idealAnswer: "This is a classic race condition problem. The solution is pessimistic locking using SELECT FOR UPDATE inside a transaction. FOR UPDATE locks the row so the second user waits until the first completes. Alternatively, use an atomic WHERE clause — UPDATE stock SET stock = stock - 1 WHERE stock >= 1. If stock is already 0, the UPDATE affects 0 rows and you know the purchase failed. The atomic approach is simpler and faster than explicit locking for this use case.",
    realLifeScenario: "Flash sale: only 1 iPhone left. User A and User B click Buy at the same millisecond. Without proper handling, both transactions read stock=1, both deduct to 0, and two orders are created for one item. With FOR UPDATE or atomic WHERE, only one succeeds and the other gets an out-of-stock error.",
    codingExample: "-- Solution 1: Atomic WHERE clause (simpler, preferred)\nBEGIN;\n  -- This UPDATE only succeeds if stock >= 1\n  UPDATE products SET stock = stock - 1\n  WHERE id = 42 AND stock >= 1;\n  -- Check if the update affected any row\n  -- If 0 rows affected, stock was already 0\n  -- GET DIAGNOSTICS row_count = ROW_COUNT;\n  \n  -- Only create order if stock was deducted\n  INSERT INTO orders (user_id, product_id, quantity) VALUES (1, 42, 1);\nCOMMIT;\n\n-- Solution 2: SELECT FOR UPDATE (pessimistic lock)\nBEGIN;\n  SELECT stock FROM products WHERE id = 42 FOR UPDATE;\n  -- This LOCKS the row. Second user waits here until first commits.\n  -- If stock >= 1, proceed:\n  UPDATE products SET stock = stock - 1 WHERE id = 42;\n  INSERT INTO orders (user_id, product_id, quantity) VALUES (1, 42, 1);\nCOMMIT;\n-- When first user commits, second user reads updated stock = 0 and fails.\n\n// MongoDB equivalent (atomic):\nconst result = await Product.updateOne(\n  { _id: productId, stock: { $gte: 1 } },  // condition: stock must be >= 1\n  { $inc: { stock: -1 } }\n);\nif (result.modifiedCount === 0) {\n  throw new Error('Out of stock');\n}\nawait Order.create({ userId, productId, quantity: 1 });"
  },
  {
    id: 'db-93',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'You need to store session data for 1 million users — sessions should auto-expire after 2 hours. Which database do you use and how do you implement auto-expiry?',
    requiresCode: true,
    idealAnswer: "Redis is the best choice for session storage. It is an in-memory key-value store with built-in TTL (Time To Live) support. You set a session key with EX (expiry in seconds) and Redis automatically deletes it after that time — no cron jobs needed. Redis handles millions of reads/writes per second with sub-millisecond latency. MongoDB with TTL indexes is the second choice. PostgreSQL is the worst choice because you would need manual cleanup cron jobs and it is slower for key-value access patterns.",
    realLifeScenario: "An ecommerce platform with 1 million concurrent users. Each user's session stores their cart, authentication token, and preferences. Redis handles this with 50MB of memory, sub-millisecond reads, and automatic expiry. Using PostgreSQL would require a table with 1 million rows, periodic DELETE queries to clean expired sessions, and 100x slower reads.",
    codingExample: "// Best: Redis with TTL\nconst redis = require('ioredis');\nconst client = new Redis();\n\n// Store session with 2-hour expiry\nawait client.set(\n  `session:${sessionId}`,\n  JSON.stringify({ userId: 42, cart: [...], role: 'customer' }),\n  'EX', 7200  // expires in 7200 seconds (2 hours) automatically\n);\n\n// Read session\nconst session = JSON.parse(await client.get(`session:${sessionId}`));\n// Returns null if expired — no manual cleanup needed!\n\n// Alternative: MongoDB with TTL index\nconst sessionSchema = new Schema({\n  sessionId: { type: String, unique: true },\n  userId: ObjectId,\n  data: Schema.Types.Mixed,\n  createdAt: { type: Date, default: Date.now }\n});\n// TTL index: MongoDB auto-deletes documents after 7200 seconds\nsessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7200 });\n\n// Worst: PostgreSQL (requires manual cleanup)\n-- CREATE TABLE sessions (id TEXT PRIMARY KEY, data JSONB, expires_at TIMESTAMP);\n-- Need a cron job: DELETE FROM sessions WHERE expires_at < NOW();\n-- This is slow and blocks the table during deletion"
  },
  {
    id: 'db-94',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'A client asks you to never permanently delete user data — only hide it. How do you implement soft delete in both PostgreSQL and MongoDB?',
    requiresCode: true,
    idealAnswer: "Soft delete means adding a deleted_at column (or is_deleted flag) instead of actually deleting rows. When you delete, you UPDATE the row to set deleted_at to current timestamp. All your SELECT queries must add WHERE deleted_at IS NULL to exclude soft-deleted records. The benefit is data recovery is easy — just set deleted_at back to NULL. The tradeoff is every query needs the filter, and the table grows forever. Use a partial index on deleted_at IS NULL for performance.",
    realLifeScenario: "A SaaS application where GDPR requires audit trails. When a user closes their account, their data is soft-deleted (hidden from the app) but retained for 90 days for compliance. After 90 days, a background job permanently deletes it. If a user requests account recovery within 90 days, you just clear the deleted_at field.",
    codingExample: "-- PostgreSQL Soft Delete\nALTER TABLE users ADD COLUMN deleted_at TIMESTAMP DEFAULT NULL;\n\n-- Soft delete a user (instead of DELETE)\nUPDATE users SET deleted_at = NOW() WHERE id = 42;\n\n-- All queries must exclude deleted records\nSELECT * FROM users WHERE deleted_at IS NULL;\n\n-- Create a partial index for performance\nCREATE INDEX idx_users_active ON users(id) WHERE deleted_at IS NULL;\n\n-- Restore a soft-deleted user\nUPDATE users SET deleted_at = NULL WHERE id = 42;\n\n-- Create a VIEW for convenience\nCREATE VIEW active_users AS SELECT * FROM users WHERE deleted_at IS NULL;\nSELECT * FROM active_users; -- automatically excludes deleted\n\n// MongoDB Soft Delete\nconst userSchema = new Schema({\n  name: String,\n  email: String,\n  deletedAt: { type: Date, default: null }\n});\n\n// Mongoose middleware to auto-exclude deleted documents\nuserSchema.pre(/^find/, function() {\n  this.where({ deletedAt: null }); // auto-filter on every find query\n});\n\n// Soft delete\nawait User.updateOne({ _id: userId }, { $set: { deletedAt: new Date() } });\n\n// Restore\nawait User.updateOne({ _id: userId }, { $unset: { deletedAt: '' } });\n\n// To include deleted users (admin view), bypass middleware:\n// await User.find().setOptions({ strict: false });"
  },
  {
    id: 'db-95',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'You are migrating an existing MongoDB app to PostgreSQL. What are the 3 biggest challenges you will face?',
    requiresCode: true,
    idealAnswer: "The three biggest challenges are: First, schema design transformation — MongoDB's flexible nested documents must be normalized into related tables with foreign keys. Embedded arrays become separate tables with joins. Second, query rewriting — all MongoDB queries, aggregations, and update operators ($set, $push, $inc) must be rewritten as SQL. Third, data migration — converting BSON documents to relational rows, handling inconsistent schemas across documents (some have fields others don't), and mapping ObjectIds to integer/UUID primary keys. Additional challenges include handling MongoDB-specific features like TTL indexes, change streams, and flexible schemas.",
    realLifeScenario: "A startup that began with MongoDB for speed now needs PostgreSQL for complex reporting, joins, and ACID transactions. The migration takes 3 months because embedded order items need a separate table, aggregation pipelines need SQL rewrites, and 2 years of documents have inconsistent schemas that must be cleaned before inserting into strict SQL tables.",
    codingExample: "// Challenge 1: Schema Transformation\n// MongoDB (embedded):\n{\n  _id: ObjectId('abc'),\n  name: 'John',\n  addresses: [\n    { type: 'home', city: 'Delhi' },\n    { type: 'work', city: 'Mumbai' }\n  ],\n  orders: [{ total: 500, items: [...] }]\n}\n\n-- PostgreSQL (normalized — 4 tables instead of 1 document):\n-- users (id, name)\n-- addresses (id, user_id FK, type, city)\n-- orders (id, user_id FK, total)\n-- order_items (id, order_id FK, product_id FK, qty, price)\n\n// Challenge 2: Query Rewriting\n// MongoDB:\n// db.users.find({ 'addresses.city': 'Delhi' })\n\n-- PostgreSQL:\n-- SELECT u.* FROM users u\n-- JOIN addresses a ON u.id = a.user_id\n-- WHERE a.city = 'Delhi';\n\n// MongoDB update:\n// db.users.updateOne({_id}, { $push: { addresses: { type: 'other', city: 'Pune' } } })\n\n-- PostgreSQL:\n-- INSERT INTO addresses (user_id, type, city) VALUES (1, 'other', 'Pune');\n\n// Challenge 3: Data Migration Script\n// const users = await mongoDb.collection('users').find().toArray();\n// for (const user of users) {\n//   const [pgUser] = await pgPool.query(\n//     'INSERT INTO users (name) VALUES ($1) RETURNING id', [user.name]\n//   );\n//   for (const addr of user.addresses || []) {  // handle missing field!\n//     await pgPool.query(\n//       'INSERT INTO addresses (user_id, type, city) VALUES ($1,$2,$3)',\n//       [pgUser.id, addr.type, addr.city]\n//     );\n//   }\n// }"
  },
  {
    id: 'db-96',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'What is the difference between findOne() and find().limit(1) in MongoDB — are they the same?',
    requiresCode: true,
    idealAnswer: "They are similar but not identical. findOne() returns a single document object directly (or null). find().limit(1) returns a cursor that yields one document — you still need to call .next() or .toArray() to get the actual document. In Mongoose, findOne() returns a document and find().limit(1) returns an array with one element. Performance-wise they are nearly identical — both stop after finding one match. The key difference is the return type and how you handle the result in code.",
    realLifeScenario: "A developer writes const user = await User.find({ email }).limit(1) and then does user.name — it fails because user is an array, not an object. Using findOne returns the object directly. This is a common mistake when switching between find and findOne in code reviews.",
    codingExample: "// findOne — returns a single document or null\nconst user = await User.findOne({ email: 'a@b.com' });\nconsole.log(user.name);  // Works directly\nconsole.log(user);       // { _id: ..., name: 'John', email: 'a@b.com' }\n\n// find().limit(1) — returns an array with one element\nconst users = await User.find({ email: 'a@b.com' }).limit(1);\nconsole.log(users);      // [{ _id: ..., name: 'John', email: 'a@b.com' }]\nconsole.log(users[0].name);  // Need [0] to access the document\n\n// Native MongoDB driver difference:\n// findOne() returns: { _id: ..., name: 'John' }\n// find().limit(1) returns: Cursor object (need .next() or .toArray())\n\n// When to use which:\n// findOne — when you expect exactly one result (login, find by ID)\n// find().limit(1) — rarely needed, but useful in aggregation pipelines"
  },
  {
    id: 'db-97',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'Can a table have more than one Primary Key? What about Unique Keys?',
    requiresCode: true,
    idealAnswer: "A table can have only ONE Primary Key, but that key can be a composite key made of multiple columns. A table can have multiple Unique Keys (constraints). The difference is: Primary Key does not allow NULL and there can be only one per table. Unique Key allows one NULL value (in most databases) and you can have as many as needed. Both enforce uniqueness but Primary Key also defines the physical storage order of the table in some databases (clustered index).",
    realLifeScenario: "In an order_items table, the primary key is a composite of (order_id, product_id) — ensuring each product appears only once per order. Additionally, you might have a unique constraint on a sku_code column. The table has one primary key (composite) and one unique key — both serve different purposes.",
    codingExample: "-- One Primary Key (can be composite)\nCREATE TABLE order_items (\n  order_id INT REFERENCES orders(id),\n  product_id INT REFERENCES products(id),\n  quantity INT NOT NULL,\n  price DECIMAL(10,2) NOT NULL,\n  PRIMARY KEY (order_id, product_id)  -- composite PK: 2 columns, but 1 PK\n);\n\n-- Multiple Unique Keys (allowed)\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,           -- Primary Key (only one)\n  email VARCHAR(255) UNIQUE,       -- Unique Key 1\n  phone VARCHAR(15) UNIQUE,        -- Unique Key 2\n  username VARCHAR(50) UNIQUE,     -- Unique Key 3\n  name VARCHAR(100)\n);\n\n-- Key differences:\n-- PRIMARY KEY: NOT NULL + UNIQUE + only 1 per table + clustered index\n-- UNIQUE KEY:  allows NULL + multiple per table + non-clustered index\n\n-- NULL behavior in UNIQUE:\nINSERT INTO users (email) VALUES (NULL);  -- OK\nINSERT INTO users (email) VALUES (NULL);  -- PostgreSQL: OK (multiple NULLs allowed)\n                                          -- MySQL: OK\n                                          -- SQL Server: ERROR (only one NULL)"
  },
  {
    id: 'db-98',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'What is a covering index and why is it the fastest type of index lookup?',
    requiresCode: true,
    idealAnswer: "A covering index is an index that contains ALL the columns needed by a query — so the database can answer the query using ONLY the index without ever touching the actual table data. This is called an index-only scan. It is the fastest because table data is stored on disk in random order, but the index is a compact, ordered B-tree structure. Skipping the table lookup saves disk I/O which is the biggest bottleneck in database performance.",
    realLifeScenario: "A product listing API only needs name and price. If you create an index on (category, name, price), a query filtering by category and selecting name and price never touches the products table — the index has everything. On a 10 million row table, this can be 10x faster than a regular index lookup that also reads table rows.",
    codingExample: "-- Regular index (not covering):\nCREATE INDEX idx_category ON products(category);\nSELECT name, price FROM products WHERE category = 'Electronics';\n-- Step 1: Index lookup -> finds matching row IDs\n-- Step 2: Table lookup -> fetches name, price from table (slow disk I/O)\n-- EXPLAIN shows: Index Scan + Heap Fetches\n\n-- Covering index (includes all needed columns):\nCREATE INDEX idx_covering ON products(category, name, price);\nSELECT name, price FROM products WHERE category = 'Electronics';\n-- Step 1: Index lookup -> finds matches AND has name, price already!\n-- Step 2: NO table lookup needed!\n-- EXPLAIN shows: Index Only Scan (fastest)\n\n-- PostgreSQL INCLUDE syntax (non-key columns in index):\nCREATE INDEX idx_cover ON products(category) INCLUDE (name, price);\n-- category is searchable, name and price are just stored in the index\n-- Index is smaller than putting all 3 in the key\n\n-- Tradeoff: covering indexes use more disk space and slow down writes\n-- Only create them for your most critical, frequently-run queries"
  },
  {
    id: 'db-99',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'You run EXPLAIN ANALYZE on a query and see Seq Scan on a table with 5 million rows. What does this mean and what are your options?',
    requiresCode: true,
    idealAnswer: "Seq Scan means Sequential Scan — the database is reading every single row in the table from start to finish. On 5 million rows, this is extremely slow. Your options are: First, create an index on the column used in WHERE clause. Second, check if your WHERE condition uses a function on the column — like WHERE LOWER(email) causes index to not be used. Third, if you are selecting a large percentage of the table (like 70%), Seq Scan might actually be correct because index lookups with many random disk reads can be slower than one sequential read.",
    realLifeScenario: "A developer deploys a new feature and suddenly the database CPU spikes to 100%. EXPLAIN ANALYZE reveals Seq Scan on a 5 million row users table for WHERE email = value. Adding an index on email drops the scan from Seq Scan (2.3 seconds) to Index Scan (0.4 milliseconds). The database CPU drops to 5%.",
    codingExample: "-- EXPLAIN ANALYZE output showing Seq Scan:\nEXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';\n-- Seq Scan on users (cost=0.00..185432.00 rows=5000000 width=128)\n--   Filter: (email = 'a@b.com')\n--   Rows Removed by Filter: 4999999\n--   Actual time: 2345.123ms\n\n-- Fix 1: Add index\nCREATE INDEX idx_users_email ON users(email);\n-- Now: Index Scan using idx_users_email (cost=0.43..8.45)\n--   Actual time: 0.042ms  (55000x faster!)\n\n-- Fix 2: Function on column prevents index usage\nSELECT * FROM users WHERE LOWER(email) = 'a@b.com'; -- Seq Scan!\n-- Fix: CREATE INDEX idx_lower_email ON users(LOWER(email)); -- expression index\n\n-- Fix 3: Seq Scan is OK when reading most of the table\nSELECT * FROM users WHERE is_active = true;\n-- If 90% of users are active, Seq Scan is actually faster than index\n-- Because: 1 sequential read > 4.5 million random index lookups\n\n-- Force index scan (usually not recommended, let planner decide):\n-- SET enable_seqscan = off; -- only for debugging!"
  },
  {
    id: 'db-100',
    categoryId: 'db-integration',
    categoryName: 'Database Integration',
    text: 'What is the difference between $push and $addToSet in MongoDB?',
    requiresCode: true,
    idealAnswer: "$push adds an element to an array regardless of whether it already exists — allowing duplicates. $addToSet adds an element only if it does not already exist in the array — preventing duplicates. Both are atomic operators. Use $push when duplicates are fine (like adding a comment). Use $addToSet when you want unique values only (like adding a tag or a user to a followers list). For objects, $addToSet checks exact match of all fields.",
    realLifeScenario: "A social media app where users can like a post. Using $push on the likes array would let a user like the same post multiple times. Using $addToSet ensures each userId appears only once in the likes array — enforcing one-like-per-user at the database level without needing application logic.",
    codingExample: "// $push — allows duplicates\ndb.posts.updateOne(\n  { _id: postId },\n  { $push: { comments: { userId: 'u1', text: 'Nice!' } } }\n);\n// Array: ['Nice!', 'Great!', 'Nice!'] — duplicates allowed\n\n// $addToSet — prevents duplicates\ndb.posts.updateOne(\n  { _id: postId },\n  { $addToSet: { likes: userId } }\n);\n// First call:  likes: ['u1']     — added\n// Second call: likes: ['u1']     — NOT added (already exists)\n\n// $addToSet with $each — add multiple unique values\ndb.products.updateOne(\n  { _id: productId },\n  { $addToSet: { tags: { $each: ['sale', 'new', 'featured'] } } }\n);\n\n// With Mongoose:\nawait Post.findByIdAndUpdate(postId, {\n  $addToSet: { likes: userId }  // user can only like once\n});\n\n// To remove from array: use $pull\nawait Post.findByIdAndUpdate(postId, {\n  $pull: { likes: userId }  // unlike\n});\n\n// Summary:\n// $push     → always adds (good for comments, logs, history)\n// $addToSet → adds only if unique (good for likes, tags, followers)\n// $pull     → removes matching elements\n// $pop      → removes first (-1) or last (1) element"
  },
];
