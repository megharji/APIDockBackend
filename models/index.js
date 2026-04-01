const { createUserTable } = require("./authModel");
const { createApiRequestsTable } = require("./requestModel");
const { createCollectionsTable } = require("./collectionModel");
const { createRequestHistoryTable } = require("../models/historyModel");

const initDb = async () => {
  try {
    await createUserTable();
    await createApiRequestsTable();
    await createCollectionsTable();
    await createRequestHistoryTable();
    
    console.log("Table is ready");
  } catch (error) {
    console.error("❌ DB Error:", error.message);
  }
};

module.exports = initDb;
