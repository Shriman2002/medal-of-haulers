/**
 * Every word of customer-facing copy on the site.
 *
 * Carried over verbatim from the design handoff prototype
 * (design_handoff_medal_of_haulers/"Medal of Haulers Site.dc.html"). The handoff
 * README marks this copy as final and client-approved — edit with care, and keep
 * the pricing disclaimers exactly as written.
 */

export const CONTACT = {
  business: "Medal of Haulers",
  tagline: "GOLD STANDARD HAULING",
  person: "Tushar Rawat",
  phone: "571-585-3536",
  phoneHref: "tel:5715853536",
  email: "medalofhaulers@gmail.com",
  emailHref: "mailto:medalofhaulers@gmail.com",
  instagram: "https://www.instagram.com/medalofhaulers",
  facebook: "https://www.facebook.com/share/1CAnKVu3HC/",
} as const;

/** Route + label for all seven pages, in nav order. */
export const PAGES = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/estimate", label: "Request Estimate" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* Photography and map placeholders                                            */
/* -------------------------------------------------------------------------- */

/**
 * The handoff ships eight photo slots and two map slots as diagonal-hatch
 * placeholders — real photography was never delivered.
 *
 * To drop in a real image, add `src` (and `alt`) to the slot. `PhotoPlaceholder`
 * renders the image instead of the hatch automatically; no component changes.
 */
export type PhotoSlot = {
  caption: string;
  src?: string;
  alt?: string;
};

export const PHOTO_SLOTS = {
  homeMoving: { caption: "photo: crew loading a home" },
  homeJunk: { caption: "photo: garage cleanout" },
  homeDonation: { caption: "photo: donation drop-off" },
  servicesMoving: { caption: "photo: truck loaded, furniture wrapped" },
  servicesJunk: { caption: "photo: before / after cleanout" },
  servicesDonation: { caption: "photo: boxes at donation center" },
  aboutTeam: { caption: "photo: team with the truck" },
  aboutCrew: { caption: "photo: crew on a job" },
  homeMap: { caption: "map graphic: DMV → Richmond service area" },
  contactMap: { caption: "map graphic: service area" },
} as const satisfies Record<string, PhotoSlot>;

export type PhotoSlotKey = keyof typeof PHOTO_SLOTS;

/* -------------------------------------------------------------------------- */
/* Home                                                                        */
/* -------------------------------------------------------------------------- */

export const HERO = {
  tag: "Veteran-Owned Business",
  title: "MEDAL OF HAULERS",
  services: "Moving • Junk Removal • Donation Pickup",
  subline:
    "Veteran-Owned & Proudly Serving the DMV, Northern Virginia, and Richmond Areas",
  primaryCta: "Request a Free Estimate",
} as const;

export const BADGES = [
  "Veteran Owned",
  "Free Estimates",
  "Upfront Pricing",
  "Professional & Reliable",
  "Serving the DMV & Virginia",
] as const;

export const HOME_CARDS = [
  {
    num: "01",
    title: "Moving",
    body: "Professional moving assistance for homes, apartments, offices, furniture, and individual items.",
    photo: "homeMoving",
  },
  {
    num: "02",
    title: "Junk Removal",
    body: "Convenient removal and hauling of unwanted furniture, appliances, household items, debris, and more.",
    photo: "homeJunk",
  },
  {
    num: "03",
    title: "Donation Pickup",
    body: "Pickup and transportation of usable belongings to the customer's preferred donation center.",
    photo: "homeDonation",
  },
] as const satisfies readonly {
  num: string;
  title: string;
  body: string;
  photo: PhotoSlotKey;
}[];

export const PRICE_STRIP = [
  { label: "Moving", figure: "Starting at $100" },
  { label: "Junk Removal", figure: "Starting at $100" },
  { label: "Donation Pickup", figure: "Starting at $50" },
] as const;

export const SERVICE_AREAS = [
  "Washington, D.C.",
  "Northern Virginia",
  "Maryland / DMV area",
  "Most of Virginia",
  "South through the Richmond, Virginia area",
] as const;

export const SERVICE_AREA_NOTE =
  "Outside the immediate DMV area? Contact us and we'll let you know if we can get to you.";

/** Flattened for the Contact page's definition list and for JSON-LD areaServed. */
export const SERVICE_AREA_SUMMARY =
  "Washington, D.C. · Northern Virginia · Maryland / DMV · Most of Virginia, south through Richmond";

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export const SERVICE_BLOCKS = [
  {
    kicker: "01 — MOVING SERVICES",
    title: "Moving Services",
    cta: "Request Moving Estimate",
    service: "Moving",
    slug: "moving",
    photo: "servicesMoving",
    p1: "Whether you're moving across town or simply need help transporting furniture, our team makes the process easy and stress-free. We handle the heavy lifting, loading, transportation, and unloading with care to help ensure your belongings arrive safely.",
    p2: "From apartments and homes to offices and single-item moves, we're ready to get you where you need to go.",
  },
  {
    kicker: "02 — JUNK REMOVAL",
    title: "Junk Removal",
    cta: "Request Junk Removal Estimate",
    service: "Junk Removal",
    slug: "junk-removal",
    photo: "servicesJunk",
    p1: "Clear out unwanted items without the hassle. Our team handles the lifting, loading, hauling, and proper disposal of furniture, appliances, household clutter, yard debris, garage cleanouts, and more.",
    p2: "Just show us what needs to go, and we'll take care of the rest.",
  },
  {
    kicker: "03 — DONATION PICKUP",
    title: "Donation Pickup",
    cta: "Request Donation Pickup",
    service: "Donation Pickup",
    slug: "donation-pickup",
    photo: "servicesDonation",
    p1: "Have items you no longer need but don't want to throw away? We'll pick up your usable furniture, clothing, household goods, and other eligible items and transport them to a local donation organization.",
    p2: "It's a convenient way to clear your space while giving your items an opportunity to be reused.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Pricing                                                                     */
/* -------------------------------------------------------------------------- */

export const PRICING_PANELS = [
  {
    tone: "gold",
    label: "Moving Rates",
    figure: "Moving Services Starting at $100",
    paragraphs: [
      "All moves include a $100 base service fee, with additional hourly rates based on the details of your move. Hourly pricing may vary depending on the number of movers required, size of the move, distance, and any special handling needs.",
      "Contact us today for your personalized hourly rate and a free quote.",
    ],
    factors: [],
    cta: "Get My Hourly Rate",
  },
  {
    tone: "navy",
    label: "Junk Removal",
    figure: "Junk Removal Starting at $100",
    paragraphs: [
      "Junk removal includes a $100 base service fee, plus an additional per-item charge. Per-item pricing depends on factors such as:",
      "Submit pictures and an item list through the Request Estimate page to receive an accurate quote.",
    ],
    factors: [
      "Item type",
      "Size",
      "Weight",
      "Quantity",
      "Disposal requirements",
      "Labor required",
    ],
    cta: "Send Photos & Item List",
  },
  {
    tone: "gold",
    label: "Donation Pickup",
    figure: "Donation Pickup Starting at $50",
    paragraphs: [
      "Donation pickup includes a $50 base service fee, plus an additional per-item charge depending on the items being transported. Pricing can depend on:",
      "You can select your preferred donation center when requesting an estimate.",
    ],
    factors: [
      "Number of items",
      "Item size",
      "Weight",
      "Pickup location",
      "Donation center location",
      "Labor required",
    ],
    cta: "Request Donation Pickup",
  },
] as const satisfies readonly {
  tone: "gold" | "navy";
  label: string;
  figure: string;
  paragraphs: readonly string[];
  factors: readonly string[];
  cta: string;
}[];

/** Client-approved. Must appear verbatim on the Pricing page. */
export const PRICING_DISCLAIMER =
  "Final pricing is based on the information provided by the customer and may change if the actual job differs substantially from the submitted description or photographs.";

/** The estimate sidebar's second-person variant of the same disclaimer. */
export const ESTIMATE_DISCLAIMER =
  "Final pricing is based on the information you provide and may change if the actual job differs substantially from the submitted description or photographs.";

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const FAQS = [
  {
    q: "What services do you offer?",
    a: "We provide moving, junk removal, and donation pickup services for homes, apartments, offices, and businesses. Whether you need help moving to a new place, clearing out unwanted items, or getting donations to a local organization, our team can handle the heavy lifting.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes! We provide free, no-obligation estimates. Pricing depends on factors such as the amount of items, labor required, travel distance, and the type of service needed.",
  },
  {
    q: "How does your junk removal pricing work?",
    a: "Junk removal pricing includes a base service fee plus charges based on the items being removed. Pricing can vary depending on the size, weight, quantity, labor involved, and disposal requirements. We provide pricing before beginning the job so you know what to expect.",
  },
  {
    q: "What types of junk do you remove?",
    a: "We can remove furniture, appliances, mattresses, household clutter, yard debris, garage items, office furniture, moving leftovers, and more. Certain hazardous or restricted materials may not be accepted.",
  },
  {
    q: "Do you offer donation pickup?",
    a: "Yes. If you have furniture, clothing, household goods, or other reusable items you would like to donate, we can pick them up and transport them to an appropriate donation location.",
  },
  {
    q: "Will you donate usable items instead of throwing them away?",
    a: "Whenever possible, we try to keep usable items out of the landfill by directing them toward donation or reuse. The final acceptance of donated items depends on the receiving organization's policies and the condition of the items.",
  },
  {
    q: "Do you provide the truck and moving equipment?",
    a: "Yes. Our team arrives prepared with the equipment needed for the scheduled service. If your move requires any special equipment or handling, please let us know when requesting your estimate.",
  },
  {
    q: "Can you move large or heavy items?",
    a: "Yes, we can handle many large and heavy items, including couches, beds, dressers, tables, appliances, and other furniture. Let us know about especially heavy or oversized items ahead of time so we can properly prepare.",
  },
  {
    q: "Do you offer same-day or last-minute service?",
    a: "Same-day and last-minute appointments may be available depending on our schedule. Contact us as soon as possible, and we'll do our best to accommodate your requested time.",
  },
  {
    q: "Do I need to have everything outside before you arrive?",
    a: "No. Our team can remove items from inside your home, apartment, garage, office, or other accessible areas. You simply show us what needs to go, and we'll take care of the lifting and loading.",
  },
  {
    q: "Can you help with apartment and small moves?",
    a: "Absolutely. We handle moves of different sizes, including apartments, homes, storage units, offices, single-item moves, and furniture deliveries.",
  },
  {
    q: "How far in advance should I schedule my move?",
    a: "We recommend scheduling as early as possible, especially for weekends and the end or beginning of the month. However, we may also be able to accommodate short-notice moves depending on availability.",
  },
  {
    q: "Can I book multiple services at once?",
    a: "Yes! For example, if you're moving and have furniture or other belongings you don't want to take with you, we can help with the move and remove or donate unwanted items during the same appointment for a discounted price.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

export const ABOUT = {
  lead: "We are a veteran-owned moving, junk removal, and donation pickup company committed to providing dependable, professional, and hassle-free service to our community.",
  paragraphs: [
    "We built our business around the values of hard work, integrity, discipline, and treating every customer and their belongings with respect.",
    "Whether you're moving into a new home, clearing out unwanted items, or giving usable belongings a second life through donation, our team is here to make the process as simple as possible.",
    "We take pride in showing up on time, working efficiently, and providing friendly service you can count on.",
  ],
  quote: "Reliable service. Honest work. A team you can trust.",
  cardLabel: "Veteran-Owned Business",
  cardBody:
    "Founded and operated by a veteran. Discipline on the clock, care with your belongings.",
} as const;

/* -------------------------------------------------------------------------- */
/* Estimate                                                                    */
/* -------------------------------------------------------------------------- */

export const SERVICE_OPTIONS = [
  "Moving",
  "Junk Removal",
  "Donation Pickup",
  "Multiple Services",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

/** Maps the `?service=` query param used by the Services page CTAs. */
export const SERVICE_SLUGS: Record<string, ServiceOption> = {
  moving: "Moving",
  "junk-removal": "Junk Removal",
  "donation-pickup": "Donation Pickup",
  multiple: "Multiple Services",
};

export const PROPERTY_TYPES = [
  "House",
  "Apartment",
  "Office",
  "Storage unit",
] as const;

export const NEXT_STEPS = [
  "We review your list and photos.",
  "We send your personalized rate and availability.",
  "You confirm the date. We show up on time.",
] as const;

export const SUCCESS = {
  heading: "Thank you for contacting Medal of Haulers!",
  body: "We've received your estimate request and will review the information you provided. A member of our team will contact you shortly regarding pricing and availability.",
} as const;

/** Navy page headers: kicker, H1, and optional intro line. */
export const PAGE_HEADERS = {
  services: {
    kicker: "Services",
    title: "MOVING · JUNK REMOVAL · DONATION PICKUP",
  },
  estimate: {
    kicker: "Request Estimate",
    title: "GET A FREE QUOTE",
    intro:
      "Tell us what you need moved, removed, or donated — the more detail and photos you send, the more accurate your quote.",
  },
  pricing: {
    kicker: "Pricing",
    title: "UPFRONT PRICING. NO SURPRISES.",
    intro: "Reliable service from start to finish.",
  },
  faq: { kicker: "FAQ", title: "QUESTIONS, ANSWERED" },
  about: { kicker: "About", title: "ABOUT MEDAL OF HAULERS" },
  contact: { kicker: "Contact", title: "GET IN TOUCH" },
} as const;

export const FAQ_SIDEBAR = {
  heading: "Still have a question?",
  body: "Call and talk to us directly, or send your details and we'll answer with your quote.",
} as const;

/** Estimate form labels, placeholders, and helper text. */
export const FORM = {
  steps: {
    info: "01 — Your Information",
    service: "02 — What service do you need?",
    items: "03 — Item Information",
    photos: "04 — Photos",
    extra: "05 — Anything else",
    movingPanel: "Moving Destination",
    donationPanel: "Donation Center / Organization",
  },
  fullName: { label: "Full Name *", placeholder: "Jane Doe" },
  phone: { label: "Phone Number *", placeholder: "(571) 000-0000" },
  email: { label: "Email Address *", placeholder: "you@email.com" },
  date: { label: "Requested Date of Service *" },
  pickupAddress: {
    label: "Current / Pickup Address *",
    placeholder: "Street, City, State, ZIP",
  },
  destination: {
    label: "Moving Destination / New Address *",
    placeholder: "Complete destination address",
  },
  propertyType: { label: "Apartment or house" },
  floor: { label: "Floor number", placeholder: "e.g. 3rd floor" },
  access: {
    label: "Stairs, elevator, parking / access restrictions",
    placeholder: "Optional — anything that affects access",
  },
  donationOrg: {
    label: "Donation organization name",
    placeholder: "Your preferred organization",
  },
  donationAddress: {
    label: "Donation center address",
    placeholder: "Street, City, State, ZIP",
  },
  items: {
    label: "Please list the items you need moved, removed, or donated. *",
    placeholder:
      "Type of item · quantity · approximate size · heavy or oversized items · stairs · elevators · any unusual access conditions",
    helper: "The more detail you provide, the more accurate your quote.",
  },
  photos: {
    heading: "Add photos of your items",
    constraints:
      "Take a photo or choose from your camera roll · JPG, JPEG, PNG, HEIC · up to 10 files, 10 MB each",
    chip: "Choose Photos",
  },
  extra: {
    label: "Additional Details or Special Instructions",
    placeholder: "Gate codes, timing windows, pets, fragile items…",
  },
  submit: "Submit Estimate Request",
  submitting: "Submitting…",
  security: "Spam-protected · sent securely to medalofhaulers@gmail.com",
  sidebar: {
    kicker: "Prefer to talk?",
    nextLabel: "What happens next",
  },
} as const;

/** Upload constraints, shared by the client picker and the server handler. */
export const UPLOAD_LIMITS = {
  maxFiles: 10,
  maxBytes: 10 * 1024 * 1024,
  accept: "image/jpeg,image/png,image/heic,.heic",
  extensions: [".jpg", ".jpeg", ".png", ".heic"],
  mimeTypes: ["image/jpeg", "image/png", "image/heic", "image/heif"],
} as const;

/* -------------------------------------------------------------------------- */
/* Site-wide chrome                                                            */
/* -------------------------------------------------------------------------- */

export const CTA_BANNER = {
  heading: "FREE ESTIMATES. UPFRONT PRICING.",
  body: "Send us your item list and a few photos — we'll get back to you with a quote.",
  primary: "Get a Free Quote",
  secondary: "Call Now",
} as const;

export const FOOTER = {
  wordmark: "MEDAL OF HAULERS",
  kicker: "VETERAN-OWNED · GOLD STANDARD HAULING",
  description: [
    "Veteran-Owned Moving • Junk Removal • Donation Pickup",
    "Serving the DMV, Northern Virginia, Richmond & Surrounding Areas",
  ],
  copyright: "© 2026 Medal of Haulers. All rights reserved.",
  legal: "Veteran-Owned & Operated · Licensed & Insured",
} as const;
