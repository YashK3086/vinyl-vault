// Central Data Vault for Yashvardhan Khanna's Portfolio
// Explicit, type-safe representation of projects, credentials, and assets.

export const FAVORITE_BANDS = [
  {
    name: "Pink Floyd",
    album: "Dark Side Moon",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Daft Punk",
    album: "Random Access Memories",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Led Zeppelin",
    album: "Led Zeppelin IV",
    coverUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Tame Impala",
    album: "Currents",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Radiohead",
    album: "Kid A",
    coverUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "The Beatles",
    album: "Abbey Road",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Queen",
    album: "Night at Opera",
    coverUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Miles Davis",
    album: "Kind of Blue",
    coverUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=600&auto=format&fit=crop",
  }
];

export const VINYL_VAULT = [
  {
    id: "automated-blue-green-pipeline",
    title: "Automated Blue-Green Deployment & Observability Pipeline",
    subtitle: "Release Engineering, Zero-Downtime Cutover & Full-Stack Telemetry",
    category: "Cloud & DevOps",
    releaseYear: 2026,
    color: "bg-blue-600",
    labelColor: "#2563eb",
    repoUrl: "https://github.com/YashK3086/blue-green",
    tags: ["AWS EKS", "Jenkins", "Terraform", "Prometheus", "Grafana", "ZapDats", "Docker", "GitOps", "Nginx/ALB", "Canary Rollback"],
    tracks: [
      {
        name: "A-Side: Dual-Environment EKS Architecture & Blue-Green Traffic Cutover",
        desc: "Architected a zero-downtime Blue-Green deployment pipeline using AWS EKS, Docker, Terraform, and Jenkins CI/CD. Maintained twin Blue (live production) and Green (staging/new release) target groups behind AWS Application Load Balancers (ALB) and Nginx dynamic ingress controllers, executing instant DNS and weight shifts upon validation."
      },
      {
        name: "A-Side: Infrastructure as Code (Terraform) & Automated Canary Safeguards",
        desc: "Formulated modular Infrastructure as Code (IaC) with Terraform for automated provisioning of VPCs, EKS node groups, security groups, and IAM roles. Embedded dynamic Canary health checks into Jenkins pipelines to validate staging pod health, database migrations, and synthetic HTTP response times before cutover."
      },
      {
        name: "B-Side: Prometheus Real-Time Metrics & Automated Threshold Rollbacks",
        desc: "Integrated Prometheus monitoring across Blue and Green EKS clusters to scrape real-time telemetry (HTTP request rates, p95/p99 latency, 5xx error rates, CPU/Memory utilization, and pod restarts). Configured automated Prometheus alert triggers: if Green 5xx error rates exceed 0.5% or p99 latency spikes above 200ms during validation, ALB traffic is instantly reverted back to Blue."
      },
      {
        name: "B-Side: Grafana Dashboards & ZapDats Telemetry Integration",
        desc: "Configured Grafana monitoring dashboards displaying side-by-side telemetry of Blue vs Green cluster performance, traffic distribution ratios, and deployment duration logs. Integrated ZapDats operational data streams for real-time log ingestion, vulnerability detection, and dynamic route audit logging, creating a unified observability control plane."
      }
    ]
  },
  {
    id: "smart-serverless-music-app",
    title: "Smart Serverless Cloud Data & Music Platform",
    subtitle: "Distributed ETL, AWS Serverless Architecture & Real-Time ML Inference",
    category: "Full-Stack & Cloud",
    releaseYear: 2026,
    color: "bg-purple-600",
    labelColor: "#9333ea",
    repoUrl: "https://github.com/YashK3086/FullStack-Music-App",
    tags: ["Next.js", "AWS Lambda", "AWS S3", "AWS Glue", "PySpark", "Snowflake", "SageMaker", "n8n", "REST APIs"],
    tracks: [
      {
        name: "A-Side: Serverless Event-Driven Data Ingestion & AWS Glue PySpark ETL",
        desc: "Engineered an end-to-end serverless data processing platform using Next.js, AWS S3, and AWS Lambda. Automated high-throughput user activity event ingestion via S3 triggers that spin up AWS Glue PySpark ETL jobs to clean, aggregate, and structure raw streaming data into optimized columnar Parquet formats."
      },
      {
        name: "A-Side: AWS SageMaker Recommendation Engine & Low-Latency API Gateway",
        desc: "Integrated an AWS SageMaker KNN machine learning recommendation model accessible via AWS API Gateway and Lambda functions. Optimized request routing to achieve sub-80ms API response times for real-time personalized song recommendations and user behavioral clustering."
      },
      {
        name: "B-Side: Snowflake Data Lake Warehouse Integration & Automated Analytics",
        desc: "Built automated ingestion pipelines delivering structured analytical data into Snowflake data warehouse tables. Enabled real-time SQL analytical queries and custom reporting dashboards for user retention, stream duration analytics, and data pipeline health monitoring."
      },
      {
        name: "B-Side: Workflow Orchestration & Data System Performance Optimization",
        desc: "Configured n8n workflow automation to coordinate multi-stage ETL task chains, error notification webhooks, and third-party music metadata ingestion, reducing manual data maintenance overhead by 45% and ensuring 99.9% pipeline uptime."
      }
    ]
  },
  {
    id: "ai-translator-web-app",
    title: "AI-Powered Multi-Lingual Translation & Microservice Platform",
    subtitle: "Cloud NLP Microservices, Redis Caching & Scalable API Architecture",
    category: "AI & Cloud Microservices",
    releaseYear: 2026,
    color: "bg-emerald-600",
    labelColor: "#059669",
    repoUrl: "https://github.com/YashK3086/AI-Translator-Web-Application",
    tags: ["Python", "FastAPI", "Docker", "AWS EC2", "OpenAI / HuggingFace API", "Redis", "Prometheus", "REST APIs"],
    tracks: [
      {
        name: "A-Side: Microservice Containerization & FastAPI Async Execution",
        desc: "Designed and containerized an asynchronous translation microservice built with Python and FastAPI. Implemented multi-stage Docker builds to produce slim, security-scanned production images deployed onto AWS EC2 instances with auto-scaling rules."
      },
      {
        name: "A-Side: High-Performance Distributed Caching with Redis",
        desc: "Implemented an in-memory Redis caching layer to cache translation payload pairs, reducing redundant external LLM/NLP API calls by 60% and dropping API response times from 1.2s to under 45ms for cached phrases."
      },
      {
        name: "B-Side: Cloud Telemetry, Rate Limiting & Prometheus Monitoring",
        desc: "Added Prometheus instrumented endpoints to monitor microservice request throughput, memory consumption, latency quantiles, and API rate-limiting thresholds, enabling proactive cluster scaling during traffic spikes."
      },
      {
        name: "B-Side: Secure API Key Governance & CI/CD Pipeline Automation",
        desc: "Built secure credential management using AWS Secrets Manager and automated CI/CD workflows with GitHub Actions for automated unit testing, linting, and zero-downtime microservice container deployments."
      }
    ]
  },
  {
    id: "corporate-visitor-data-warehouse",
    title: "Corporate Visitor Gate Pass & Data Warehouse System",
    subtitle: "Relational Schema Design, Snowflake Analytics & Transactional Auditing",
    category: "Cloud & Data Engineering",
    releaseYear: 2025,
    color: "bg-amber-600",
    labelColor: "#d97706",
    repoUrl: "https://github.com/YashK3086/Visitor-Gate-Pass-Management-",
    tags: ["Snowflake", "SQL", "PostgreSQL", "Data Modeling (BCNF)", "AWS Glue", "Python", "Transactional Triggers"],
    tracks: [
      {
        name: "A-Side: BCNF Relational Schema & Data Warehouse Modeling",
        desc: "Designed a Boyce-Codd Normal Form (BCNF) relational schema from first principles for enterprise visitor, security pass, and facility tracking. Built staging and dimensional data warehouse tables optimized for analytical SQL querying and reporting."
      },
      {
        name: "A-Side: Snowflake Integration & ETL Pipeline Staging",
        desc: "Integrated Snowflake data warehousing for large-scale visitor telemetry storage. Built automated Python & AWS Glue ETL scripts to load transaction logs into Snowflake external stages and target star-schema tables, reducing query latency by 40%."
      },
      {
        name: "B-Side: Backend Logging, Cursors & Transactional Audit Triggers",
        desc: "Built robust database security and governance mechanisms using PostgreSQL stored procedures, transactional triggers, and cursor-based audit logs to track every check-in/check-out event with 100% compliance auditability."
      },
      {
        name: "B-Side: Operational Analytics & Automated Facilities Dashboard",
        desc: "Developed SQL analytical views to compute real-time peak visitor volume, facility occupancy metrics, and security anomaly detection, providing facility managers with actionable operational insights."
      }
    ]
  }
];

export const EXPERIENCE_CERTIFICATES = {
  education: [
    {
      institution: "SRM Institute of Science and Technology",
      location: "Chennai, TN",
      degree: "B.Tech in Computer Science (Cloud Computing) – CGPA: 7.97 / 10.0 (No Backlogs)",
      duration: "2023 – 2027",
    },
    {
      institution: "Delhi Public School",
      location: "Jodhpur, RJ",
      degree: "High School (Class XII (CBSE): 83.4% | Class X (CBSE): 90.2%)",
      duration: "2021 – 2023",
      grade: "CBSE Curriculum"
    }
  ],
  certifications: [
    {
      name: "Cisco Certified Ethical Hacker",
      issuer: "Cisco",
      status: "Active",
      credlyUrl: "https://www.credly.com/users/yashvardhan-khanna.1cd7d08c/edit#credly"
    },
    {
      name: "Python and SQL for Data Analytics",
      issuer: "Accredited",
      status: "Active"
    },
    {
      name: "GitHub CoPilot-300",
      issuer: "GitHub",
      status: "Active"
    }
  ],
  leadershipAchievements: [
    {
      role: "School Head Boy",
      organization: "School Leadership Council",
      desc: "Managed student operations, coordinated school activities, and served as primary student leader."
    },
    {
      role: "Organizing Committee",
      organization: "Model United Nations (MUN)",
      desc: "Served on Delegate Affairs Team, managing delegate relations and conference logistics."
    },
    {
      role: "National-level Cycle Polo athlete",
      organization: "Sports Federation",
      desc: "Proving collaborative teamwork and endurance in high-level athletic competitions."
    }
  ],
  experience: [
    {
      company: "Wissen Technology",
      role: "Technical Intern – Cloud & Data Engineering",
      location: "Bangalore, India",
      duration: "Jul 21, 2026 – Present",
      bullets: [
        "Acquired hands-on exposure to Data Engineering fundamentals, learning cloud data warehousing architecture and data warehousing concepts utilizing Snowflake.",
        "Gained comprehensive understanding of cloud computing practices, studying infrastructure automation patterns, Terraform deployment configurations, and cloud security frameworks.",
        "Learned enterprise application containerization, exploring Docker container management, virtualized staging environments, and post-production operational workflows."
      ]
    }
  ]
};

