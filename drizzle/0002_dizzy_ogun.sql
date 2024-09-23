CREATE TABLE IF NOT EXISTS "coverLetters" (
	"id" serial PRIMARY KEY NOT NULL,
	"jobDescription" text NOT NULL,
	"educationSummary" text,
	"projectsSummary" text,
	"experienceSummary" text,
	"content" text,
	"createdBy" varchar,
	"createdAt" varchar
);
--> statement-breakpoint
ALTER TABLE "userResume" ALTER COLUMN "skills" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "userResume" ALTER COLUMN "skills" DROP DEFAULT;