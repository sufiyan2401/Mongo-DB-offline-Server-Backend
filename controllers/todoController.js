// const dotenv = require("dotenv"); // Import dotenv
// dotenv.config(); // Load environment variables from .env file
// const todoController = {
//   inserdata: async (req, res) => {
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).json({ error: "Name is required." });
//     }

//     try {
//       const collection = db.collection(process.env.COLLECTION_NAME);
//       const result = await collection.insertOne({ name });
//       res.status(201).json({ id: result.insertedId });
//     } catch (err) {
//       console.error(err.message);
//       res
//         .status(500)
//         .json({ error: "Failed to insert data into the database." });
//     }
//   },
//   getdata: async (req, res) => {
//     try {
//       const collection = db.collection(collectionName);
//       const result = await collection.find().toArray();
//       res.status(200).json(result);
//     } catch (err) {
//       console.error(err.message);
//       res
//         .status(500)
//         .json({ error: "Failed to fetch data from the database." });
//     }
//   },
// };
// module.exports = todoController;
const dotenv = require("dotenv"); // Import dotenv
dotenv.config(); // Load environment variables from .env file

const todoController = {
  insertData: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    try {
      const collection = req.db.collection(process.env.COLLECTION_NAME);
      const result = await collection.insertOne({ name });
      res.status(201).json({ id: result.insertedId });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "Failed to insert data into the database." });
    }
  },
  getData: async (req, res) => {
    try {
      const collection = req.db.collection(process.env.COLLECTION_NAME); // Use process.env.COLLECTION_NAME
      const result = await collection.find().toArray();
      res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "Failed to fetch data from the database." });
    }
  },
};

module.exports = todoController;
