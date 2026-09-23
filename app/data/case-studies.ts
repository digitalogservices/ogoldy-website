export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  location: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: { value: string; label: string }[];
  services: string[];
  image: string;
  imageAlt: string;
  note?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "topsoe-faridabad",
    client: "Topsoe",
    sector: "Corporate office",
    location: "Faridabad",
    title: "Five-floor office decommissioning and bare-shell delivery",
    summary:
      "A 106,000 sq ft corporate site required coordinated decommissioning, asset recovery and bare-shell execution across five floors.",
    challenge:
      "Multiple workstreams had to be sequenced around access, recoverable assets and site handover requirements—without treating dismantling, logistics and value recovery as separate problems.",
    approach: [
      "Surveyed the site and structured the execution scope",
      "Packed and moved selected assets to the new office",
      "Supported a structured employee sale and surplus liquidation",
      "Coordinated internal movement and bare-shell activities",
      "Maintained one accountable execution plan through close-out",
    ],
    outcome:
      "The programme demonstrates Ogoldy’s ability to combine physical execution and commercial recovery at enterprise-office scale.",
    metrics: [
      { value: "106,000", label: "sq ft" },
      { value: "5", label: "floors" },
    ],
    services: [
      "Decommissioning",
      "Bare shell",
      "Asset value recovery",
      "Site clearance",
    ],
    image: "/editorial/topsoe-faridabad-office-decommissioning.webp",
    imageAlt:
      "Illustrative cutaway of a five-floor office transitioning from fitted space to bare shell with assets segregated below",
  },
  {
    slug: "decathlon-pan-india",
    client: "Decathlon",
    sector: "Retail network",
    location: "Pan-India",
    title: "Reverse logistics with custody and redeployment control",
    summary:
      "Distributed retail assets were dismantled, packed, moved into custody and made available for future redeployment across a multi-location programme.",
    challenge:
      "The programme needed to preserve item-level visibility while assets moved from stores into custody and later returned to use.",
    approach: [
      "Captured inventory before movement",
      "Dismantled and packed assets for transport",
      "Coordinated insured custody with pallet-wise identification",
      "Recorded dispatch, receipt and reconciliation for redeployment",
    ],
    outcome:
      "A connected reverse-logistics workflow protected traceability and avoided forcing premature disposal of reusable assets.",
    metrics: [
      { value: "Pan-India", label: "coverage" },
      { value: "Multi-site", label: "custody" },
    ],
    services: [
      "Reverse logistics",
      "Asset movement",
      "Custody",
      "Redeployment",
    ],
    image: "/editorial/decathlon-pan-india-reverse-logistics.webp",
    imageAlt:
      "Illustrative India-wide reverse logistics network connecting stores, trucks, warehouses and redeployment flows",
  },
  {
    slug: "spar-container-custody",
    client: "SPAR",
    sector: "Retail",
    location: "India",
    title: "Dismantling with containerised asset preservation",
    summary:
      "Reusable retail assets were dismantled and preserved in containers at the project manager’s request rather than immediately disposed of.",
    challenge:
      "The commercial requirement was not simply site clearance: viable assets needed protected holding while their next use was decided.",
    approach: [
      "Identified assets suitable for preservation",
      "Dismantled and packed for safe holding",
      "Arranged container-based custody",
      "Structured ongoing monthly container rental",
    ],
    outcome:
      "The project retained optionality for the client while keeping the closure scope operationally controlled.",
    metrics: [
      { value: "Reusable", label: "assets preserved" },
      { value: "Monthly", label: "custody model" },
    ],
    services: [
      "Dismantling",
      "Packing",
      "Container custody",
      "Redeployment readiness",
    ],
    image: "/editorial/spar-container-asset-custody.webp",
    imageAlt:
      "Illustrative secure container holding organised reusable retail fixtures and equipment",
  },
  {
    slug: "landmark-chennai-racking",
    client: "Landmark Group",
    sector: "Retail / warehouse",
    location: "Chennai",
    title: "Heavy racking dismantling and warehouse liquidation",
    summary:
      "Approximately 500 tonnes of warehouse material were handled through dismantling, removal, loading, liquidation and scrap sale in difficult conditions.",
    challenge:
      "Top-floor work beneath a sheet roof, extreme heat and racks with many bolted connections made the scope highly labour-intensive.",
    approach: [
      "Planned labour and tools for intensive rack dismantling",
      "Managed removal and recoverable-material segregation",
      "Coordinated loading under difficult site conditions",
      "Connected liquidation and scrap sale to the clearance scope",
    ],
    outcome:
      "The operating model connected difficult-site dismantling with an organised recovery and clearance route.",
    metrics: [
      { value: "≈500", label: "tonnes" },
      { value: "Top floor", label: "work zone" },
    ],
    services: [
      "Racking dismantling",
      "Site clearance",
      "Multi-buyer liquidation",
    ],
    image: "/editorial/landmark-chennai-racking-liquidation.webp",
    imageAlt:
      "Illustrative five-floor racking dismantling with segregated material lots routed to multiple buyers",
  },
  {
    slug: "mtc-racking-transition",
    client: "MTC",
    sector: "Industrial racking",
    location: "India",
    title: "Racking recovery and end-user sale",
    summary:
      "An industrial racking scope joined dismantling, removal, loading, transport and liquidation into one managed execution.",
    challenge:
      "The work required controlled dismantling, lot handling and coordination between physical removal, transport and the commercial route.",
    approach: [
      "Assessed and prepared the racking scope",
      "Managed dismantling and removal",
      "Coordinated loading and transport",
      "Executed the agreed liquidation route",
    ],
    outcome:
      "The case illustrates how execution and value recovery can remain one accountable chain.",
    metrics: [
      { value: "Integrated", label: "execution" },
      { value: "Transport", label: "included" },
    ],
    services: ["Racking dismantling", "Purchase", "Movement", "End-user sale"],
    image: "/editorial/mtc-ford-racking-redeployment.webp",
    imageAlt:
      "Illustrative heavy warehouse racking prepared and loaded for transfer to an end-user facility",
  },
];

export const approvedClients = [
  "Decathlon",
  "SPAR",
  "WeWork",
  "Landmark Group",
  "HDFC",
  "HDB",
  "Shoppers Stop",
  "More Retail",
  "TCS",
  "Sun Life",
  "Halliburton",
  "Nerolac",
  "TotalEnergies",
  "Raymond",
  "RBL",
  "Bestseller",
  "Amdocs",
  "Reliance Retail",
  "Bandhan Bank",
  "HDFC Ergo",
  "PVR",
  "Taj",
  "Spencer’s",
  "Sify",
  "Inorbit",
];
