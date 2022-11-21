import { variables } from "./config/variables";
import app from "./app";

function main() {
  const PORT = variables.PORT;
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
