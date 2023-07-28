const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const todoRoute = require("./routes/todoRoutes");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); // Import dotenv

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config(); // Load environment variables from .env file

app.use("/api/todo", todoRoute);

// Connect to MongoDB
let db;

async function connectToMongo() {
  try {
    const client = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
}

// Initialize MongoDB and the collection
connectToMongo().then(() => {
  db.createCollection(process.env.COLLECTION_NAME, {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name"],
        properties: {
          name: {
            bsonType: "string",
            description: "must be a string and is required",
          },
        },
      },
    },
  });
});
app.use((req, res, next) => {
  req.db = db;
  next();
});

const routes = require("./routes/todoRoutes");
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
