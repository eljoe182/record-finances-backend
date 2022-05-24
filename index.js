import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

function main() {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
}

main();
