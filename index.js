const app = require("./src/app");
const db = require("./src/db");

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`DB Server isn't running. Error message ${error.message}`);
  process.exit(1);
});
