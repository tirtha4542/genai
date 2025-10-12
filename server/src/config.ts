import dotenv from "dotenv";

dotenv.config();

const appConfig = {
  PORT: process.env.PORT || 7865,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "*",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

export default appConfig;
