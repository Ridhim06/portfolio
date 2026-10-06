export type CaseStudy = {
  context: string;
  problem: string;
  myRole: string;
  architectureNote?: string;
  diagram?: string[];
  diagramVariant?: "flow" | "bidirectional" | "migration";
  implementation: string[];
  challenges: string[];
  impactPoints: string[];
  learned: string;
  subsystems?: {
    name: string;
    summary: string;
    points: string[];
  }[];
};

export type Project = {
  slug: string;
  order: number;
  flagship?: boolean;
  tag: string;
  name: string;
  tagline: string;
  role: string;
  stack: string[];
  impact: string[];
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "legal-document-e-signature-platform",
    order: 1,
    flagship: true,
    tag: "Document Platform",
    name: "Legal Document Generation & E-Signature Platform",
    tagline:
      "A production document and e-signature system spanning multiple loan products and internal services — not a CRUD feature, an end-to-end workflow.",
    role: "Designed and owned the document/agreement services layer, the Leegality e-signature integration, and the async status-tracking engine it was built on.",
    stack: ["Python", "Django", "Celery", "MySQL/PostgreSQL", "REST APIs", "Leegality API", "Microservices"],
    impact: [
      "30% less manual effort in agreement management",
      "Production e-signature workflow across 5+ loan products",
      "18+ months of continuous ownership",
    ],
    caseStudy: {
      context:
        "Progcap's loan platform needed legally-binding documents — loan sanction kits, addendums, consent letters, security deposit and engagement agreements — generated per loan product, routed for e-signature, and tracked reliably against a third-party vendor, across multiple internal systems and at least two related lending entities.",
      problem:
        "There was no single, reusable way to generate a document, send it for signature, and know with confidence whether it had actually been signed. Every new document type risked becoming its own one-off integration with the e-signature vendor, and agreement tracking was a manual, error-prone process.",
      myRole:
        "I built the agreement management module from scratch — automating document tracking and validation and cutting manual effort by 30% — and designed the reusable async engine that every later document type (addendums, consent letters, security deposit and engagement agreements) plugs into, rather than re-implementing the e-signature integration each time.",
      diagram: [
        "User / Loan System",
        "Django APIs",
        "Document / Agreement Services",
        "Celery Workers",
        "Document Generation",
        "Leegality / E-signature",
        "Storage / Status Tracking",
      ],
      diagramVariant: "flow",
      implementation: [
        "Template-driven document generation per loan product, with automated field mapping from case/loan data instead of manual data entry.",
        "A single reusable Leegality e-signature service, called by every document type instead of being re-built per feature.",
        "A Celery-based async engine that polls the e-signature vendor and writes signing status back to the database — the architectural ‘spine’ every later document type plugs into.",
        "Versioned document storage, so a signed document's history is never overwritten by a later revision.",
        "Schema evolution handled through incremental migrations while the system stayed live and in use.",
      ],
      challenges: [
        "Keeping one async status-polling design reusable as new, unrelated document types were added without rewriting it each time.",
        "Evolving a live schema under a subsystem that stayed in continuous production use.",
        "Handling signing-order and multi-party signer edge cases (co-applicants, varying signing authority) per loan product.",
        "Debugging production issues in a document pipeline where failures surface asynchronously, not as an immediate API error.",
      ],
      impactPoints: [
        "Reduced manual effort in agreement management by 30% by automating document tracking and validation.",
        "Gave the business a self-service document + e-signature pipeline reused across 7+ document types instead of duplicated per feature.",
        "Supported production systems directly — investigating and resolving incidents in a live document workflow.",
      ],
      learned:
        "Long-running document workflows need explicit failure states, retries, and versioned artifacts — treating document generation and signing as a single synchronous API call doesn't survive contact with a real third-party vendor and real production edge cases.",
    },
  },
  {
    slug: "ai-vernacular-translation",
    order: 2,
    tag: "Production GenAI for Financial Documentation",
    name: "AI-Powered Vernacular Legal Document Translation",
    tagline:
      "An LLM-powered pipeline that translates binding loan documents into 12 Indian languages — shipped to production, not a demo.",
    role: "Designed and built the translation pipeline solo: prompt engineering, chunking/retry logic, verification, and the integration into the existing e-signature workflow.",
    stack: ["Python", "Django", "Celery", "OpenAI API (GPT-4.1)", "Prompt Engineering", "PDF Rendering"],
    impact: [
      "12 Indian languages supported",
      "RBI-aligned vernacular requirement",
      "Integrated directly into the e-signature workflow",
    ],
    caseStudy: {
      context:
        "Borrowers were only able to review and sign binding loan-sanction (PS Kit) documents in English — a real accessibility gap for a lending business serving borrowers across India's many language regions, and a requirement in line with RBI guidelines on vernacular disclosure.",
      problem:
        "Translating a legal, clause-structured financial document is not the same problem as translating ordinary text. A translation has to preserve exact clause numbering and structure, protect regulatory acronyms and proper nouns from being mistranslated, stay complete on long documents, and still be reliable enough to attach to a binding e-signature workflow.",
      myRole:
        "I designed and shipped this pipeline end-to-end: the legal-translation prompt, the clause-completeness verification layer, the chunking-and-retry redesign for long documents, and the integration into the existing Leegality e-signature flow so a translated document becomes just another signable document type.",
      diagram: [
        "Document",
        "Clause extraction",
        "Chunking",
        "LLM translation",
        "Validation",
        "Retry / correction",
        "Versioned storage",
        "E-signature workflow",
      ],
      diagramVariant: "flow",
      implementation: [
        "A domain-specific prompt engineered for binding legal/financial documents — preserving exact clause numbering and markdown structure, and explicitly protecting proper nouns, addresses, and regulatory acronyms (GST, RBI, NBFC, KYC) from translation or alteration.",
        "Clause-aware chunking, so long legal documents are translated clause-by-clause rather than in a single call that risks exceeding safe output length.",
        "Retry logic per chunk when a translation looks incomplete, with particular attention to quality degradation in low-resource scripts such as Gurmukhi.",
        "A clause-completeness verification step that compares the source and translated clause counts to catch truncated or incomplete model output before it's trusted.",
        "Versioned document storage and failure alerting, so a failed or incomplete translation is caught and logged, not silently accepted.",
        "Direct integration with the existing e-signature workflow, so the vernacular terms & conditions becomes a first-class signable document.",
      ],
      challenges: [
        "Engineering a prompt that a general-purpose LLM follows precisely enough for a legally binding document — exact structure, protected terminology, no silent paraphrasing.",
        "Detecting truncated or incomplete LLM output reliably, instead of trusting the model's response at face value.",
        "Handling quality degradation in low-resource Indic scripts, which need more deliberate chunking and verification than high-resource languages.",
        "Integrating a new AI feature into an already-live e-signature platform without duplicating its data model or failure paths.",
      ],
      impactPoints: [
        "Delivered a production pipeline translating binding loan documents into 12 Indian languages, aligned with RBI guidance on vernacular disclosure.",
        "Built the reliability layer (completeness verification, chunking, retries, failure alerting) that makes an LLM output trustworthy enough for a legally binding document — not just a working demo.",
        "Wired the output directly into the production e-signature workflow so translated documents are signed the same way every other document is.",
      ],
      learned:
        "Shipping an LLM feature responsibly means building the verification and failure-handling around the model call, not just the call itself — and redesigning a shipped feature once it meets a real edge case (like long documents or a low-resource script) is a normal part of AI engineering, not a sign the first version was wrong.",
    },
  },
  {
    slug: "ps-kit-automation",
    order: 3,
    tag: "Document Automation",
    name: "PS Kit Generation & Document Automation",
    tagline:
      "Took Post-Sanction Kit generation from a manual, per-case task to a template-driven, automatically field-mapped workflow.",
    role: "Own end-to-end automation of PS Kit generation.",
    stack: ["Python", "Django", "Template-Driven Generation", "Field Mapping"],
    impact: ["Reduced manual intervention", "Reduced processing errors", "Feeds directly into the e-signature platform"],
    caseStudy: {
      context:
        "Every sanctioned loan needs a Post-Sanction (PS) Kit — the bundle of documents a borrower reviews and signs. Before automation, assembling the right kit for the right loan product, with the right borrower and loan data filled in correctly, was a manual, repeatable task prone to human error.",
      problem:
        "Manually identifying the correct template per loan product, filling in borrower and loan fields by hand, and assembling a multi-document kit doesn't scale, and every manual step is a place for a transcription or template error to enter a legally binding document.",
      myRole:
        "I own end-to-end automation of PS Kit generation — template-driven document workflows with automated field mapping — reducing manual intervention and processing errors, and feeding directly into the broader document generation and e-signature platform.",
      implementation: [
        "Template resolution driven by loan product and workflow, instead of a person choosing the right document set by hand.",
        "Automated field mapping from case and loan data directly into the document template.",
        "Kit assembly handled by the document service rather than manually compiled per case.",
        "Output routed directly into the existing Leegality e-signature pipeline once generated.",
      ],
      challenges: [
        "Supporting multiple loan products (Term Loan, Supply Chain Finance, Personal Loan, Consumer Finance, Factoring) through the same automated pipeline, each with product-specific fields.",
        "Keeping field mapping accurate as loan and borrower data models evolved.",
      ],
      impactPoints: [
        "Reduced manual intervention in assembling loan-sanction document kits.",
        "Reduced processing errors that come from manual template selection and field entry.",
        "Became the entry point into the larger document generation and e-signature platform.",
      ],
      learned:
        "Automating a document workflow pays off fastest where the manual version has the most repeated, mechanical steps — template selection and field entry are exactly the kind of work that should never depend on a person doing it correctly by hand, every time.",
    },
  },
  {
    slug: "hero-dbt-integration",
    order: 4,
    tag: "Systems Integration",
    name: "Hero DBT Partner Lending Integration",
    tagline:
      "A cross-system integration connecting the loan origination platform to a partner lending system — invoice ingestion, case creation, and payment program setup.",
    role: "Built both ends of the integration — invoice ingestion and case creation on the partner side, and the payment-program bridge on the origination side.",
    stack: ["Python", "Django", "Celery", "REST APIs", "Cross-System Data Mapping"],
    impact: ["New partner lending workflow enabled end-to-end", "Ownership across 2 separately-owned codebases"],
    caseStudy: {
      context:
        "Onboarding a new lending partner program meant the business needed a way to ingest the partner's invoices, create a matching loan case, and set up a payment program — spanning two systems that didn't previously talk to each other: the loan origination platform (LOS) and a partner-facing lending system (TechFin).",
      problem:
        "No existing workflow let invoices from this partner flow into either system, get reconciled, or result in a loan case and payment program being created automatically.",
      myRole:
        "I built the invoice upload and case-creation APIs on the partner platform, including debit/credit reconciliation and amount validation, and built the corresponding payment-program creation API on the loan origination side — including the explicit bridge that calls across into the partner system.",
      diagram: ["LOS / Loan Platform", "Partner / TechFin System", "Database / APIs", "Loan Processing Workflows"],
      diagramVariant: "bidirectional",
      implementation: [
        "Invoice upload and hard-coded field-handling APIs on the partner platform, covering partner-specific data formats.",
        "Debit/credit reconciliation logic to catch amount-handling mismatches before they reached the loan system.",
        "A case-creation workflow on the partner side, paired with a payment-program creation API on the origination side that explicitly calls into the partner platform.",
        "REST-based data mapping between the two systems' schemas.",
      ],
      challenges: [
        "Getting amount and type handling right across a system boundary, where a mismatch only surfaces with real partner data.",
        "Designing debit/credit reconciliation logic that matched the partner's own accounting expectations.",
        "Deciding between synchronous and asynchronous execution for the cross-system call, and iterating on that design during development.",
        "Debugging integration failures that only appeared once real data from the partner started flowing through.",
      ],
      impactPoints: [
        "Enabled a new partner lending workflow end-to-end, across two independently-owned codebases.",
        "Owned both sides of the integration — not just a single service — across a sustained multi-release effort.",
      ],
      learned:
        "An integration between two systems you don't fully control needs a clear contract and defensive validation on both sides — amount types, reconciliation logic, and retries matter more than they would inside a single service, because you can't assume the other side behaves exactly as expected.",
    },
  },
  {
    slug: "payment-reconciliation-automation",
    order: 5,
    tag: "Operational Automation",
    name: "Payment Reconciliation Automation",
    tagline:
      "Replaced a manual, portal-login-and-download reconciliation workflow with a scheduled, automated pipeline.",
    role: "Designed and built the automation end-to-end — extraction, processing, and reconciliation across multiple report types.",
    stack: ["Python", "Celery", "pandas", "Selenium", "Django"],
    impact: ["Replaced a fully manual reconciliation workflow", "Covers multiple payment-provider report types"],
    caseStudy: {
      context:
        "Reconciling payment-gateway transactions (PayU and Razorpay) required someone to manually log into each provider's portal, locate the right report, and download and process it by hand — a recurring, repetitive operational task.",
      problem:
        "For one provider, no public API existed at all, so the only way to retrieve transaction reports was through the portal UI — meaning the “manual” step wasn't optional without browser automation.",
      myRole:
        "I designed and built the full pipeline — automated extraction (including portal automation where no API existed), data processing, and reconciliation across multiple report types.",
      diagram: ["Payment provider reports", "Automated extraction", "Data processing", "Reconciliation", "Reports / operational output"],
      diagramVariant: "flow",
      implementation: [
        "Scheduled, Celery-orchestrated jobs that trigger extraction for each report type instead of a person running the process manually.",
        "Browser automation (Selenium) for the provider with no public API, treated with the same rigor (scheduling, error handling) as a real integration.",
        "pandas-based processing to parse and reconcile multiple structurally different report types consistently.",
        "A repeatable model-and-task pattern applied across each report type rather than one-off scripts per report.",
      ],
      challenges: [
        "Automating a workflow where the only access path was a web portal, not an API — requiring reliable login and navigation handling on a schedule.",
        "Processing multiple structurally different report types through one consistent pattern without duplicating logic per report.",
        "Running extraction and processing reliably inside an async queue rather than as a one-off manual script.",
      ],
      impactPoints: [
        "Replaced a fully manual, recurring reconciliation workflow with a scheduled automated pipeline.",
        "Automated the one provider that had no public API, via disciplined browser automation rather than a one-off script.",
      ],
      learned:
        "Browser automation is a legitimate, production-grade integration strategy when a vendor simply doesn't expose an API — as long as it's built with the same discipline (scheduling, error handling, consistent data modeling) as a real integration, not treated as a throwaway hack.",
    },
  },
  {
    slug: "progfin-public-platform",
    order: 6,
    tag: "Long-Term Ownership",
    name: "Progfin Public Website & Regulatory Platform",
    tagline:
      "Sustained, long-term ownership of a regulated NBFC's public-facing website — regulatory disclosures, product pages, and lead-capture, maintained over multiple years.",
    role: "Primary long-term owner — recurring regulatory disclosure publishing, product pages, and the site's lead-capture form backend.",
    stack: ["HTML/CSS/JS", "Backend Form Handling", "Production Maintenance"],
    impact: ["Multi-year sustained ownership", "Recurring regulatory disclosure publishing cadence"],
    caseStudy: {
      context:
        "As a regulated NBFC, the business is required to publish and keep current a set of statutory disclosures — fair practice code, KYC/AML policy, corporate governance policy, periodic public disclosures, grievance redressal mechanisms — on its public website, alongside standard product pages and lead-capture forms.",
      problem:
        "Regulatory disclosure content needs a consistent owner who publishes updates on schedule and keeps the site functioning correctly — not ad-hoc contributions whenever someone has time.",
      myRole:
        "I've been the long-term, primary owner of this site across multiple years — publishing recurring regulatory disclosure updates, building and debugging the lead-capture form backend, and shipping new product pages as the business needed them.",
      implementation: [
        "A recurring publishing cadence for statutory disclosure pages, tied to the business's regulatory filing periods.",
        "Backend handling for the site's lead-capture and contact forms, debugged through multiple production iterations to fix delivery/routing issues.",
        "New product and partner pages shipped as the business required them, on top of the existing site.",
      ],
      challenges: [
        "Keeping statutory disclosure content accurate and current against a recurring regulatory cadence, across years, without it being a full-time responsibility.",
        "Debugging a real production issue in the lead-capture form's email delivery across multiple iterations.",
      ],
      impactPoints: [
        "Sustained, multi-year ownership of a public, regulatory-sensitive platform with no handoff gaps.",
        "Kept statutory disclosure publishing current on an ongoing basis.",
        "Fixed real production issues in the site's lead-capture form backend.",
      ],
      learned:
        "Ownership isn't always about technical depth — sometimes it's about reliably showing up, release after release, for compliance-critical work that has real consequences if it's neglected.",
    },
  },
  {
    slug: "erpnext-platform-migration",
    order: 7,
    tag: "Platform Migration",
    name: "ERPNext Platform & Migration",
    tagline:
      "Led an e-commerce platform migration and a subsequent ERPNext version migration — feature parity, stability, and reusable components for dozens of clients.",
    role: "Led both the e-commerce platform migration and the ERPNext version migration.",
    stack: ["Python", "Frappe (ERPNext)", "MariaDB", "JavaScript", "SQL"],
    impact: ["25% uptime improvement", "10,000+ users supported", "50+ clients served via reusable components"],
    caseStudy: {
      context:
        "Alongside the loan management platform, I worked on Progcap's ERPNext (Frappe)-based ERP platform, which needed an e-commerce platform migration and, separately, a core ERPNext version migration.",
      problem:
        "An e-commerce platform migration risks breaking feature parity and degrading uptime for existing users if not managed carefully; separately, an ERPNext version upgrade risks compatibility breaks across core modules that many clients depend on.",
      myRole:
        "I led the e-commerce platform migration, ensuring feature parity and a 25% uptime improvement for 10,000+ users, and extended ERPNext modules with reusable components used across 50+ clients. I separately led the ERPNext version migration, resolving compatibility issues and stabilizing core modules, and built optimized SQL reports for stock, batch, and GST invoicing insights.",
      diagram: ["Legacy / Existing System", "Compatibility Analysis", "Migration", "Custom Components", "Stabilization", "Production"],
      diagramVariant: "migration",
      implementation: [
        "Feature-parity-driven migration planning for the e-commerce platform, rather than a lift-and-shift that risks regressions.",
        "Reusable ERPNext (Frappe) components built once and extended across 50+ clients instead of per-client customization.",
        "Compatibility analysis and resolution work as part of the ERPNext version migration, to stabilize core modules before rollout.",
        "Optimized SQL reporting for stock, batch, and GST invoicing insights on MariaDB.",
      ],
      challenges: [
        "Migrating a live e-commerce platform without breaking feature parity for 10,000+ existing users.",
        "Resolving compatibility issues introduced by an ERPNext core version upgrade across modules multiple clients depended on.",
        "Writing SQL reports that stayed performant against stock, batch, and GST invoicing data at scale.",
      ],
      impactPoints: [
        "Delivered a 25% uptime improvement during the e-commerce platform migration, for 10,000+ users.",
        "Built reusable ERPNext components extended across 50+ clients.",
        "Stabilized core modules after an ERPNext version migration and shipped optimized stock/batch/GST SQL reporting.",
      ],
      learned:
        "A platform migration is a feature-parity problem before it's a technology problem — the hard part isn't moving the code, it's proving nothing broke for the people already depending on it.",
    },
  },
  {
    slug: "billing-data-automation",
    order: 8,
    tag: "Internal Tooling",
    name: "Billing, Data & Identity Automation",
    tagline:
      "A set of internal backend systems — GST billing tooling, bulk credit-bureau data processing, and organizational data modeling — grouped as smaller, focused case studies.",
    role: "Built each of these as a self-contained internal system, end-to-end.",
    stack: ["Python", "Django", "Celery", "pandas", "PostgreSQL/MySQL"],
    impact: ["Self-service billing tooling for finance/ops", "Bulk (not one-at-a-time) credit-bureau verification"],
    caseStudy: {
      context:
        "Alongside the larger document and integration platforms, I built several smaller, self-contained internal systems that finance, operations, and underwriting teams rely on directly.",
      problem:
        "Finance and ops needed self-service billing tooling instead of depending on engineering for routine invoice work; underwriting needed to verify customers in bulk rather than one at a time; and the organization needed a structured way to model departments and employees that didn't exist yet.",
      myRole:
        "I built each of these end-to-end: the GST invoice and fee billing module, the bulk credit-bureau and remittance processing pipeline, and the department/employee data model with bulk upload tooling.",
      implementation: [
        "Template-driven GST invoice generation and fee-posting APIs, with search/filter tooling and a dedicated performance optimization pass after the first release.",
        "A bulk-Excel ingestion pattern (upload → validation → async Celery processing) reused across CIBIL credit-bureau verification and security-deposit remittance processing.",
        "A Department / Sub-Department data model with employee attributes, bulk user upload with sample-file generation, and automatic head-of-department derivation.",
      ],
      challenges: [
        "Validating bulk Excel uploads defensively (dataframe validation, mandatory-field checks) rather than trusting raw input.",
        "Resolving data-model migration conflicts in a shared codebase other teams were actively building on.",
        "Debugging a head-of-department auto-derivation bug that was silently producing wrong results on malformed submissions.",
      ],
      impactPoints: [
        "Gave finance/ops self-service GST invoicing and fee billing tooling, with a dedicated optimization pass after initial release.",
        "Enabled bulk, rather than one-at-a-time, credit-bureau verification and remittance processing.",
        "Delivered the organization's first structured department/employee data model, with validated bulk onboarding.",
      ],
      learned:
        "A good bulk-ingestion pattern — upload, validate, process asynchronously — is worth building once and reusing across unrelated business domains, rather than re-solving the same problem for every new dataset.",
      subsystems: [
        {
          name: "GST Invoice & Fee Billing Administration",
          summary: "Full-stack internal tooling for GST invoice generation and fee-charge posting.",
          points: [
            "Template-driven invoice generation with search/filter tooling",
            "A dedicated performance optimization pass post-release",
            "A separate fee-posting module with async Celery processing",
          ],
        },
        {
          name: "Bulk Data / Credit Bureau Automation",
          summary: "Bulk-Excel ingestion for CIBIL verification and security-deposit remittance processing.",
          points: [
            "CIBIL bulk-upload workflow with async validation",
            "Security deposit remittance processing with a later payout extension",
            "pandas-based dataframe validation shared across both",
          ],
        },
        {
          name: "User Management & Organizational Hierarchy",
          summary: "Foundational department/employee data modeling and bulk onboarding.",
          points: [
            "Department / Sub-Department data model from scratch",
            "Bulk user upload with sample-file generation",
            "Head-of-department auto-derivation, including a real bug fix",
          ],
        },
      ],
    },
  },
];

export const projectsSorted = [...projects].sort((a, b) => a.order - b.order);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
