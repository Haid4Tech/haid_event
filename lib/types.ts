export type TicketTier = {
  id: string;
  name: string;
  price: number;
  available: number;
  capacity: number;
  scanned: number;
  description: string;
};

export type EventCategory = "Club Nights" | "Live Music" | "Festivals" | "Day Parties";

export type Event = {
  id: string;
  slug: string;
  title: string;
  organizer: string;
  organizerFollowers: number;
  category: EventCategory;
  city: string;
  venue: string;
  address: string;
  date: string;
  doors: string;
  cover: { from: string; to: string };
  image: string;
  attendees: string[];
  sampleUrl?: string;
  price: number;
  attendeeCount: number;
  lineup: string[];
  about: string;
  tiers: TicketTier[];
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Doorman";
};

export type Order = {
  id: string;
  eventId: string;
  buyerName: string;
  lines: { tierName: string; qty: number; price: number }[];
  fees: number;
  tax: number;
  status: "Confirmed";
};

export type Ticket = {
  id: string;
  orderId: string;
  eventId: string;
  tierName: string;
  status: "upcoming" | "completed";
  code: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
};
