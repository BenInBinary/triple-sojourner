import { Question } from '../../types';

export const cloudQuestions: Question[] = [
  {
    id: 'cloud-61',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'How do you deploy a fullstack application to AWS?',
    requiresCode: false,
    idealAnswer: "Frontend static assets (React) navigate heavily towards S3 buckets mapped behind a CloudFront CDN. Backend Node APIs get containerized using Docker and deployed to ECS Fargate (or EC2). The DB sits in RDS.",
    realLifeScenario: "Deploying a Vite application using AWS CDK to provision an S3 Bucket + CloudFront distribution, while pushing a Docker image of an Express API to Amazon ECR triggering a rolling Fargate update.",
    codingExample: "aws s3 sync ./dist s3://my-frontend-bucket\naws cloudfront create-invalidation --distribution-id $ID --paths '/*'"
  },
  {
    id: 'cloud-62',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'What is Docker, and how do you use it for deployment?',
    requiresCode: true,
    idealAnswer: "Docker encapsulates an application and its underlying OS dependencies (like Node.js itself) into a standardized image wrapper. It guarantees that code running locally will run identically in production without environmental mismatches.",
    realLifeScenario: "A new developer joins the team. Instead of spending 5 hours installing PostgreSQL, Node 14, and Redis locally, they type `docker-compose up` and run the entire identical production-like stack flawlessly on their Macbook.",
    codingExample: "FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD [\"npm\", \"start\"]"
  },
  {
    id: 'cloud-63',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'Explain the difference between monolithic and microservices architectures.',
    requiresCode: false,
    idealAnswer: "A monolith bundles the entire application (User Management, Billing, Payments) into exactly one codebase/deployable unit. Microservices split these domains into isolated, independently deployable services communicating over the network.",
    realLifeScenario: "A legacy monolith slows down deployments because changing CSS triggers a full rebuilding of the Billing system. Splitting them into microservices allows the Frontend team to deploy 10x a day without impacting the monolithic Billing API.",
    codingExample: "Monolith: Single Git repo, 1 DB, 1 giant server.\nMicroservices: 10 Git repos, 10 distinct databases, isolated scaling via Kubernetes/ECS."
  },
  {
    id: 'cloud-64',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'How do you use AWS ECS or EKS for container orchestration?',
    requiresCode: false,
    idealAnswer: "ECS (Elastic Container Service) is AWS's native orchestrator managing Docker tasks across clusters using Fargate serverless compute. EKS handles Kubernetes, ideal if the dev team prefers universally standard Helm charts instead of locking into ECS.",
    realLifeScenario: "You need 50 instances of an API running simultaneously across 3 Availability Zones. ECS dynamically spins up Fargate tasks, continuously health checks them, and integrates them natively automatically into the Application Load Balancer target group.",
    codingExample: "AWS ECS definition:\nTask definition containing -> Container definition (Image URL from ECR, Port Mapping, Environment Variables)"
  },
  {
    id: 'cloud-65',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'What is the purpose of a reverse proxy, and how do you set it up using AWS?',
    requiresCode: false,
    idealAnswer: "A reverse proxy acts as an intermediary, intercepting traffic to the backend server. It handles SSL termination, caching, load balancing, and prevents direct internet exposure to application servers. AWS ALBs act as cloud-native reverse proxies. Other solutions involve running Nginx instances natively on EC2.",
    realLifeScenario: "Routing traffic dynamically. An ALB intercepts port 443 traffic, decrypts the SSL using AWS ACM certs, and routes traffic bound for `/api` to Node.js instances while dumping everything else directly to S3 statics.",
    codingExample: "Forward traffic from public port 80/443 directly to Node process running privately on port 3000. \n`proxy_pass http://localhost:3000;` (NGINX syntax)"
  },
  {
    id: 'cloud-66',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'What is the role of Terraform in infrastructure as code?',
    requiresCode: true,
    idealAnswer: "Terraform defines infrastructure mathematically as code (IaC) across multiple providers (AWS, GCP, Azure, GitHub). It manages infrastructure 'State', ensuring that real-world resources match the declarative code perfectly by calculating diffs.",
    realLifeScenario: "A company needs an identical staging and production infrastructure. Writing a Terraform module allows them to pass a `environment=prod` variable and recreate 50 AWS resources perfectly in minutes.",
    codingExample: "provider \"aws\" { region = \"us-east-1\" }\nresource \"aws_instance\" \"web\" {\n  ami = \"ami-123456\"\n  instance_type = \"t2.micro\"\n}"
  },
  {
    id: 'cloud-67',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'How do you configure HTTPS in an AWS-hosted application?',
    requiresCode: false,
    idealAnswer: "The widely-accepted method is utilizing AWS Certificate Manager (ACM) to provision free public SSL certificates. Ensure you attach this ACM cert to an Application Load Balancer (ALB) or a CloudFront Distribution, executing 'SSL offloading' before hitting private app resources.",
    realLifeScenario: "Provisioning an ACM cert for `api.startup.com`. Attaching it directly to an ALB. The ALB terminates the SSL payload securely, and securely communicates with pure internal HTTP back to the private Fargate tasks, heavily reducing CPU strain over Node doing decryption.",
    codingExample: "// SSL Offloading means your Node app never has to configure TLS explicitly.\n// The Load balancer handles certificate handshakes."
  },
  {
    id: 'cloud-68',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'What is the purpose of the .dockerignore file?',
    requiresCode: true,
    idealAnswer: "Much like .gitignore, a .dockerignore prevents massive, unnecessary, or sensitive files (like node_modules, .git, .env) from bloating the Docker image context when the `COPY . .` command executes during build pipelines.",
    realLifeScenario: "Preventing a local 500MB `node_modules` folder from halting the Docker build pipeline. Docker copies everything, realizes there implicitly missing node_modules, and creates them accurately within its own Alpine-based virtual memory.",
    codingExample: "# .dockerignore content\nnode_modules\nnpm-debug.log\n.git\n.env"
  },
  {
    id: 'cloud-69',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'How do you implement a multi-region deployment in AWS?',
    requiresCode: false,
    idealAnswer: "By deploying identically templated stacks (via CloudFormation/Terraform) to distinctly remote regions (e.g. `us-east-1` and `eu-central-1`). Traffic is globally routed efficiently utilizing Route53 Geolocation or Latency-based policies, routing European users to EU servers, mitigating ping times.",
    realLifeScenario: "To prevent completely globally catastrophic outages if `us-east-1` burns down. Route53 recognizes the US infrastructure failing health checks securely, and cascades 100% of global internet traffic magically to the EU backup region instantaneously.",
    codingExample: "Route53 Failover Record -> Primary ALBs in US-EAST -> Secondary ALBs in EU-WEST."
  },
  {
    id: 'cloud-70',
    categoryId: 'cloud',
    categoryName: 'Cloud and Deployment',
    text: 'What is AWS Lambda, and when would you use it?',
    requiresCode: false,
    idealAnswer: "AWS Lambda handles entirely auto-scaled serverless code execution natively supporting Python/Node/Go. Code functions only activate via programmatic invocations or AWS events without paying base EC2 instances continuously looping idle.",
    realLifeScenario: "An S3 bucket detects an image was successfully uploaded. It seamlessly triggers a Lambda. The Lambda executes a Python sharp manipulation script resizing the JPG heavily, saving it gracefully, executing literally in milliseconds and terminating inherently avoiding overhead costs.",
    codingExample: "exports.handler = async (event) => {\n  const message = `Hello ${event.name}`;\n  return { statusCode: 200, body: message };\n};"
  }
];
