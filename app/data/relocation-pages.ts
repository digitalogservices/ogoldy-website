export type RelocationPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  eyebrow: string;
  intro: string;
  keywords: string[];
  useCases: string[];
  assets: string[];
  controls: string[];
  faq: { q: string; a: string }[];
  proof: { label: string; href: string }[];
};
export const relocationPages: RelocationPage[] = [
  {
    slug: "office-relocation-services",
    title: "Office Relocation Services India | Ogoldy",
    h1: "Enterprise Office Relocation Services Across India",
    description:
      "Corporate office relocation and office shifting services with survey, dismantling, tagging, transport, custody, redeployment and residual liquidation.",
    eyebrow: "Corporate office relocation · Pan-India",
    intro:
      "Ogoldy manages asset-heavy office moves as one controlled programme—from the source-site survey and building coordination through destination receipt, redeployment and documented close-out.",
    keywords: [
      "office relocation services",
      "office shifting services",
      "corporate relocation",
      "corporate office relocation",
      "office relocation company",
      "office shifting company",
      "corporate movers",
    ],
    useCases: [
      "Office consolidation or headquarters move",
      "Branch, floor or building relocation",
      "Weekend and after-hours move programmes",
      "Move combined with de-fitment or bare-shell handover",
    ],
    assets: [
      "Workstations, loose furniture and storage",
      "IT, server-room and peripheral assets",
      "Selected MEP, HVAC and reusable fixtures",
      "Records, equipment and tagged business assets",
    ],
    controls: [
      "Move inventory and tag logic",
      "Source and destination access plan",
      "Building, lift and vehicle coordination",
      "Handover, exception and residual-asset records",
    ],
    faq: [
      {
        q: "Can office relocation include dismantling and reinstallation?",
        a: "Yes. The scope can include practical dismantling, tagging, packing, movement and destination delivery or reassembly coordination.",
      },
      {
        q: "Can the move be combined with office de-fitment?",
        a: "Yes. Ogoldy can connect the relocation with de-fitment, bare-shell work, storage and residual asset liquidation.",
      },
      {
        q: "Do you undertake household moves?",
        a: "No. This service is designed for corporate offices and enterprise asset programmes, not household packers-and-movers requirements.",
      },
    ],
    proof: [
      {
        label: "Topsoe office decommissioning · Faridabad",
        href: "/case-studies/topsoe-faridabad",
      },
      {
        label: "Decathlon reverse logistics · Pan-India",
        href: "/case-studies/decathlon-pan-india",
      },
    ],
  },
  {
    slug: "factory-industrial-relocation",
    title: "Factory & Industrial Relocation Services | Ogoldy",
    h1: "Factory & Industrial Relocation Services",
    description:
      "Industrial, plant, machinery and heavy-equipment relocation with survey, dismantling, preservation, transport, custody and residual asset recovery.",
    eyebrow: "Plant and machinery movement · Pan-India",
    intro:
      "Industrial relocation needs more than a vehicle. Ogoldy structures the asset decisions, dismantling sequence, packing and preservation, movement, destination handoff and residual recovery around one accountable plan.",
    keywords: [
      "factory relocation services",
      "industrial relocation",
      "industrial shifting",
      "plant relocation",
      "machinery relocation",
      "machinery shifting",
      "heavy equipment relocation",
    ],
    useCases: [
      "Factory or plant consolidation",
      "Machinery and production-equipment movement",
      "Phased industrial shifting around operations",
      "Closure-linked relocation and asset recovery",
    ],
    assets: [
      "Machinery and production equipment",
      "Utilities, selected services and ancillary assets",
      "Heavy equipment and recoverable components",
      "Racking, spares, furniture and IT assets",
    ],
    controls: [
      "Joint technical survey and scope boundaries",
      "Dismantling and preservation method",
      "Lifting, loading and route constraints",
      "Destination receipt and accountable handover",
    ],
    faq: [
      {
        q: "Does Ogoldy install machinery at the destination?",
        a: "Installation or commissioning support is defined equipment by equipment. Ogoldy’s core scope is the controlled transition, movement and handover.",
      },
      {
        q: "Can obsolete equipment be sold or scrapped separately?",
        a: "Yes. Reusable, saleable, scrap and disposal streams can be separated before the move so only the right assets travel.",
      },
      {
        q: "Can industrial assets be held between sites?",
        a: "Yes. Managed custody can bridge the gap between source dismantling and destination readiness, subject to survey and declared-value requirements.",
      },
    ],
    proof: [
      {
        label: "MTC racking transition",
        href: "/projects/mtc-racking-transition",
      },
      {
        label: "Landmark racking dismantling · Chennai",
        href: "/case-studies/landmark-chennai-racking",
      },
    ],
  },
  {
    slug: "warehouse-relocation-asset-movement",
    title: "Warehouse Relocation & Asset Movement India | Ogoldy",
    h1: "Warehouse Relocation & Enterprise Asset Movement",
    description:
      "Warehouse shifting and relocation for racking, fixtures, equipment and inventory-support assets, including dismantling, transport, custody and redeployment.",
    eyebrow: "Warehouse shifting and asset movement",
    intro:
      "Ogoldy connects warehouse survey, racking and fixture dismantling, tagging, transport, temporary custody, redeployment and liquidation so the move is not split across disconnected vendors.",
    keywords: [
      "warehouse shifting",
      "warehouse relocation",
      "enterprise asset movement",
      "racking relocation",
      "warehouse movers",
    ],
    useCases: [
      "Warehouse consolidation or network change",
      "Racking and fixture movement",
      "Temporary custody during site-readiness gaps",
      "Mixed move, redeployment and liquidation programmes",
    ],
    assets: [
      "Pallet and shelving rack components",
      "Material-handling and support equipment",
      "Fixtures, workstations and IT assets",
      "Surplus inventory-support and residual assets",
    ],
    controls: [
      "Bay, component and lot identification",
      "Dismantling, bundling and loading sequence",
      "Vehicle, gate and destination coordination",
      "Receipt, shortages and residual-lot reconciliation",
    ],
    faq: [
      {
        q: "Can you relocate used warehouse racking?",
        a: "Yes, where the system, condition, completeness and destination plan support safe reuse. Dismantling and component identification are scoped first.",
      },
      {
        q: "Can surplus racks be purchased instead of moved?",
        a: "Yes. Ogoldy can evaluate redeployment, end-user sale, direct purchase or scrap recovery for residual quantities.",
      },
      {
        q: "Can assets be stored before the new warehouse is ready?",
        a: "Yes. Managed custody can be included with agreed intake records, declared values and release instructions.",
      },
    ],
    proof: [
      {
        label: "Landmark racking liquidation · Chennai",
        href: "/case-studies/landmark-chennai-racking",
      },
      {
        label: "SPAR container custody",
        href: "/case-studies/spar-container-custody",
      },
    ],
  },
];
export const relocationBySlug = (slug: string) =>
  relocationPages.find((x) => x.slug === slug);
