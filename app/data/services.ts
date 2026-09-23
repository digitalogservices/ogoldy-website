export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  keywords: string[];
  scope: string[];
  process: string[];
  faq: { q: string; a: string }[];
};
export const services: Service[] = [
  {
    slug: "office-dismantling-defitment",
    title: "Office Dismantling & De-fitment",
    short:
      "Controlled dismantling of furniture, MEP, fixtures and interiors for office exits and relocations.",
    intro:
      "Ogoldy plans and executes office dismantling and de-fitment while separating reusable assets, resale value, scrap and disposal streams.",
    keywords: [
      "office dismantling",
      "office de-fitment",
      "office site clearance",
    ],
    scope: [
      "Furniture, workstations and storage",
      "Civil and MEP dismantling",
      "Packing, loading and movement",
      "Scrap segregation and value recovery",
    ],
    process: [
      "Validate BOQ and site access",
      "Survey assets and recoverable value",
      "Mobilise skilled teams and tools",
      "Clear, hand over and document",
    ],
    faq: [
      {
        q: "Can dismantling and asset purchase be combined?",
        a: "Yes. We can structure dismantling, clearance and purchase of recoverable assets as one commercial scope where feasible.",
      },
      {
        q: "Do you work outside major metros?",
        a: "Yes. Ogoldy evaluates requirements pan-India, including distributed branch and store programmes.",
      },
    ],
  },
  {
    slug: "bare-shell-reinstatement",
    title: "Bare Shell & Reinstatement",
    short:
      "De-fitment, demolition and site clearance aligned to handover conditions.",
    intro:
      "We help occupiers return offices, stores and commercial sites to agreed handover condition through a clearly defined reinstatement scope.",
    keywords: ["bare shell contractor", "reinstatement work", "site clearance"],
    scope: [
      "Partition, ceiling and flooring removal",
      "MEP and fixture de-fitment",
      "Raceway closure and cleaning",
      "Debris and scrap removal",
    ],
    process: [
      "Confirm landlord handover standard",
      "Map retained and removed elements",
      "Execute phased de-fitment",
      "Joint walk-through and close-out",
    ],
    faq: [
      {
        q: "Is all flooring always removed?",
        a: "No. The exact extent depends on the landlord handover standard and agreed BOQ.",
      },
      {
        q: "Can recoverable assets offset costs?",
        a: "Where assets have resale or scrap value, we can evaluate a buyback or value-recovery component.",
      },
    ],
  },
  {
    slug: "scrap-disposal-purchase",
    title: "Enterprise Scrap Disposal & Purchase",
    short:
      "Structured removal and purchase of commercial and industrial scrap with accountable execution.",
    intro:
      "Ogoldy handles enterprise scrap disposal as an operational project, not simply a spot-rate transaction.",
    keywords: [
      "scrap disposal company",
      "scrap purchase",
      "corporate scrap buyer",
    ],
    scope: [
      "Metal, furniture and mixed site scrap",
      "Segregation and measurement",
      "Loading and transport coordination",
      "Commercial documentation",
    ],
    process: [
      "Review material list and evidence",
      "Assess quantity, access and value",
      "Agree measurement and payment method",
      "Lift material and close documentation",
    ],
    faq: [
      {
        q: "Do you accept small requirements?",
        a: "Yes. Genuine enterprise requirements are reviewed without a minimum project value gate.",
      },
      {
        q: "Can you work across multiple locations?",
        a: "Yes. We can consolidate commercially practical pickups or plan a distributed programme.",
      },
    ],
  },
  {
    slug: "asset-buyback-liquidation",
    title: "Asset Buyback & Liquidation",
    short:
      "Purchase, remarketing and liquidation of used enterprise furniture, equipment and recoverable assets.",
    intro:
      "We help enterprises turn idle or exit-linked assets into accountable value recovery through direct purchase or structured liquidation.",
    keywords: [
      "office asset buyback",
      "used asset purchase",
      "asset liquidation",
    ],
    scope: [
      "Furniture and fixtures",
      "Warehouse and retail equipment",
      "HVAC and selected MEP assets",
      "Lot-based or project-wide purchase",
    ],
    process: [
      "Receive inventory and condition evidence",
      "Inspect or survey",
      "Structure purchase or liquidation route",
      "Remove and reconcile assets",
    ],
    faq: [
      {
        q: "Is the estimate guaranteed?",
        a: "No. Initial estimates are indicative until condition, quantity, location and removal constraints are verified.",
      },
      {
        q: "Can dismantling be included?",
        a: "Yes. Dismantling, packing and transport can be included in the commercial structure.",
      },
    ],
  },
  {
    slug: "e-waste-it-asset-disposal",
    title: "E-Waste & IT Asset Disposal",
    short:
      "Enterprise IT asset and e-waste removal with structured logistics and documentation.",
    intro:
      "Ogoldy coordinates IT asset scrap and e-waste disposal within broader office, branch and site-transition programmes.",
    keywords: [
      "IT asset disposal",
      "e-waste disposal company",
      "corporate e-waste",
    ],
    scope: [
      "Desktops, peripherals and mixed IT assets",
      "Pickup and consolidation planning",
      "Recycling and disposal coordination",
      "Required documentation",
    ],
    process: [
      "Receive asset list and locations",
      "Plan consolidation where useful",
      "Execute pickup and verified handover",
      "Issue agreed documentation",
    ],
    faq: [
      {
        q: "Can you handle distributed branches?",
        a: "Yes. We assess direct pickup versus zonal consolidation based on quantities and logistics economics.",
      },
      {
        q: "Do you provide documentation?",
        a: "The required documentation is agreed before execution and coordinated as part of the scope.",
      },
    ],
  },
  {
    slug: "warehouse-factory-dismantling",
    title: "Warehouse & Factory Dismantling",
    short:
      "Planned dismantling, demolition, clearance and asset recovery for operational sites.",
    intro:
      "We structure large-site dismantling around access, safety, sequence, recoverable equipment, scrap flows and handover milestones.",
    keywords: [
      "warehouse dismantling",
      "factory dismantling",
      "industrial demolition",
    ],
    scope: [
      "Fixtures, services and equipment",
      "Selective demolition",
      "Material segregation",
      "Debris, scrap and asset evacuation",
    ],
    process: [
      "Site survey and method plan",
      "Sequence work zones and resources",
      "Execute controlled dismantling",
      "Measure, clear and hand over",
    ],
    faq: [
      {
        q: "Do you undertake live-site work?",
        a: "Access conditions and safe work zones must be agreed during survey. Phased execution may be possible.",
      },
      {
        q: "Can scrap value be adjusted commercially?",
        a: "Yes, where recoverable material can be reasonably assessed and measured.",
      },
    ],
  },
  {
    slug: "racking-dismantling-buyback",
    title: "Racking Dismantling & Buyback",
    short:
      "Dismantling, relocation, disposal or purchase of warehouse and retail racking systems.",
    intro:
      "Ogoldy manages racking projects from identification and safe dismantling through packing, movement, reuse or value recovery.",
    keywords: ["rack dismantling", "pallet rack buyer", "racking disposal"],
    scope: [
      "Pallet and shelving racks",
      "Mobile compactors",
      "Component segregation and bundling",
      "Relocation, sale or scrap route",
    ],
    process: [
      "Review layout, height and quantities",
      "Validate condition and access equipment",
      "Dismantle and sort components",
      "Move, redeploy or purchase",
    ],
    faq: [
      {
        q: "Do you buy used racks?",
        a: "Purchase depends on system, condition, completeness, quantities, location and current demand.",
      },
      {
        q: "Can racks be redeployed?",
        a: "Yes. We can dismantle, pack and move reusable systems for reinstallation by the agreed team.",
      },
    ],
  },
  {
    slug: "asset-relocation-redeployment",
    title: "Asset Relocation & Redeployment",
    short:
      "Asset-level dismantling, movement and redeployment between enterprise sites or into managed custody.",
    intro:
      "For defined asset lots rather than a full premises move, Ogoldy manages identification, dismantling, movement, custody gaps and destination redeployment.",
    keywords: [
      "enterprise asset movement",
      "asset redeployment",
      "inter-site asset transfer",
    ],
    scope: [
      "Asset identification and tagging",
      "Dismantling and practical packing",
      "Inter-city movement coordination",
      "Destination delivery and handover",
    ],
    process: [
      "Validate asset and destination data",
      "Plan documentation and vehicle route",
      "Dismantle, pack, load and move",
      "Deliver, reconcile and hand over",
    ],
    faq: [
      {
        q: "What documents are usually needed?",
        a: "Requirements may include e-way bills, internal movement declarations, gate passes and asset value declarations.",
      },
      {
        q: "Can you store assets between sites?",
        a: "Yes. Managed custody can bridge timing gaps between dismantling and redeployment.",
      },
    ],
  },
  {
    slug: "managed-asset-custody",
    title: "Managed Asset Custody",
    short:
      "Consolidated storage, inventorisation and decision support for idle enterprise assets.",
    intro:
      "Ogoldy holds project assets in managed custody so enterprises can audit, redeploy, liquidate or dispose with clearer information.",
    keywords: [
      "asset storage",
      "enterprise asset custody",
      "warehouse consolidation",
    ],
    scope: [
      "Inbound consolidation",
      "Inventorisation and condition capture",
      "Segregated holding",
      "Redeployment or liquidation coordination",
    ],
    process: [
      "Define intake and declared values",
      "Receive and consolidate",
      "Record, hold and report",
      "Release for redeployment or liquidation",
    ],
    faq: [
      {
        q: "Are used assets insured at replacement value?",
        a: "Coverage depends on declared value and supporting documentation. Terms must be agreed before custody begins.",
      },
      {
        q: "Can multiple projects be consolidated?",
        a: "Yes. This is a core use case, subject to warehouse planning and identification requirements.",
      },
    ],
  },
  {
    slug: "asset-survey-boq-advisory",
    title: "Asset Survey, BOQ & Decommissioning Advisory",
    short:
      "Scope validation and commercial structuring before complex site-transition work begins.",
    intro:
      "We turn incomplete asset lists and uncertain site conditions into a practical execution and value-recovery plan.",
    keywords: ["asset survey", "dismantling BOQ", "decommissioning consultant"],
    scope: [
      "Video or physical survey",
      "BOQ validation",
      "Access and logistics assessment",
      "Value-recovery options",
    ],
    process: [
      "Collect available documents",
      "Inspect the site and asset base",
      "Identify risks, gaps and options",
      "Issue an execution-ready scope",
    ],
    faq: [
      {
        q: "Can a video survey be used first?",
        a: "Yes. A structured video walkthrough can reduce scope gaps before a physical visit or mobilisation.",
      },
      {
        q: "Why validate the BOQ?",
        a: "Site conditions often differ from documents. Validation reduces redeployment, delays and avoidable additional cost.",
      },
    ],
  },
];
export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
