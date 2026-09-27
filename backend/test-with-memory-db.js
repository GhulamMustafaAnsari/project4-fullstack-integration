const { MongoMemoryServer } = require("mongodb-memory-server");

(async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  process.env.PORT = 5060;
  console.log("MEMORY_MONGO_READY:" + process.env.MONGO_URI);
  require("./server.js");
})();
