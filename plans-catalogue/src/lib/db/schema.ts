import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const plans = sqliteTable("plans", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type", { enum: ["duplex", "villa"] }).notNull(),
  description: text("description").notNull().default(""),
  surface: integer("surface"),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  floors: integer("floors"),
  price: real("price"),
  features: text("features", { mode: "json" }).$type<string[]>().default([]),
  thumbnail: text("thumbnail").default(""),
  images: text("images", { mode: "json" }).$type<string[]>().default([]),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export type Plan = typeof plans.$inferSelect;
export type NewPlan = typeof plans.$inferInsert;
