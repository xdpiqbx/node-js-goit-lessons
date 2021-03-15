const app = require("./src/app");
const db = require("./src/db");
const createFolderIsExist = require("./src/helpers/create-dir");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    await createFolderIsExist(UPLOAD_DIR);
    await createFolderIsExist(AVATARS_OF_USERS);

    console.log(`Server run on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`DB Server isn't running. Error message ${error.message}`);
  process.exit(1);
});
