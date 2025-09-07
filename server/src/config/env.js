import { config } from "dotenv";

config({ path: ".env" });

export const {
  PORT = process.env.PORT || 8000,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
