import type { Customer, Event, EventCategory, Order, TeamMember, Ticket } from "./types";

export const events: Event[] = [
  {
    id: "e1",
    slug: "midnight-beats",
    title: "Live in Concert: The Midnight Beats",
    organizer: "Nova Sound Collective",
    organizerFollowers: 82000,
    category: "Live Music",
    city: "Medellín",
    venue: "The Great Hall",
    address: "Avant Gardner, Medellín",
    date: "2026-04-19T22:00:00",
    doors: "10:00 PM",
    cover: { from: "#6C5CE0", to: "#F0B889" },
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    attendees: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/men/65.jpg",
    ],
    sampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    price: 79,
    attendeeCount: 600,
    lineup: ["Ari Lowe", "Coll Super", "DJ Fart in the Club", "Casey Nova"],
    about:
      "An immersive night of electronic sound and live percussion, closing out our spring residency series.",
    tiers: [
      { id: "t1", name: "EarlyBird Entry", price: 79, capacity: 600, available: 234, scanned: 41, description: "Standard admission with access to all general areas, live performances, food vendors, and public amenities." },
      { id: "t2", name: "General Admission", price: 100, capacity: 600, available: 148, scanned: 12, description: "Standard event admission with access to all general dance floor areas." },
      { id: "t3", name: "VIP Skydeck", price: 220, capacity: 80, available: 19, scanned: 3, description: "Elevated viewing deck, private bar, and dedicated entrance." },
    ],
  },
  {
    id: "e2",
    slug: "nyla-release",
    title: "NYLA — Release & Relay",
    organizer: "Public Records",
    organizerFollowers: 45500,
    category: "Club Nights",
    city: "Brooklyn",
    venue: "Public Records",
    address: "233 Butler St, Brooklyn, NY 11217, USA",
    date: "2026-02-22T19:00:00",
    doors: "7:00 PM",
    cover: { from: "#1a1729", to: "#6C5CE0" },
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    attendees: [
      "https://randomuser.me/api/portraits/women/68.jpg",
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/women/21.jpg",
    ],
    sampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    price: 70,
    attendeeCount: 350,
    lineup: ["Anz", "Coll Super", "DJ Fart in the Club", "Casey"],
    about:
      "Public Records aims to provide a safer space. We reject all forms of discrimination, misogyny, transphobia, homophobia, racism, and other aggressive behavior. Consent is paramount. Please exist with respect for yourself and others.",
    tiers: [
      { id: "t1", name: "Skip the Line + GA", price: 30000, capacity: 400, available: 120, scanned: 60, description: "Fast entry plus general admission." },
      { id: "t2", name: "Ladies Group Order", price: 40000, capacity: 100, available: 22, scanned: 8, description: "Group entry for 4, discounted rate." },
    ],
  },
  {
    id: "e3",
    slug: "house-under-the-stars",
    title: "House Under the Stars",
    organizer: "Nova Sound Collective",
    organizerFollowers: 82000,
    category: "Club Nights",
    city: "Bogotá",
    venue: "Riverside Stage",
    address: "Riverside Stage, Bogotá",
    date: "2026-08-03T20:30:00",
    doors: "8:30 PM",
    cover: { from: "#F0B889", to: "#6C5CE0" },
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
    attendees: [
      "https://randomuser.me/api/portraits/men/8.jpg",
      "https://randomuser.me/api/portraits/women/15.jpg",
      "https://randomuser.me/api/portraits/men/76.jpg",
    ],
    sampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    price: 55,
    attendeeCount: 800,
    lineup: ["Marée", "Solen", "Kito Reyes"],
    about: "An open-air house night on the riverside stage, running until sunrise.",
    tiers: [
      { id: "t1", name: "General Admission", price: 55, capacity: 800, available: 410, scanned: 0, description: "Full access to the riverside grounds." },
      { id: "t2", name: "VIP Terrace", price: 140, capacity: 120, available: 44, scanned: 0, description: "Private terrace, express entry, welcome drink." },
    ],
  },
  {
    id: "e4",
    slug: "golden-record",
    title: "Golden Record: Margen, Miss Gypsy, Kiyoshi",
    organizer: "District Presents",
    organizerFollowers: 31000,
    category: "Live Music",
    city: "New York",
    venue: "The Brooklyn Mirage",
    address: "The Brooklyn Mirage, NY",
    date: "2026-02-20T18:00:00",
    doors: "6:00 PM",
    cover: { from: "#c9a6f5", to: "#6C5CE0" },
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    attendees: [
      "https://randomuser.me/api/portraits/women/33.jpg",
      "https://randomuser.me/api/portraits/men/51.jpg",
      "https://randomuser.me/api/portraits/women/9.jpg",
    ],
    sampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    price: 26.78,
    attendeeCount: 500,
    lineup: ["Margen", "Miss Gypsy", "Kiyoshi"],
    about: "A rotating showcase of the label's brightest live acts.",
    tiers: [
      { id: "t1", name: "General Admission", price: 26.78, capacity: 500, available: 260, scanned: 0, description: "Standard entry." },
    ],
  },
  {
    id: "e5",
    slug: "valentines-love-roll",
    title: "Valentine's Day R&B and Disco Skate Party",
    organizer: "Rhythm & Skate Co.",
    organizerFollowers: 8600,
    category: "Day Parties",
    city: "Brooklyn",
    venue: "The Brooklyn Mirage",
    address: "The Brooklyn Mirage, NY",
    date: "2026-02-14T18:00:00",
    doors: "6:00 PM",
    cover: { from: "#F0B889", to: "#c9a6f5" },
    image:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1200&auto=format&fit=crop",
    attendees: [
      "https://randomuser.me/api/portraits/women/52.jpg",
      "https://randomuser.me/api/portraits/men/19.jpg",
      "https://randomuser.me/api/portraits/women/77.jpg",
    ],
    sampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    price: 32.85,
    attendeeCount: 300,
    lineup: ["DJ Rollerskate", "Sunny Disco"],
    about: "Couples skate, singles mixer, dinner, and special surprises — all on wheels.",
    tiers: [
      { id: "t1", name: "General Admission", price: 32.85, capacity: 300, available: 90, scanned: 0, description: "Skate rental included." },
    ],
  },
  {
    id: "e6",
    slug: "nice-one",
    title: "Nice One: 20+ Hours Non-Stop Music",
    organizer: "Nova Sound Collective",
    organizerFollowers: 82000,
    category: "Festivals",
    city: "Bogotá",
    venue: "The Brooklyn Mirage",
    address: "The Brooklyn Mirage, Bogotá",
    date: "2026-08-22T18:00:00",
    doors: "6:00 PM",
    cover: { from: "#0a0912", to: "#c9a6f5" },
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1200&auto=format&fit=crop",
    attendees: [
      "https://randomuser.me/api/portraits/men/41.jpg",
      "https://randomuser.me/api/portraits/women/58.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
    ],
    sampleUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    price: 114.85,
    attendeeCount: 1200,
    lineup: ["Casey Nova", "Ari Lowe", "Solen", "Margen"],
    about: "Twenty-plus hours across three stages. No re-entry, full production, guest curated lineup.",
    tiers: [
      { id: "t1", name: "General Admission", price: 114.85, capacity: 1200, available: 610, scanned: 0, description: "Full weekend access." },
    ],
  },
];

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getEventById(id: string) {
  return events.find((e) => e.id === id);
}

export const eventCategories: EventCategory[] = [
  "Club Nights",
  "Live Music",
  "Festivals",
  "Day Parties",
];

const categoryCovers: Record<EventCategory, string> = {
  "Club Nights": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
  "Live Music": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
  Festivals: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
  "Day Parties": "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop",
};

export function getCategoryCover(category: EventCategory) {
  return categoryCovers[category];
}

export const team: TeamMember[] = [
  { id: "m1", name: "Elena Wright", email: "elena@sonik.fm", role: "Owner" },
  { id: "m2", name: "Bradley Tromp", email: "bradley@sonik.fm", role: "Admin" },
  { id: "m3", name: "Seth Murphy", email: "seth@sonik.fm", role: "Doorman" },
  { id: "m4", name: "Seth Goodwin", email: "seth.g@sonik.fm", role: "Admin" },
];

export const orders: Order[] = [
  {
    id: "o1",
    eventId: "e2",
    buyerName: "James Brown",
    lines: [
      { tierName: "Skip the line + GA", qty: 2, price: 30000 },
      { tierName: "Ladies Group Order", qty: 1, price: 40000 },
    ],
    tax: 3280,
    fees: 3280,
    status: "Confirmed",
  },
];

export const tickets: Ticket[] = [
  { id: "tk1", orderId: "o1", eventId: "e2", tierName: "Skip the line + GA", status: "upcoming", code: "SNK-NYLA-4821" },
  { id: "tk2", orderId: "o1", eventId: "e2", tierName: "Skip the line + GA", status: "upcoming", code: "SNK-NYLA-4822" },
  { id: "tk3", orderId: "o1", eventId: "e2", tierName: "Ladies Group Order", status: "upcoming", code: "SNK-NYLA-4823" },
  { id: "tk4", orderId: "o1", eventId: "e1", tierName: "General Admission", status: "completed", code: "SNK-MDBT-1190" },
];

export const customers: Customer[] = [
  { id: "c1", name: "James Brown", email: "james@example.com", ordersCount: 3, totalSpent: 340000 },
  { id: "c2", name: "Priya Nair", email: "priya@example.com", ordersCount: 1, totalSpent: 79 },
  { id: "c3", name: "Marco Diaz", email: "marco@example.com", ordersCount: 5, totalSpent: 612 },
  { id: "c4", name: "Aya Tanaka", email: "aya@example.com", ordersCount: 2, totalSpent: 154 },
];

export const revenueByMonth = [
  { month: "Jan", value: 62000 },
  { month: "Feb", value: 98000 },
  { month: "Mar", value: 71000 },
  { month: "Apr", value: 134000 },
  { month: "May", value: 193459 },
  { month: "Jun", value: 158000 },
];

export const organizerStats = {
  totalTicketsSold: 89935,
  pageViews: 5900,
  netIncome: 193459,
  genderRatio: { female: 58, male: 42 },
  newVsReturning: { new: 123, returning: 288 },
};
