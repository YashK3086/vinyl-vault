// Central Data Vault for Yashvardhan Khanna's Portfolio
// Explicit, type-safe representation of projects, credentials, and assets.

export const FAVORITE_BANDS = [
  {
    name: "Pink Floyd",
    album: "The Dark Side of the Moon",
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
    album: "A Night at the Opera",
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
    title: "Smart Serverless SaaS Music App",
    subtitle: "Context-Filtered Streaming App",
    category: "Full-Stack & AI",
    releaseYear: 2024,
    color: "from-emerald-600 via-teal-500 to-cyan-600",
    labelColor: "#059669", // emerald-600 hex for SVG styling
    tags: ["Next.js", "SageMaker", "AWS Glue", "Lambda", "PySpark", "Librosa", "DynamoDB", "Python"],
    tracks: [
      {
        name: "A-Side: Feature Extraction Pipeline (PySpark)",
        desc: "Engineered an audio processing pipeline using AWS Glue & PySpark to execute Librosa audio signal processing (STFT/RMS) for automated feature extraction over rolling 10-second intervals."
      },
      {
        name: "A-Side: SageMaker KNN Re-Ranking",
        desc: "Deployed a SageMaker KNN machine learning model integrated with a serverless Lambda re-ranking architecture, driving real-time personalized user streaming content with a 20% discovery boost."
      },
      {
        name: "B-Side: Global State Machine",
        desc: "Optimized full-stack user states via a global Next.js AudioContext state machine, integrating debounced event handling and optimistic UI updates for real-time interface rendering."
      },
      {
        name: "B-Side: Low-Latency Context Filter",
        desc: "Built a low-latency context filter tracking user session matrices through DynamoDB TTL configurations, maintaining high performance under scaling metrics with sub-second backend execution."
      }
    ]
  },
  {
    id: "ai-translator-web-app",
    title: "AI Translator Web Application",
    subtitle: "Speech Recognition & Translation",
    category: "Full-Stack & AI",
    releaseYear: 2025,
    color: "from-pink-500 via-rose-500 to-red-600",
    labelColor: "#ec4899", // pink-500 hex
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
    title: "Automated Blue-Green SaaS CI/CD Pipeline",
    subtitle: "Zero-Downtime Cloud Deployment",
    category: "DevOps & Cloud",
    releaseYear: 2024,
    color: "from-blue-600 via-indigo-500 to-purple-600",
    labelColor: "#2563eb", // blue-600 hex
    tags: ["AWS EKS", "Jenkins", "Terraform", "Argo Rollouts", "GitOps", "Prometheus", "Slack API"],
    tracks: [
      {
        name: "A-Side: GitOps Deployment",
        desc: "Architected a scalable cloud deployment pipeline using Jenkins, GitOps, and Terraform to guarantee 100% application availability during multi-tenant SaaS application version rollouts."
      },
      {
        name: "A-Side: Automated Production Assertions",
        desc: "Programmed automated live production assertions using custom Analysis Templates, dropping rollback execution windows to under 60s when identifying active HTTP faults."
      },
      {
        name: "B-Side: System Telemetry & Alerting",
        desc: "Integrated automated Slack alerts and Prometheus telemetry, increasing cross-functional agile issue response speed by 40%."
      }
    ]
  },
  {
    id: "devops-monitoring-system",
    title: "DevOps Monitoring System",
    subtitle: "Prometheus & Grafana Infrastructure",
    category: "DevOps & Cloud",
    releaseYear: 2026,
    color: "from-cyan-500 via-sky-500 to-blue-600",
    labelColor: "#06b6d4", // cyan-500 hex
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
    title: "IoT Security: Stream Cipher for LoRa E2EE",
    subtitle: "256-bit Microcontroller Encryption",
    category: "Security & IoT",
    releaseYear: 2023,
    color: "from-amber-600 via-red-500 to-rose-600",
    labelColor: "#d97706", // amber-600 hex
    tags: ["ESP32", "ChaCha20", "LoRa", "Cryptography", "C++", "Microcontrollers", "Agile"],
    tracks: [
      {
        name: "A-Side: Lightweight E2EE Protocol",
        desc: "Developed a 256-bit lightweight end-to-end encryption protocol for localized data transmission links to safely bypass standard middleware dependencies on resource-constrained microcontrollers."
      },
      {
        name: "A-Side: Dynamic Nonce Sync Pipeline",
        desc: "Created a custom 96-bit Dynamic Nonce synchronization pipeline, cutting baseline data overhead by eliminating 20% packet bloat."
      },
      {
        name: "B-Side: Device Energy Optimization",
        desc: "Achieved an 18% device energy efficiency optimization by shifting complex cryptographic overhead from block configurations into a stream-based deployment model."
      }
    ]
  },
  {
    id: "healthcare-devsecops",
    title: "Healthcare DevSecOps Pipeline",
    subtitle: "SAST/DAST & Compliance Gates",
    category: "Security & IoT",
    releaseYear: 2026,
    color: "from-rose-600 via-pink-500 to-red-600",
    labelColor: "#e11d48", // rose-600 hex
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
    title: "Corporate Visitor Data Warehouse",
    subtitle: "BCNF Database System",
    category: "Data & AI",
    releaseYear: 2023,
    color: "from-violet-600 via-purple-500 to-fuchsia-600",
    labelColor: "#7c3aed", // violet-600 hex
    tags: ["SQL", "Data Warehousing", "ETL Triggers", "Database Tuning", "Schema Design", "PostgreSQL"],
    tracks: [
      {
        name: "A-Side: BCNF Schema Design",
        desc: "Designed a robust BCNF-normalized data warehouse schema, reducing system data redundancy by 35% while significantly improving query processing throughput."
      },
      {
        name: "B-Side: Automated ETL Workflows",
        desc: "Automated relational state workflows using custom ETL triggers and system database cursors to harden runtime storage access log validation logs."
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
      grade: "First Class (70%+ Eligibility)"
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
      role: "National-level Athlete",
      organization: "Sports Federation",
      desc: "Competed in high-level athletic championships, reinforcing team discipline and endurance under pressure."
    }
  ]
};
