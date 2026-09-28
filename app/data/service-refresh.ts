import type { Service } from "./services";

type Refresh = NonNullable<Service["seo"]>;
const project = (slug: string) => `/projects/${slug}`;
export const serviceRefresh: Record<string, Refresh> = {
  "office-dismantling-defitment": {
    title: "Office Dismantling & De-fitment Services India | Ogoldy",
    meta: "Enterprise office dismantling and de-fitment for exits, renovations and relocations, including furniture, fixtures, civil/MEP scope, clearance and value recovery.",
    h1: "Enterprise Office Dismantling & De-fitment",
    lead: "For an office exit or renovation, Ogoldy surveys the site and validates the BOQ, access and retained assets before dismantling. We separate reusable furniture and fixtures from saleable material, scrap and disposal streams, coordinate loading and removal, and document the agreed handover.",
    sections: [
      { heading: "What we dismantle", text: "The agreed scope can cover workstations, furniture, partitions, fixtures and defined civil and MEP elements. Site clearance and office asset removal follow the BOQ and building access conditions." },
      { heading: "How the commercial model works", text: "Dismantling can be combined with purchase of recoverable assets where condition, quantity and removal economics make this feasible. Reuse, resale, scrap and disposal are assessed separately." },
      { heading: "Controls before mobilisation", text: "We confirm the BOQ, access windows, retained items, removal routes and required handover condition before teams mobilise. Full-site office relocation is a separate adjacent service." },
    ],
    proof: [
      { label: "Topsoe · Faridabad", detail: "106,000 sq ft across five floors; survey, selected-asset movement, employee sale, liquidation and reinstatement.", href: project("topsoe-faridabad-office-transition") },
      { label: "Asian Development Bank · Delhi", detail: "Four-floor phased programme covering 10,000+ assets, dismantling and documented reconciliation.", href: project("asian-development-bank-delhi-transition") },
    ],
    links: [
      { label: "Office asset transition", href: "/solutions/office-asset-transition/" },
      { label: "Bare shell & reinstatement", href: "/services/bare-shell-reinstatement/" },
      { label: "Asset buyback & liquidation", href: "/services/asset-buyback-liquidation/" },
      { label: "Full-site office relocation", href: "/office-relocation-services/" },
      { label: "Project portfolio", href: "/projects/" },
      { label: "Asset value estimate", href: "/asset-value-estimate/" },
    ],
    cta: "Share your BOQ, asset list or site requirement.",
  },
  "bare-shell-reinstatement": {
    title: "Bare Shell & Reinstatement Services India | Ogoldy",
    meta: "Commercial bare-shell and reinstatement works for office and retail exits, with de-fitment, selective demolition, clearance, recoverable asset segregation and handover support.",
    h1: "Bare Shell & Reinstatement for Commercial Sites",
    lead: "Lease exits and landlord handovers depend on the agreed condition of the site. Ogoldy first confirms that condition and the BOQ, separates retained and recoverable assets, then executes the specified de-fitment, selective removal and clearance.",
    sections: [
      { heading: "Typical reinstatement scope", text: "The BOQ may include partition, ceiling, flooring, fixture and defined MEP removal, debris clearance and cleaning. The handover condition determines what stays and what is removed." },
      { heading: "BOQ and phased execution", text: "We validate access, retained items, work zones and landlord requirements before scheduling removal. Floors or zones can be handed over in phases where the agreed programme permits." },
      { heading: "Recovery and close-out", text: "Reusable or saleable assets can be assessed for a value offset where applicable. A final walk-through and the agreed close-out records support handover." },
    ],
    proof: [
      { label: "Topsoe · Faridabad", detail: "Bare-shell and reinstatement within a 106,000 sq ft, five-floor office transition.", href: project("topsoe-faridabad-office-transition") },
      { label: "Asian Development Bank · Delhi", detail: "Reinstatement is included in the verified phased institutional scope.", href: project("asian-development-bank-delhi-transition") },
      { label: "SPAR · retail sites", detail: "BOQ-backed technical de-fit and clearance across retail store projects.", href: project("spar-retail-asset-transition") },
    ],
    links: [
      { label: "Office dismantling", href: "/services/office-dismantling-defitment/" },
      { label: "Office asset transition", href: "/solutions/office-asset-transition/" },
      { label: "Retail store transition", href: "/solutions/retail-store-asset-transition/" },
      { label: "Asset buyback", href: "/services/asset-buyback-liquidation/" },
      { label: "Project portfolio", href: "/projects/" },
    ],
    cta: "Share the handover condition or reinstatement BOQ.",
  },
  "scrap-disposal-purchase": {
    title: "Enterprise Scrap Disposal & Purchase India | Ogoldy",
    meta: "Enterprise scrap disposal and purchase for commercial and industrial sites, with survey, segregation, measurement, loading, removal and documented commercial closure.",
    h1: "Enterprise Scrap Disposal & Purchase",
    lead: "Enterprise scrap removal is a managed site requirement. Ogoldy reviews materials, quantities, access and measurement methods, then plans segregation, loading, removal and documented commercial closure rather than quoting an unverified spot rate.",
    sections: [
      { heading: "What we buy or remove", text: "We assess commercial and industrial material lots, including mixed site scrap, against their type, quantity, condition and removal requirements. Coverage is confirmed after review; not every material or site is suitable for purchase." },
      { heading: "How pricing is assessed", text: "Material type and quantity, condition, location, access, measurement method and removal effort inform the proposed purchase or disposal route." },
      { heading: "Dismantling and multi-site purchase", text: "Defined dismantling, segregation and loading can be included in one scope. Distributed enterprise locations can be planned as a coordinated programme with site-wise documentation." },
    ],
    proof: [
      { label: "24Seven · multi-city retail", detail: "Verified dismantling, removal, resale and scrap disposal across multiple locations.", href: project("24seven-multi-city-store-transition") },
      { label: "MTC · racking", detail: "Dismantling, removal, loading, transport and liquidation within one execution chain.", href: project("mtc-racking-transition") },
      { label: "Asian Development Bank · Delhi", detail: "Scrap disposal forms part of the verified phased asset programme.", href: project("asian-development-bank-delhi-transition") },
    ],
    links: [
      { label: "Enterprise asset buyback", href: "/services/asset-buyback-liquidation/" },
      { label: "Office dismantling", href: "/services/office-dismantling-defitment/" },
      { label: "Warehouse & factory dismantling", href: "/services/warehouse-factory-dismantling/" },
      { label: "Racking dismantling", href: "/services/racking-dismantling-buyback/" },
      { label: "Asset value estimate", href: "/asset-value-estimate/" },
      { label: "Project portfolio", href: "/projects/" },
    ],
    cta: "Share material list, quantities, photos and site location for review.",
  },
  "asset-buyback-liquidation": {
    title: "Enterprise Asset Buyback & Liquidation India | Ogoldy",
    meta: "Buyback and liquidation of surplus enterprise furniture, fixtures, equipment and recoverable assets, with valuation inputs, removal planning and documented reconciliation.",
    h1: "Enterprise Asset Buyback & Liquidation",
    lead: "Idle or exit-linked furniture, fixtures and equipment may retain reuse or resale value. Ogoldy assesses surplus enterprise assets, including office furniture, for direct purchase where viable or structured liquidation where a different route fits the lot.",
    sections: [
      { heading: "Asset value versus scrap", text: "Office furniture liquidation, surplus fixture buyback and corporate asset disposal begin with an assessment of reuse potential. Commodity and mixed scrap material follows the separate scrap purchase route." },
      { heading: "Inputs for an assessment", text: "Share an inventory, quantities, condition, photographs, site location, access and timeline. These inputs shape an indicative value and the feasible removal route." },
      { heading: "After assessment", text: "We agree purchase or liquidation terms, then plan any included dismantling, packing and removal. Asset lists and the agreed reconciliation close the work." },
    ],
    proof: [
      { label: "Topsoe · Faridabad", detail: "Structured employee sale and liquidation of surplus office assets.", href: project("topsoe-faridabad-office-transition") },
      { label: "Asian Development Bank · Delhi", detail: "Resale and liquidation within a phased programme covering 10,000+ assets.", href: project("asian-development-bank-delhi-transition") },
      { label: "24Seven · multi-city retail", detail: "Resale and liquidation across multiple retail locations.", href: project("24seven-multi-city-store-transition") },
    ],
    links: [
      { label: "Enterprise scrap disposal", href: "/services/scrap-disposal-purchase/" },
      { label: "Office dismantling", href: "/services/office-dismantling-defitment/" },
      { label: "Managed asset custody", href: "/services/managed-asset-custody/" },
      { label: "Office asset transition", href: "/solutions/office-asset-transition/" },
      { label: "Retail store transition", href: "/solutions/retail-store-asset-transition/" },
    ],
    cta: "Get an asset value estimate / upload asset list and photos.",
    ctaHref: "/asset-value-estimate/",
  },
  "racking-dismantling-buyback": {
    title: "Racking Dismantling & Buyback Services India | Ogoldy",
    meta: "Warehouse and retail racking dismantling, segregation, movement, redeployment, buyback or disposal based on system, condition, quantity, access and destination.",
    h1: "Racking Dismantling & Buyback",
    lead: "Rack dismantling starts with layout, height, quantities, access equipment and labour planning. Ogoldy separates components for an agreed onward route: movement, reuse, sale or scrap, subject to system condition and demand.",
    sections: [
      { heading: "Survey and dismantling inputs", text: "Share the rack layout, system, height, photos, approximate quantities and site access. Pallet racks and retail shelving may need different dismantling and loading plans." },
      { heading: "Segregate, bundle and move", text: "Components are dismantled and grouped for practical loading. Reusable racks may be moved for redeployment, while saleable or scrap material is routed separately; reinstallation depends on the agreed team and scope." },
      { heading: "Commercial assessment", text: "Rack buyback or disposal depends on completeness, condition, quantity, location, dismantling effort and market demand. No purchase value is assumed before review." },
    ],
    proof: [
      { label: "Landmark Group · Chennai", detail: "Approx. 500 tonnes of warehouse material; rack dismantling, removal, loading and liquidation in difficult heat conditions.", href: project("landmark-chennai-racking-liquidation") },
      { label: "MTC · racking", detail: "Racking dismantling, removal, loading, transport and liquidation.", href: project("mtc-racking-transition") },
    ],
    links: [
      { label: "Warehouse asset transition", href: "/solutions/warehouse-asset-transition/" },
      { label: "Full warehouse relocation", href: "/warehouse-relocation-asset-movement/" },
      { label: "Warehouse dismantling", href: "/services/warehouse-factory-dismantling/" },
      { label: "Asset buyback", href: "/services/asset-buyback-liquidation/" },
      { label: "Asset value estimate", href: "/asset-value-estimate/" },
    ],
    cta: "Share rack layout, photos, height/system and approximate quantities.",
  },
  "managed-asset-custody": {
    title: "Managed Asset Custody & Storage for Enterprises | Ogoldy",
    meta: "Managed custody for idle enterprise assets with intake, inventory, identifiable storage, agreed insurance, retrieval, redeployment, liquidation and reconciliation support.",
    h1: "Managed Asset Custody for Enterprise Assets",
    lead: "When assets leave a site before their next use, sale or disposal is decided, Ogoldy provides managed temporary custody. Intake, inventory and identifiable holding support later retrieval, redeployment, liquidation and reconciliation.",
    sections: [
      { heading: "Intake and identifiable holding", text: "We agree intake records and declared values, identify assets for storage and maintain inventory across custody periods. Insurance is included only where agreed and supported by declared values and policy terms." },
      { heading: "Retrieval and final disposition", text: "Requested assets can be located, segregated and released for movement or redeployment. Dispatched items are reconciled against the retained balance; other assets can be assessed for sale or disposal." },
      { heading: "Multiple projects, one controlled view", text: "Consolidation can bring assets from different sites into custody with project-wise identification, documentation and history for later decisions." },
    ],
    proof: [
      { label: "Decathlon · multi-city", detail: "Pallet-wise identification, insured custody, requested-asset retrieval, redeployment and receiving reconciliation.", href: project("decathlon-pan-india-asset-transition") },
      { label: "Asian Development Bank · Delhi", detail: "Temporary custody and reconciliation are included in the verified phased scope.", href: project("asian-development-bank-delhi-transition") },
      { label: "ABFRL · pan-India", detail: "Custody, inventory, reconciliation and internal redeployment within a distributed retail programme.", href: project("abfrl-pan-india-reverse-logistics") },
    ],
    links: [
      { label: "Asset relocation & redeployment", href: "/services/asset-relocation-redeployment/" },
      { label: "Asset buyback & liquidation", href: "/services/asset-buyback-liquidation/" },
      { label: "Retail asset transition", href: "/solutions/retail-store-asset-transition/" },
      { label: "Branch network asset transition", href: "/solutions/branch-network-asset-disposal/" },
      { label: "Asset decision tool", href: "/asset-decision-tool/" },
    ],
    cta: "Discuss a custody or redeployment requirement.",
  },
  "warehouse-factory-dismantling": {
    title: "Warehouse & Factory Dismantling Services India | Ogoldy",
    meta: "Warehouse and factory dismantling for enterprise sites, covering survey, work sequencing, fixtures/equipment, selective demolition, material segregation, clearance and value recovery.",
    h1: "Warehouse & Factory Dismantling",
    lead: "Warehouse and factory dismantling needs a site survey, work-zone sequence and access plan. Ogoldy coordinates defined fixture, service and equipment removal, selective demolition within the agreed BOQ, material segregation, loading and site clearance.",
    sections: [
      { heading: "Plan the work zones", text: "We review site access, lifting and loading constraints, retained operations and phased handover requirements. Equipment and services are handled only within the agreed scope and applicable site controls." },
      { heading: "Separate material routes", text: "Reusable assets, saleable equipment, scrap and debris are segregated for movement, liquidation or evacuation. The commercial treatment of recoverable material is agreed after survey." },
      { heading: "Clear and document", text: "Teams coordinate removal, site clearance and agreed documentation against the BOQ and handover milestones. This page covers dismantling and clearance, with full-site moves handled separately." },
      { heading: "When relocation is also required", text: "For a complete factory or warehouse move, use the dedicated relocation service; dismantling and asset recovery can be scoped alongside it." },
    ],
    proof: [
      { label: "Landmark Group · Chennai", detail: "Approx. 500 tonnes handled through warehouse rack dismantling, loading, liquidation and scrap sale.", href: project("landmark-chennai-racking-liquidation") },
      { label: "MTC · racking", detail: "Industrial racking dismantling, removal, loading, transport and liquidation.", href: project("mtc-racking-transition") },
    ],
    links: [
      { label: "Warehouse asset transition", href: "/solutions/warehouse-asset-transition/" },
      { label: "Factory asset transition", href: "/solutions/factory-industrial-asset-transition/" },
      { label: "Full factory relocation", href: "/factory-industrial-relocation/" },
      { label: "Full warehouse relocation", href: "/warehouse-relocation-asset-movement/" },
      { label: "Racking dismantling", href: "/services/racking-dismantling-buyback/" },
      { label: "Enterprise scrap disposal", href: "/services/scrap-disposal-purchase/" },
      { label: "Asset buyback", href: "/services/asset-buyback-liquidation/" },
    ],
    cta: "Share site scope, BOQ, photos and access constraints.",
  },
};

export const refreshFaq: Record<string, { q: string; a: string }[]> = {
  "office-dismantling-defitment": [
    { q: "What does an office de-fitment BOQ cover?", a: "It defines the furniture, fixtures, civil and MEP elements to remove, retained items, access and handover condition. We validate it against the site before mobilisation." },
    { q: "Can recoverable office assets be purchased?", a: "Where condition, quantities and removal costs support it, dismantling can be combined with an agreed asset purchase or liquidation route." },
  ],
  "bare-shell-reinstatement": [
    { q: "Does bare-shell handover require removal of everything?", a: "No. Work follows the agreed landlord handover condition and BOQ, including any items that must remain." },
    { q: "How is reinstatement closed out?", a: "The agreed scope can include phased checks, a final walk-through and handover documentation." },
  ],
  "scrap-disposal-purchase": [
    { q: "How is a scrap purchase price assessed?", a: "We review type, quantity, condition, location, access, measurement method and loading or removal effort before confirming terms." },
    { q: "Can dismantling and scrap purchase be combined?", a: "Yes, where the materials and site conditions support an agreed combined scope." },
  ],
  "asset-buyback-liquidation": [
    { q: "What information is needed for office furniture buyback?", a: "An asset list, quantities, condition, photographs, location, access and timeline help us assess a viable purchase or liquidation route." },
    { q: "Is every asset purchased directly?", a: "No. Direct purchase depends on viability; structured liquidation or a separate scrap route may fit some lots better." },
  ],
  "racking-dismantling-buyback": [
    { q: "What do you need to assess rack buyback?", a: "Share layout, system, height, component quantities, photos, condition and access details. Purchase depends on completeness and current demand." },
    { q: "Can racks be redeployed?", a: "Reusable components can be dismantled and moved for redeployment. Reinstallation is subject to the agreed team and scope." },
  ],
  "managed-asset-custody": [
    { q: "Is insurance included with custody?", a: "Only where agreed, with declared values, supporting records and applicable policy terms confirmed before custody begins." },
    { q: "Can a requested asset be released from storage?", a: "Identified assets can be located and segregated for an agreed dispatch. Released items and remaining stock are reconciled." },
    { q: "Can multiple projects share a custody programme?", a: "Yes, subject to project-wise identification, intake records and an agreed storage plan." },
  ],
  "warehouse-factory-dismantling": [
    { q: "Can work be phased while a site remains active?", a: "Potential work zones, access and safe separation must be surveyed and agreed before a phased plan is confirmed." },
    { q: "How are recoverable materials treated?", a: "Reusable assets, saleable material, scrap and debris are assessed as separate routes; any value adjustment is agreed after review." },
    { q: "Is lifting equipment included?", a: "Access and lifting requirements are reviewed at survey and included only where agreed in the scope." },
  ],
};
