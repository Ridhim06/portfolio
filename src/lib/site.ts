export const site = {
  name: "Ridhim Garg",
  role: "Backend-Focused Software Engineer",
  headline: "I build systems, not just features.",
  subheadline:
    "Backend-focused Software Engineer building production fintech systems with Python, Django, Celery, REST APIs, automation, integrations, and GenAI.",
  description:
    "Portfolio of Ridhim Garg, a backend-focused Software Engineer building production fintech systems with Python, Django, Celery, REST APIs, automation, integrations, and GenAI.",
  email: "ridhimgarg@gmail.com",
  linkedin: "https://linkedin.com/in/ridhim-garg-7b5740175",
  github: "https://github.com/Ridhim06",
  resumeUrl: "/resume.pdf",
  location: "Delhi / Noida, India",
  siteUrl: "https://ridhimgarg.dev",
} as const;

export const lifecycle = [
  "Requirements",
  "System Design",
  "Implementation",
  "Deployment",
  "Debugging",
  "Production Support",
] as const;

export type Metric = {
  value: string;
  label: string;
  detail?: string;
};

export const metrics: Metric[] = [
  { value: "4+", label: "years", detail: "building production fintech systems" },
  { value: "12", label: "Indian languages", detail: "supported by the LLM translation pipeline" },
  { value: "5,000+", label: "daily messages", detail: "handled by the notification service" },
  { value: "10,000+", label: "users supported", detail: "through an e-commerce platform migration" },
  { value: "50+", label: "clients", detail: "served through reusable ERPNext components" },
  { value: "30%", label: "less manual effort", detail: "in agreement management, after automation" },
  { value: "40%", label: "faster response times", detail: "after moving pipelines to async processing" },
  { value: "25%", label: "uptime improvement", detail: "during the ERP / e-commerce migration" },
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    items: ["Python", "Django", "FastAPI", "REST APIs", "Microservices"],
  },
  {
    title: "Async & Processing",
    items: ["Celery", "Redis", "Background Jobs", "Batch Processing"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MariaDB", "Redis"],
  },
  {
    title: "Frontend",
    items: ["JavaScript", "React"],
  },
  {
    title: "Cloud / DevOps",
    items: ["AWS", "Docker", "Git", "CI/CD"],
  },
  {
    title: "AI / GenAI",
    items: ["OpenAI APIs", "GPT-4.1", "LLM APIs", "Prompt Engineering", "Tool / Function Calling"],
  },
  {
    title: "Engineering",
    items: ["OOP", "SOLID", "System Design", "Data Structures & Algorithms", "Agile / Scrum"],
  },
];

export type ExperienceBullet = string;

export type ExperienceEntry = {
  company: string;
  companyNote?: string;
  role: string;
  start: string;
  end: string;
  location: string;
  current?: boolean;
  summary?: string;
  groups?: { title: string; bullets: ExperienceBullet[]; stack?: string[] }[];
  bullets?: ExperienceBullet[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Desiderata Impact Ventures Pvt. Ltd.",
    companyNote: "Progcap",
    role: "Software Engineer",
    start: "Nov 2022",
    end: "Present",
    location: "Delhi / Noida, India",
    current: true,
    groups: [
      {
        title: "Loan Management Platform",
        bullets: [
          "Built an LLM-powered (GPT-4.1) pipeline to translate Post-Sanction (PS) Kit clauses into 12 vernacular Indian languages, in line with RBI guidelines, integrated into the Leegality e-signature workflow in production; engineered clause-aware chunking and retry logic to fix translation degradation in low-resource scripts (e.g., Gurmukhi), with versioned document storage and failure alerting.",
          "Designed scalable fintech microservices and REST APIs for loan origination, user access, and communication workflows.",
          "Built an agreement management module from scratch, automating document tracking and validation — reducing manual effort by 30%.",
          "Implemented asynchronous background processing via Celery for high-volume pipelines — cutting response times by 40%; engineered a notification service handling 5,000+ daily messages.",
          "Optimized internal dashboards for real-time visibility into loan status and repayments; supported production systems through incident investigation and resolution.",
          "Own end-to-end automation of PS Kit generation — template-driven document workflows with automated field mapping — reducing manual intervention and processing errors.",
        ],
        stack: ["Python (Django)", "JavaScript", "React", "Celery", "MySQL/PostgreSQL", "OpenAI API (GPT-4.1)", "Microservices", "REST APIs", "Git"],
      },
      {
        title: "ERP Platform (ERPNext / Frappe)",
        bullets: [
          "Led an e-commerce platform migration ensuring feature parity and a 25% uptime improvement for 10,000+ users; extended ERPNext (Frappe) modules with reusable components for 50+ clients.",
          "Led an ERPNext version migration, resolving compatibility issues and stabilizing core modules; developed optimized SQL reports for stock, batch, and GST invoicing insights.",
        ],
        stack: ["Python", "Frappe (ERPNext)", "MariaDB", "JavaScript", "Git"],
      },
    ],
  },
  {
    company: "Volkswagen Group Technology Solutions India",
    role: "Software Engineer Trainee",
    start: "Aug 2022",
    end: "Oct 2022",
    location: "Gurugram, India",
    bullets: [
      "Completed structured training in Java programming (OOP, data structures, algorithms), building foundational knowledge applicable to enterprise-grade backend development.",
    ],
  },
  {
    company: "NCR Corporation",
    role: "IT Analyst Intern",
    start: "Jan 2022",
    end: "Jul 2022",
    location: "Gurugram, India",
    bullets: [
      "Enhanced BMC Remedy ITSM modules for incident and service request management; customized automated workflows using forms, filters, and active links to streamline IT service operations.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Technology, Information Technology",
  school: "G.L. Bajaj Institute of Technology and Management",
  location: "Greater Noida, India",
  cgpa: "8.41 / 10",
};

export const achievements = [
  {
    title: "Star Performer Award",
    description:
      "Recognized for consistently exceeding targets and delivering high-impact contributions in a production engineering environment.",
  },
  {
    title: "Hackathon — 2nd Prize",
    description:
      "Built a route optimization solution that boosted Sales & Collections team efficiency.",
  },
];

export const philosophy = [
  {
    title: "Own the workflow, not just the endpoint",
    description: "I care about what happens before and after an API call.",
  },
  {
    title: "Automate repetitive work",
    description: "If a process is manual and repeatable, it is a candidate for automation.",
  },
  {
    title: "Design for failure",
    description: "Retries, failure states, validation, and recovery matter in production systems.",
  },
  {
    title: "Integrate systems carefully",
    description: "Third-party integrations need clear contracts, error handling, and observability.",
  },
  {
    title: "Use AI where it solves a real problem",
    description: "GenAI should be integrated into useful production workflows rather than added as a gimmick.",
  },
];

export const interests = [
  "Backend engineering",
  "System design",
  "Fintech infrastructure",
  "Workflow automation",
  "GenAI / LLM applications",
  "API design",
  "Data-intensive systems",
];
