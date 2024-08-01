/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.tsx",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://resumeroast_owner:K27TCcYNfQAm@ep-muddy-wave-a5boo08j.us-east-2.aws.neon.tech/resumeroast?sslmode=require",
  },
};
