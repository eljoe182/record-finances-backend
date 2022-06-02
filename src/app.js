import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import routes from "./routes/index.js";
import database from "./config/db.js";

config({
  path: ".env",
});

database();

const allowlist = [
  "http://*.heroku.com",
  "https://*.heroku.com",
  "http://localhost:4000",
  process.env.CLIENT_URL,
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

const app = express();

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes);

export default app;
