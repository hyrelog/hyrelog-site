export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionContent {
  slug: string;
  title: string;
  description: string;
  vertical: "compliance" | "security" | "industry" | "operations";
  useCases: string[];
  keyBenefits: string[];
  sections: Array<{ heading: string; body: string }>;
  faq: SolutionFaq[];
  relatedPosts: string[];
  ogImage?: string;
}

export const solutions: SolutionContent[] = [
  {
    slug: "soc2-audit-trails",
    title: "SOC 2 Audit Trails for B2B SaaS Teams",
    description:
      "Build SOC2-aligned audit trails with tamper-evident integrity, retention controls, and exports your auditors can verify.",
    vertical: "compliance",
    useCases: ["Control evidence generation", "Access change tracking", "Incident review trails"],
    keyBenefits: ["Faster evidence collection", "Lower audit prep time", "More reliable control testing"],
    sections: [
      {
        heading: "SOC 2 pressure arrives before teams are ready",
        body: "Most teams can answer operational questions, but struggle to prove historical change activity with confidence. SOC 2 reviews require a trustworthy audit trail over time, not just current system state.",
      },
      {
        heading: "What auditors actually need",
        body: "Auditors look for integrity, retention policy clarity, and exportable records for sampling. A tamper-evident audit trail helps you demonstrate the control is working continuously.",
      },
      {
        heading: "How HyreLog supports SOC2-aligned environments",
        body: "HyreLog captures events, protects integrity, and gives your team structured exports. This lets engineering and GRC teams answer review questions quickly and consistently.",
      },
    ],
    faq: [
      {
        question: "Does this make us SOC 2 certified?",
        answer:
          "No. HyreLog supports SOC2-aligned environments by improving audit-log evidence quality, but certification depends on your full control program.",
      },
      {
        question: "Can we retain logs for audit windows?",
        answer:
          "Yes, retention policies are configurable to support your compliance and review timelines.",
      },
    ],
    relatedPosts: ["soc2-audit-trails", "audit-trail-best-practices"],
  },
  {
    slug: "gdpr-audit-logging",
    title: "GDPR Audit Logging for Data Access and Accountability",
    description:
      "Track data access and administrative actions with residency-aware audit logs to support GDPR accountability requirements.",
    vertical: "compliance",
    useCases: ["Subject access request traceability", "Admin action accountability", "Cross-team incident response"],
    keyBenefits: ["Clear accountability trail", "Residency-aware storage", "Consistent response workflows"],
    sections: [
      {
        heading: "GDPR demands accountability, not just controls on paper",
        body: "Teams need evidence of who accessed data, what changed, and when. Without durable audit logging, investigations and responses become slow and uncertain.",
      },
      {
        heading: "Residency and policy questions appear during review",
        body: "Enterprise buyers and legal teams ask where logs are stored and how long they are retained. Regional controls reduce ambiguity during these conversations.",
      },
      {
        heading: "A practical path to stronger GDPR audit posture",
        body: "HyreLog helps teams preserve event integrity and keep exports ready for legal, security, and privacy workflows.",
      },
    ],
    faq: [
      {
        question: "Can we keep EU audit logs in-region?",
        answer:
          "Higher-tier plans support stronger residency controls so teams can align storage policy with regional requirements.",
      },
      {
        question: "Does HyreLog replace legal advice?",
        answer: "No. It provides technical audit evidence infrastructure; legal interpretation still requires your counsel.",
      },
    ],
    relatedPosts: ["gdpr-audit-requirements", "privacy-preserving-audit-trails"],
  },
  {
    slug: "data-residency-controls",
    title: "Data Residency Controls for Audit Logging",
    description:
      "Keep audit logs in the regions your customers and legal teams require, with policy clarity for enterprise security reviews.",
    vertical: "security",
    useCases: ["EU-only storage policies", "Regional enterprise contracts", "Public sector procurement"],
    keyBenefits: ["Cleaner security questionnaires", "Reduced deal friction", "Better policy enforcement"],
    sections: [
      {
        heading: "Residency is now a deal-critical requirement",
        body: "As SaaS companies move upmarket, procurement asks where data is processed and stored. Residency answers need to be precise and provable.",
      },
      {
        heading: "Audit logs are often forgotten in residency design",
        body: "Teams may localize app data but leave audit pipelines in default regions. This can create late-stage blockers during reviews.",
      },
      {
        heading: "Designing residency-aware audit logging",
        body: "HyreLog gives teams clearer regional controls so security and platform leaders can answer residency questions with confidence.",
      },
    ],
    faq: [
      {
        question: "Can we choose different regions by environment?",
        answer: "Yes, policy can be shaped around your architecture and compliance needs.",
      },
      {
        question: "Do residency controls impact export workflows?",
        answer: "Exports remain available while preserving your configured storage and policy boundaries.",
      },
    ],
    relatedPosts: ["privacy-preserving-audit-trails", "designing-audit-trails-multi-tenant-saas"],
  },
  {
    slug: "tamper-evident-audit-logs",
    title: "Tamper-Evident Audit Logs for High-Trust Systems",
    description:
      "Use cryptographic integrity signals to make unauthorized audit log changes detectable during investigations and reviews.",
    vertical: "security",
    useCases: ["Sensitive admin action tracking", "Forensic investigations", "Control verification"],
    keyBenefits: ["Stronger trust in evidence", "Faster incident triage", "Reduced integrity disputes"],
    sections: [
      {
        heading: "Traditional log stores are not enough for trust",
        body: "Mutable stores can answer what happened, but not always whether historical records remained unchanged.",
      },
      {
        heading: "Tamper evidence improves incident confidence",
        body: "When teams can verify integrity quickly, response and remediation decisions become faster and less contentious.",
      },
      {
        heading: "Built for audit and forensics",
        body: "HyreLog emphasizes cryptographic integrity and exportability so evidence remains usable across engineering, security, and audit workflows.",
      },
    ],
    faq: [
      {
        question: "Can tamper evidence prevent all attacks?",
        answer: "No, but it raises detection confidence by making unauthorized modifications easier to identify.",
      },
      {
        question: "Is this only for regulated industries?",
        answer: "No. Any team handling sensitive workflows benefits from stronger audit integrity.",
      },
    ],
    relatedPosts: ["hash-chains-explained", "incident-response-audit-logs"],
  },
  {
    slug: "enterprise-security-questionnaires",
    title: "Audit Logging for Enterprise Security Questionnaires",
    description:
      "Answer security questionnaires faster with concrete audit-log evidence around integrity, retention, access controls, and residency.",
    vertical: "operations",
    useCases: ["Vendor review responses", "Deal desk enablement", "Security team collaboration"],
    keyBenefits: ["Shorter sales cycles", "Higher response quality", "Less ad hoc engineering work"],
    sections: [
      {
        heading: "Questionnaires ask for more than policy documents",
        body: "Enterprise buyers want proof that controls are implemented and operating. Audit logging evidence is one of the most frequent asks.",
      },
      {
        heading: "Manual evidence prep slows sales and security",
        body: "When every questionnaire triggers custom evidence work, teams lose momentum and increase inconsistency risk.",
      },
      {
        heading: "Operationalize evidence readiness",
        body: "HyreLog helps teams maintain reusable, exportable audit records so security responses are faster and more consistent.",
      },
    ],
    faq: [
      {
        question: "Can non-engineering teams use the exports?",
        answer:
          "Yes. Exports are designed to be understandable by security, GRC, and procurement stakeholders.",
      },
      {
        question: "Will this remove all questionnaire work?",
        answer: "No. It reduces evidence friction while your team still owns final responses.",
      },
    ],
    relatedPosts: ["why-audit-trails-fail", "choosing-audit-trail-service"],
  },
  {
    slug: "audit-log-retention",
    title: "Audit Log Retention Strategy for Compliance and Forensics",
    description:
      "Set practical retention policies for audit logs to balance compliance obligations, cost, and investigation readiness.",
    vertical: "operations",
    useCases: ["Retention policy design", "Cost optimization", "Investigation readiness"],
    keyBenefits: ["Policy clarity", "Improved investigation windows", "Predictable storage planning"],
    sections: [
      {
        heading: "Retention decisions affect both compliance and cost",
        body: "Too-short retention increases risk in reviews and incidents, while over-retention can create unnecessary cost and operational complexity.",
      },
      {
        heading: "Separate hot access from long-term evidence",
        body: "A layered strategy keeps recent logs quickly searchable while preserving older records for audits and legal workflows.",
      },
      {
        heading: "Implement retention as a product decision",
        body: "HyreLog helps teams define and apply retention policy with stronger consistency across business units and tenants.",
      },
    ],
    faq: [
      {
        question: "How long should we retain audit logs?",
        answer: "It depends on regulations, contracts, and risk posture. HyreLog supports flexible policy choices.",
      },
      {
        question: "Can we adjust retention over time?",
        answer: "Yes, policies can evolve as your compliance needs and customer profile change.",
      },
    ],
    relatedPosts: ["cost-of-poor-audit-logging", "architecting-high-volume-audit-logging"],
  },
  {
    slug: "audit-logging-for-fintech",
    title: "Audit Logging for Fintech Platforms",
    description:
      "Capture high-trust financial workflows with tamper-evident audit trails, retention controls, and enterprise-ready exports.",
    vertical: "industry",
    useCases: ["Payment operation trails", "Privileged action monitoring", "Regulatory investigations"],
    keyBenefits: ["Higher trust posture", "Faster incident reconstruction", "Improved review readiness"],
    sections: [
      {
        heading: "Fintech workflows require durable evidence",
        body: "When money movement or access controls are involved, teams need a reliable historical record with clear actor and action context.",
      },
      {
        heading: "Operational logs cannot carry all compliance needs",
        body: "Observability is critical for uptime, but fintech review processes often require stronger integrity and retention guarantees.",
      },
      {
        heading: "Fit for fintech engineering and compliance teams",
        body: "HyreLog supports tamper-evident audit trails and export workflows that reduce friction across engineering, risk, and compliance.",
      },
    ],
    faq: [
      {
        question: "Can this support high event volumes?",
        answer: "Yes, HyreLog plans are designed around volume tiers and scalable ingestion.",
      },
      {
        question: "Can we route evidence into SIEM?",
        answer: "SIEM streaming is available in higher-tier and add-on options.",
      },
    ],
    relatedPosts: ["architecting-high-volume-audit-logging", "business-value-of-audit-trails"],
  },
  {
    slug: "audit-logging-for-healthtech",
    title: "Audit Logging for Healthtech and Sensitive Data Workflows",
    description:
      "Improve accountability and incident readiness for sensitive health workflows with tamper-evident audit logging.",
    vertical: "industry",
    useCases: ["Sensitive record access trails", "Workflow accountability", "Security incident review"],
    keyBenefits: ["Stronger patient-data accountability", "Clear action history", "Improved trust with buyers"],
    sections: [
      {
        heading: "Sensitive workflows need strong accountability",
        body: "Healthtech systems often involve high-sensitivity actions where teams must demonstrate who accessed what and why.",
      },
      {
        heading: "Reliable trails support investigation quality",
        body: "Clear historical records reduce ambiguity in incident response and improve collaboration across engineering and compliance teams.",
      },
      {
        heading: "Audit infrastructure that scales with growth",
        body: "HyreLog gives teams a dedicated audit foundation so compliance requests do not derail product delivery.",
      },
    ],
    faq: [
      {
        question: "Does this include healthcare certification claims?",
        answer: "No. HyreLog provides audit logging infrastructure; teams still manage their own regulatory program.",
      },
      {
        question: "Can residency controls support regional requirements?",
        answer: "Yes, residency controls can align with region-specific obligations and contracts.",
      },
    ],
    relatedPosts: ["privacy-preserving-audit-trails", "incident-response-audit-logs"],
  },
  {
    slug: "audit-logging-for-hr-payroll",
    title: "Audit Logging for HR and Payroll SaaS",
    description:
      "Track permission changes, payroll-impacting actions, and data access with tamper-evident audit trails.",
    vertical: "industry",
    useCases: ["Role and permission changes", "Payroll adjustment trails", "Support escalation accountability"],
    keyBenefits: ["Reduced dispute friction", "Faster root-cause analysis", "Stronger enterprise confidence"],
    sections: [
      {
        heading: "HR and payroll systems need clear action history",
        body: "When compensation or employee records are affected, teams need detailed, trustworthy event history for internal and external review.",
      },
      {
        heading: "Manual audit evidence introduces risk",
        body: "Spreadsheet-driven tracking can miss context and increase response time during escalations or customer audits.",
      },
      {
        heading: "Build trust into HR platform operations",
        body: "HyreLog gives product and security teams stronger evidence trails for critical workforce workflows.",
      },
    ],
    faq: [
      {
        question: "Can we prove who changed payroll-related settings?",
        answer: "Yes, event trails capture actor, action, and timing to support investigations and audits.",
      },
      {
        question: "Will this help with enterprise procurement?",
        answer: "Strong audit evidence often improves trust in security and compliance review cycles.",
      },
    ],
    relatedPosts: ["designing-audit-trails-multi-tenant-saas", "event-taxonomy-design"],
  },
  {
    slug: "siem-streaming-and-evidence-packs",
    title: "SIEM Streaming and Evidence Packs for Audit Workflows",
    description:
      "Bridge real-time security operations and compliance workflows with SIEM streaming and structured evidence exports.",
    vertical: "security",
    useCases: ["SOC workflows", "Audit evidence packaging", "Cross-tool investigations"],
    keyBenefits: ["Operational + compliance alignment", "Faster evidence assembly", "Better investigation continuity"],
    sections: [
      {
        heading: "Security and compliance teams need shared evidence",
        body: "SOC teams focus on detection and response, while auditors focus on control evidence. Both need consistent, trustworthy event records.",
      },
      {
        heading: "Streaming plus packaged exports is the practical model",
        body: "Real-time SIEM integrations support operations, while evidence packs support formal reviews and customer requests.",
      },
      {
        heading: "HyreLog as connective infrastructure",
        body: "HyreLog helps teams feed downstream tools while keeping an auditable source of truth for long-term assurance workflows.",
      },
    ],
    faq: [
      {
        question: "Which SIEM tools are supported?",
        answer: "Higher tiers include options for common SIEM destinations such as Splunk and Sentinel.",
      },
      {
        question: "What is in an evidence pack?",
        answer: "Structured exports with event context and integrity-oriented metadata for review workflows.",
      },
    ],
    relatedPosts: ["logs-to-evidence", "real-time-monitoring-audit-logs"],
  },
];

export const solutionsBySlug = new Map(solutions.map((solution) => [solution.slug, solution]));
