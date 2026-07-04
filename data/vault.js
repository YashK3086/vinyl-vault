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
    id: "smart-serverless-music-app",
    title: "Smart Serverless Web App",
    subtitle: "Workflow Automation",
    category: "Full-Stack & AI",
    releaseYear: 2024,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex for SVG styling
    tags: ["Next.js", "SageMaker", "Lambda", "n8n", "AWS Glue", "PySpark"],
    tracks: [
      {
        name: "A-Side: Automated Backend Data Workflows",
        desc: "Designed an end-to-end SaaS platform connecting a Next.js frontend to automated backend data workflows built with AWS Glue and PySpark, improving file ingestion speed and reducing pipeline latency."
      },
      {
        name: "A-Side: SageMaker KNN Integration",
        desc: "Integrated a SageMaker KNN model to power real-time contextual recommendations within the app."
      },
      {
        name: "B-Side: Global State Management",
        desc: "Implemented global state management and optimistic UI updates to improve perceived responsiveness."
      }
    ]
  },
  {
    id: "ai-translator-web-app",
    title: "AI Translator App",
    subtitle: "Speech Recognition & Translation",
    category: "Full-Stack & AI",
    releaseYear: 2025,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["JavaScript", "AI Translation", "Deep Learning", "Web Speech API", "React", "Node.js"],
    tracks: [
      {
        name: "A-Side: Neural Machine Translation",
        desc: "Integrated translation models with debounced speech recognition pipelines to translate vocal inputs in real-time."
      },
      {
        name: "A-Side: Web Speech API Integration",
        desc: "Configured synthesizer parameters to stream audio outputs with adjustable speeds and locale-specific accents."
      },
      {
        name: "B-Side: Client UI State Machine",
        desc: "Implemented clean language pair configurations, request queueing mechanisms, and visual typing feedback."
      }
    ]
  },
  {
    id: "automated-blue-green-pipeline",
    title: "Automated Infrastructure",
    subtitle: "CI/CD Pipeline",
    category: "DevOps & Cloud",
    releaseYear: 2024,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["AWS EKS", "Jenkins", "Terraform", "GitOps"],
    tracks: [
      {
        name: "A-Side: Infrastructure as Code",
        desc: "Built infrastructure-as-code with Terraform and Jenkins to automate environment provisioning and change management."
      },
      {
        name: "A-Side: Custom Validation Checks",
        desc: "Created custom validation checks to speed up automated rollback during pipeline failures."
      },
      {
        name: "B-Side: Pipeline Telemetry",
        desc: "Routed pipeline telemetry to Slack to improve visibility and reduce time-to-response for cross-functional engineering teams."
      }
    ]
  },
  {
    id: "devops-monitoring-system",
    title: "DevOps Monitoring System",
    subtitle: "Prometheus & Grafana Infrastructure",
    category: "DevOps & Cloud",
    releaseYear: 2026,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["Prometheus", "Grafana", "Node Exporter", "Docker", "Alertmanager", "System Metrics"],
    tracks: [
      {
        name: "A-Side: Prometheus Telemetry Ingest",
        desc: "Configured node exporter scrapers and custom metric endpoints to collect hardware, memory, and database utilization."
      },
      {
        name: "A-Side: Grafana Visual Dashboards",
        desc: "Created dynamic, parameter-driven system health dashboards with unified panel views and threshold indicators."
      },
      {
        name: "B-Side: Alerting & Thresholds",
        desc: "Set up target threshold alarms on Alertmanager routing high-priority disk and CPU exhaust alerts to incident handlers."
      }
    ]
  },
  {
    id: "iot-security-stream-cipher",
    title: "IoT Secure Stream Cipher",
    subtitle: "Protocol",
    category: "Security & IoT",
    releaseYear: 2023,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["ESP32", "ChaCha20", "Agile"],
    tracks: [
      {
        name: "A-Side: 256-bit Encryption Protocol",
        desc: "Implemented a lightweight 256-bit end-to-end encryption protocol for resource-constrained IoT devices, avoiding traditional blocking middleware."
      },
      {
        name: "A-Side: Nonce Synchronization Scheme",
        desc: "Designed an asynchronous nonce-synchronization scheme to reduce packet overhead."
      },
      {
        name: "B-Side: Agile/Scrum Development",
        desc: "Managed project development in a peer team environment using Agile/Scrum, tracking tasks and cross-node testing targets across structured sprints on MS Planner."
      }
    ]
  },
  {
    id: "healthcare-devsecops",
    title: "Healthcare DevSecOps Pipeline",
    subtitle: "SAST/DAST & Compliance Gates",
    category: "Security & IoT",
    releaseYear: 2026,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["DevSecOps", "SAST/DAST", "Compliance", "Docker", "GitHub Actions", "SonarQube", "Trivy"],
    tracks: [
      {
        name: "A-Side: Security Scanning Phase",
        desc: "Automated container vulnerability scanning with Trivy and static code analysis with SonarQube on pull requests."
      },
      {
        name: "A-Side: HIPAA Compliance Audits",
        desc: "Implemented automated compliance checks for encryption, access controls, and logging in AWS-based deployments."
      },
      {
        name: "B-Side: CI/CD Pipeline Promotion",
        desc: "Configured multi-stage promotions with gated validation to restrict staging-to-production releases until security scores exceed 95%."
      }
    ]
  },
  {
    id: "corporate-visitor-data-warehouse",
    title: "Corporate Customer",
    subtitle: "Data Warehouse",
    category: "Data & AI",
    releaseYear: 2023,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["SQL", "Data Modeling", "ETL"],
    tracks: [
      {
        name: "A-Side: BCNF Relational Schema",
        desc: "Designed a normalized (BCNF) relational schema from first principles to reduce data redundancy and simplify query paths."
      },
      {
        name: "B-Side: Backend Logging & Validation",
        desc: "Built backend logging and validation workflows using transactional triggers and cursors to support audit requirements."
      }
    ]
  }
];

export const EXPERIENCE_CERTIFICATES = {
  education: [
    {
      institution: "SRM Institute of Science and Technology",
      location: "Chennai, TN",
      degree: "B.Tech in Computer Science (Cloud Computing)",
      duration: "2023 – 2027",

    },
    {
      institution: "Delhi Public School",
      location: "Jodhpur, RJ",
      degree: "High School (Class XII: 83.4% | Class X: 90.2%)",
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
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services (AWS)",
      status: "Pursuing"
    },
    {
      name: "Python, SQL, & Cloud Architecture Specializations",
      issuer: "Industry Accreditations",
      status: "Active"
    }
  ],
  leadershipAchievements: [
    {
      role: "Head Boy",
      organization: "School Leadership Council",
      desc: "Elected to lead the student body, coordinates cultural festivals, and serves as primary student liaison to administration."
    },
    {
      role: "Organizing Committee",
      organization: "Model United Nations (MUN)",
      desc: "Chaired and organized regional conferences for 200+ delegates, managing public relations and debate logistics."
    },
    {
      role: "National-level Cycle Polo athlete.",
      organization: "Sports Federation",
      desc: "Competed in high-level athletic championships, reinforcing team discipline and endurance under pressure."
    }
  ],
  experience: [
    {
      company: "Zetheta Algorithms",
      role: "Cloud DevOps Engineering Extern",
      location: "Bangalore, India (Remote)",
      duration: "Jul 2026 – Present",
      bullets: [
        "Contributing to a multi-stage CI/CD pipeline (GitHub Actions, ArgoCD) for a banking-domain project, including integration of automated security scanning steps (SAST/DAST) aligned with common compliance frameworks.",
        "Assisting in designing a zero-downtime schema migration approach for large PostgreSQL tables using an expand-contract pattern, coordinated with canary-style rollout via Istio.",
        "Supporting design of a multi-region disaster recovery strategy using AWS Aurora Global Database and DynamoDB cross-region replication, focused on reducing recovery time and data loss windows."
      ]
    }
  ]
};
