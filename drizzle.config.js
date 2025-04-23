/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.tsx",
  out: "./drizzle",
  dbCredentials: {
    url: "",
  },
};
