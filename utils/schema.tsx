import { pgTable, serial, text, varchar, jsonb } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData"),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
});

export const Resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  uniqueId: varchar("uniqueId").notNull(),
  content: text("content").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
  roasts: jsonb("roasts").$type<Array<{ userId: string; email: string; score: number; date: string }>>().default([]),
});