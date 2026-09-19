import { CONTACT, HOME_CARDS, PRICING_PANELS } from "@/content/site";
import { SITE_URL } from "@/lib/metadata";

/**
 * Structured data describing the business, rendered on every page.
 *
 * This is what Google reads to decide who the business is, what it does, and
 * where — the machine-readable half of local SEO. It must agree with the
 * Google Business Profile: same name, same phone, same service area. If one
 * changes, change the other.
 *
 * Deliberately absent until the client confirms them: a street address / base
 * locality, and opening hours. Both are strong local signals, and both must
 * match the Business Profile exactly — so they are never guessed here.
 */

const BUSINESS_ID = `${SITE_URL}/#business`;

// Google recommends the country code on business phone numbers.
const PHONE_E164 = `+1-${CONTACT.phone}`;

/**
 * The service area from src/content/site.ts, expressed as real places.
 *
 * The on-page copy ("Most of Virginia", "South through the Richmond, Virginia
 * area") reads well to people but names nothing a search engine can resolve.
 * Each entry here is a proper place type with a Wikipedia sameAs, which is how
 * Google disambiguates, e.g., Richmond VA from Richmond CA.
 */
const AREA_SERVED = [
  {
    "@type": "City",
    name: "Washington, D.C.",
    sameAs: "https://en.wikipedia.org/wiki/Washington,_D.C.",
  },
  {
    "@type": "AdministrativeArea",
    name: "Northern Virginia",
    sameAs: "https://en.wikipedia.org/wiki/Northern_Virginia",
  },
  {
    // "Maryland / DMV area" on the site means the Maryland suburbs of DC, not
    // the whole state — the metro area is the honest encoding.
    "@type": "AdministrativeArea",
    name: "Washington metropolitan area",
    sameAs: "https://en.wikipedia.org/wiki/Washington_metropolitan_area",
  },
  {
    "@type": "State",
    name: "Virginia",
    sameAs: "https://en.wikipedia.org/wiki/Virginia",
  },
  {
    "@type": "City",
    name: "Richmond",
    containedInPlace: { "@type": "State", name: "Virginia" },
    sameAs: "https://en.wikipedia.org/wiki/Richmond,_Virginia",
  },
];

/** Starting prices, straight from the approved pricing copy. */
const STARTING_PRICE: Record<string, number> = {
  Moving: 100,
  "Junk Removal": 100,
  "Donation Pickup": 50,
};

const OFFER_CATALOG = {
  "@type": "OfferCatalog",
  name: "Moving, junk removal, and donation pickup",
  itemListElement: HOME_CARDS.map((card) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: card.title,
      description: card.body,
      provider: { "@id": BUSINESS_ID },
      areaServed: AREA_SERVED,
    },
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: STARTING_PRICE[card.title],
      priceCurrency: "USD",
    },
  })),
};

// Guard against the pricing copy and this table drifting apart silently.
for (const panel of PRICING_PANELS) {
  const match = panel.figure.match(/\$(\d+)/);
  const service = Object.keys(STARTING_PRICE).find((s) =>
    panel.figure.startsWith(s),
  );
  if (match && service && Number(match[1]) !== STARTING_PRICE[service]) {
    throw new Error(
      `Structured-data price for ${service} ($${STARTING_PRICE[service]}) ` +
        `disagrees with the pricing page ("${panel.figure}").`,
    );
  }
}

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MovingCompany",
      "@id": BUSINESS_ID,
      name: CONTACT.business,
      slogan: "Gold Standard Hauling",
      description:
        "Veteran-owned moving, junk removal, and donation pickup serving the DMV, Northern Virginia, and Richmond areas.",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image`,
      telephone: PHONE_E164,
      email: CONTACT.email,
      priceRange: "$$",
      areaServed: AREA_SERVED,
      hasOfferCatalog: OFFER_CATALOG,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: PHONE_E164,
        email: CONTACT.email,
        areaServed: "US",
        availableLanguage: "English",
      },
      sameAs: [CONTACT.instagram, CONTACT.facebook],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: CONTACT.business,
      publisher: { "@id": BUSINESS_ID },
    },
  ],
};
