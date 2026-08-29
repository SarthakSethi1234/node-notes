import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  out: "./drizzle",
  schema: "./drizzle/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:admin@localhost:5432/mydb",
  },
});

module.exports = config