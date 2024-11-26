import { pgTable, serial, text, varchar, jsonb, integer } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull(),
  name: varchar("name"),
  credits: integer("credits").default(100),
});

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
  roasts: jsonb("roasts")
    .$type<
      Array<{ userId: string; email: string; score: number; date: string }>
    >()
    .default([]),
});

export const userResume = pgTable("userResume", {
  //default info
  id: serial("id").primaryKey(),
  uniqueId: varchar("uniqueId").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
  //personal info
  firstName: varchar("firstName"),
  lastName: varchar("lastName"),
  designation: varchar("designation"),
  address: varchar("address"),
  email: varchar("email"),
  phone: varchar("phone"),
  summary: text("summary"),
  //experience 1
  designation1: varchar("designation1"),
  companyName1: varchar("companyName1"),
  city1: varchar("city1"),
  state1: varchar("state1"),
  startDate1: varchar("startDate1"),
  endDate1: varchar("endDate1"),
  description1: text("description1"),
  //experience 2
  designation2: varchar("designation2"),
  companyName2: varchar("companyName2"),
  city2: varchar("city2"),
  state2: varchar("state2"),
  startDate2: varchar("startDate2"),
  endDate2: varchar("endDate2"),
  description2: text("description2"),
  //experience 3
  designation3: varchar("designation3"),
  companyName3: varchar("companyName3"),
  city3: varchar("city3"),
  state3: varchar("state3"),
  startDate3: varchar("startDate3"),
  endDate3: varchar("endDate3"),
  description3: text("description3"),
  //experience 4
  designation4: varchar("designation4"),
  companyName4: varchar("companyName4"),
  city4: varchar("city4"),
  state4: varchar("state4"),
  startDate4: varchar("startDate4"),
  endDate4: varchar("endDate4"),
  description4: text("description4"),
  //education 1
  schoolName1: varchar("schoolName1"),
  degree1: varchar("degree1"),
  startDateEdu1: varchar("startDateEdu1"),
  endDateEdu1: varchar("endDateEdu1"),
  descriptionEdu1: text("descriptionEdu1"),
  //education 2
  schoolName2: varchar("schoolName2"),
  degree2: varchar("degree2"),
  startDateEdu2: varchar("startDateEdu2"),
  endDateEdu2: varchar("endDateEdu2"),
  descriptionEdu2: text("descriptionEdu2"),
  //education 3
  schoolName3: varchar("schoolName3"),
  degree3: varchar("degree3"),
  startDateEdu3: varchar("startDateEdu3"),
  endDateEdu3: varchar("endDateEdu3"),
  descriptionEdu3: text("descriptionEdu3"),
  //education 4
  schoolName4: varchar("schoolName4"),
  degree4: varchar("degree4"),
  startDateEdu4: varchar("startDateEdu4"),
  endDateEdu4: varchar("endDateEdu4"),
  descriptionEdu4: text("descriptionEdu4"),
  //projects 1
  projectName1: varchar("projectName1"),
  projectDescription1: text("projectDescription1"),
  //projects 2
  projectName2: varchar("projectName2"),
  projectDescription2: text("projectDescription2"),
  //projects 3
  projectName3: varchar("projectName3"),
  projectDescription3: text("projectDescription3"),
  //projects 4
  projectName4: varchar("projectName4"),
  projectDescription4: text("projectDescription4"),
  //skills
  // Add skills fields
  skills: text("skills"),
});
export const CoverLetters = pgTable("coverLetters", {
  id: serial("id").primaryKey(),
  jobDescription: text("jobDescription").notNull(),
  educationSummary: text("educationSummary"),
  projectsSummary: text("projectsSummary"),
  experienceSummary: text("experienceSummary"),
  content: text("content"),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
});