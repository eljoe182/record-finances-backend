import { config } from "dotenv";
config({
  path: ".env",
});

export const variables = {
  PORT: process.env.PORT || 8000,
  DB: process.env.MONGO_URI || "mongodb://localhost:27017/wallet",
  SECRET: process.env.JWT_SECRET || "secret",
  CLIENT: process.env.CLIENT_URL,
  MAIL: {
    HOST: process.env.MAIL_HOST || "smtp.mailtrap.io",
    PORT: process.env.MAIL_PORT || 2525,
    USER: process.env.MAIL_USER || "",
    PASS: process.env.MAIL_PASS || "",
  },
}