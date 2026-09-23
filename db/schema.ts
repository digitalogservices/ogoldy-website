import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable(
  "inquiries",
  {
    id: text("id").primaryKey(),
    requestHash: text("request_hash"),
    company: text("company").notNull(),
    contactName: text("contact_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    location: text("location").notNull(),
    assetType: text("asset_type").notNull(),
    quantity: text("quantity").notNull(),
    notes: text("notes").notNull(),
    filesJson: text("files_json").notNull().default("[]"),
    sourcePage: text("source_page").notNull().default(""),
    referrer: text("referrer").notNull().default(""),
    utmJson: text("utm_json").notNull().default("{}"),
    emailStatus: text("email_status").notNull().default("pending"),
    trelloStatus: text("trello_status").notNull().default("pending"),
    relocationJson: text("relocation_json").notNull().default("{}"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_inquiries_email_created").on(t.email, t.createdAt),
    index("idx_inquiries_request_hash").on(t.requestHash),
  ],
);

export const analyticsEvents = sqliteTable(
  "analytics_events",
  {
    id: text("id").primaryKey(),
    eventName: text("event_name").notNull(),
    sessionId: text("session_id").notNull(),
    leadId: text("lead_id"),
    path: text("path").notNull(),
    referrer: text("referrer").notNull().default(""),
    utmJson: text("utm_json").notNull().default("{}"),
    label: text("label").notNull().default(""),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_events_name_created").on(t.eventName, t.createdAt),
    index("idx_events_lead").on(t.leadId),
  ],
);
