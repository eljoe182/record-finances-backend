import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index";
import database from "./config/db";
import { variables } from './config/variables';

database();

const allowlist = [
  "http://192.168.1.101:8000",
  variables.CLIENT,
];
const corsOptionsDelegate = function (req: any, callback: any) {
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
