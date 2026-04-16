import { Question } from '../../types';

export const awsQuestions: Question[] = [
  {
    id: 'aws-31',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'Explain the differences between EC2, Lambda, and Fargate.',
    requiresCode: false,
    idealAnswer: "EC2 provides raw VMs requiring full OS management. Lambda provides serverless function execution billed by millisecond. Fargate provides serverless container management without provisioning underlying EC2 VMs.",
    realLifeScenario: "Use EC2 for legacy monoliths needing OS access, Lambda for event-driven image resizing, and Fargate for migrating Dockerized microservices linearly.",
    codingExample: "AWS CLI to run a Lambda:\naws lambda invoke --function-name MyFunction response.json"
  },
  {
    id: 'aws-32',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'How do you set up auto-scaling in AWS?',
    requiresCode: false,
    idealAnswer: "By creating a Launch Template and an Auto Scaling Group (ASG) with policies based on CloudWatch metrics (e.g., target tracking average CPU to 60%). Load Balancers dynamically route traffic to new instances.",
    realLifeScenario: "An e-commerce site experiences 10x traffic during Black Friday. Auto-scaling spins up 20 new EC2 instances to handle the load and terminates them to save money late at night.",
    codingExample: "// Example Terraform resource for ASG\nresource \"aws_autoscaling_group\" \"app\" {\n  desired_capacity   = 2\n  max_size           = 10\n  min_size           = 1\n}"
  },
  {
    id: 'aws-33',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'What is an S3 bucket, and how is it used?',
    requiresCode: true,
    idealAnswer: "S3 is object-based storage for any file type. You create buckets, store objects (files) inside them with metadata, and map them to URLs or CDN distributions.",
    realLifeScenario: "Hosting a React static site build entirely out of S3 tied to CloudFront, ensuring near-infinite horizontal scalability without managing web servers.",
    codingExample: "import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';\nconst client = new S3Client({});\nawait client.send(new PutObjectCommand({\n  Bucket: 'my-images',\n  Key: 'avatar.png',\n  Body: fileStream\n}));"
  },
  {
    id: 'aws-34',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'How do you secure data stored in S3?',
    requiresCode: false,
    idealAnswer: "Block public access at the bucket level, utilize Bucket Policies/IAM for granular access, enable SSE-KMS (Server-Side Encryption), and leverage S3 Versioning against accidental deletions.",
    realLifeScenario: "Storing GDPR-sensitive user documents in S3, ensuring encryption at rest using AWS KMS, and removing public read access explicitly.",
    codingExample: "aws s3api put-bucket-encryption --bucket my-bucket \\\n --server-side-encryption-configuration '{\"Rules\":[{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\":\"AES256\"}}]}'"
  },
  {
    id: 'aws-35',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'What is IAM, and how do you manage permissions?',
    requiresCode: false,
    idealAnswer: "Identity and Access Management controls who (Users/Roles) can execute what Actions on which Resources. Managed via JSON policies adhering strictly to the principle of least privilege.",
    realLifeScenario: "Giving a Lambda function an IAM Role that explicitly allows `dynamodb:PutItem` on exactly one table ARN, blocking it from reading or dropping other tables.",
    codingExample: "{\n  \"Effect\": \"Allow\",\n  \"Action\": \"s3:GetObject\",\n  \"Resource\": \"arn:aws:s3:::my-bucket/*\"\n}"
  },
  {
    id: 'aws-36',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'Explain the difference between Elastic Load Balancer types.',
    requiresCode: false,
    idealAnswer: "ALB (Application) operates at Layer 7 (HTTP(S)) routing by paths/headers. NLB (Network) operates at Layer 4 (TCP/UDP) routing millions of packets per second with ultra-low latency.",
    realLifeScenario: "Mapping `/api/users` to EC2 Instance Group A and `/api/products` to Fargate Task Group B using an Application Load Balancer path rule.",
    codingExample: "// N/A - Architectural Concept\n// ALBs natively integrate with Route53 using Alias records."
  },
  {
    id: 'aws-37',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'What is the use of AWS CloudFormation?',
    requiresCode: true,
    idealAnswer: "CloudFormation handles Infrastructure as Code (IaC), allowing you to define entire AWS architectures using YAML or JSON templates, creating standard repeatable deployments via 'Stacks'.",
    realLifeScenario: "A startup providing SaaS environments dynamically spins up isolated VPCs, Databases, and Compute for new tenants exactly tracking their main template.",
    codingExample: "Resources:\n  MyBucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      BucketName: my-iac-bucket"
  },
  {
    id: 'aws-38',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'How do you monitor your applications using AWS CloudWatch?',
    requiresCode: false,
    idealAnswer: "Stream application logs to Log Groups, track native metrics (CPU/RAM) or Custom Metrics, and build Alarms that trigger SNS notifications or Auto-Scaling events when thresholds breach.",
    realLifeScenario: "Setting up a CloudWatch Alarm that triggers a PagerDuty API request immediately if the database RDS instances sustain 90% CPU usage for over 5 minutes.",
    codingExample: "const metricData = { MetricName: 'FailedLogins', Value: 1 };\n// Trigger aws-sdk cloudwatch.putMetricData(metricData)"
  },
  {
    id: 'aws-39',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'What is an AWS VPC, and why is it important?',
    requiresCode: false,
    idealAnswer: "Virtual Private Cloud physically isolates network environments. It protects backend resources (like Databases) in private subnets with no internet gateway, exposing only Load Balancers in public subnets.",
    realLifeScenario: "Preventing direct database exploitation by ensuring the RDS instance lives in a Private VPC Subnet that mathematically cannot be routed to via the public internet.",
    codingExample: "const vpc = new ec2.Vpc(this, 'VPC', {\n  maxAzs: 2, // AWS CDK definition\n  natGateways: 1\n});"
  },
  {
    id: 'aws-40',
    categoryId: 'aws',
    categoryName: 'AWS',
    text: 'How do you implement CI/CD pipelines using AWS CodePipeline?',
    requiresCode: false,
    idealAnswer: "Connect CodePipeline to a source (CodeCommit/GitHub). Trigger CodeBuild to run tests and compile artifacts, then use CodeDeploy to push artifacts to EC2/ECS/Lambda automatically.",
    realLifeScenario: "Pushing code to the `main` GitHub branch automatically triggers an AWS pipeline that builds a Docker image, pushes it to ECR, and forces ECS Fargate to update to the new image.",
    codingExample: "phases:\n  build:\n    commands:\n      - npm test\n      - docker build -t app:latest ."
  }
];
