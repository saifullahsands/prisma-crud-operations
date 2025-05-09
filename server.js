const server = require("./app")
const { ConnectionDatabase } = require("./config/db.config");
const prisma = require("./utils");
const { PORT } = require("./config/env.config");


(async function () {
  try {
    await ConnectionDatabase();
    server.listen(PORT, () => {
      console.log(`Server is running at PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Error in connection with MongoDB", error);
    await prisma.$disconnect()
    process.exit(1);
  }
})();