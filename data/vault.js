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
    subtitle: "Experimental AI Systems",
    category: "Full-Stack & AI",
    releaseYear: 2026,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex for SVG styling
    tags: ["Next.js", "SageMaker", "Lambda", "n8n", "AWS Glue", "PySpark"],
    tracks: [
      {
        name: "A-Side: SaaS Specification & Data Pipelines",
        desc: "Participated in system specification and design of a SaaS platform, using AWS Glue and PySpark to build data pipelines that reduced latency."
      },
      {
        name: "A-Side: SageMaker KNN Integration",
        desc: "Applied experimental AI by integrating a SageMaker KNN model via REST APIs for real-time recommendations and operational efficiency."
      }
    ]
  },
  {
    id: "automated-blue-green-pipeline",
    title: "Automated Deployment Pipeline",
    subtitle: "Release Management & GitOps",
    category: "DevOps & Cloud",
    releaseYear: 2026,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["AWS EKS", "Jenkins", "Terraform", "GitOps"],
    tracks: [
      {
        name: "A-Side: Infrastructure as Code & Release Planning",
        desc: "Wrote high-quality software and IaC scripts with Terraform and Jenkins to automate environment provisioning and release planning."
      },
      {
        name: "A-Side: Custom Validation Safeguards",
        desc: "Implemented custom validation safeguards within CI/CD workflows to accelerate continuous recovery and boost team collaboration under tight deadlines."
      }
    ]
  },
  {
    id: "iot-security-stream-cipher",
    title: "IoT Secure Stream Cipher",
    subtitle: "Protocol & System Architecture",
    category: "Security & IoT",
    releaseYear: 2025,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["ESP32", "C++", "ChaCha20", "Agile"],
    tracks: [
      {
        name: "A-Side: 256-bit Encryption Protocol",
        desc: "Implemented a lightweight 256-bit encryption protocol in C++ for hardware nodes, executing direct driver code for high-performance data transfers."
      },
      {
        name: "A-Side: Nonce Synchronization Scheme",
        desc: "Architected an asynchronous nonce-synchronization scheme to minimize data overhead, collaborating in an Agile team across structured sprints."
      }
    ]
  },
  {
    id: "corporate-visitor-data-warehouse",
    title: "Corporate Financial Data Warehouse",
    subtitle: "System Modeling & Relational Schema",
    category: "Data & AI",
    releaseYear: 2025,
    color: "bg-red-600",
    labelColor: "#dc2626", // red-600 hex
    tags: ["SQL", "Data Modeling", "PostgreSQL"],
    tracks: [
      {
        name: "A-Side: BCNF Relational Schema",
        desc: "Designed a normalized (BCNF) relational schema from first principles to support strategic analytics and reduce redundancy by 35%."
      },
      {
        name: "B-Side: Backend Logging & Audit Validation",
        desc: "Built backend logging and audit validation workflows using transactional triggers and cursors to ensure continuous reliability and data governance."
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
      role: "Technical Intern – Cloud Engineering & AI Initiatives",
      location: "Bangalore, India",
      duration: "Jul 21, 2026 – Present",
      bullets: [
        "Building cloud infrastructure automation and enterprise data orchestration pipelines.",
        "Contributing to internal release planning and deployment workflows utilizing Terraform and GitOps to enforce strict engineering standards.",
        "Supporting multi-VM staging environments and building containerized applications (Docker) to optimize system reliability and software scaling."
      ]
    }
  ]
};
