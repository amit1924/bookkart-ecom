import mongoose from "mongoose";

// Create an empty object to hold the connection status
const connection = {
  isConnected: false, // Initialize isConnected as false
};

// Async function to connect to the database
export async function connect() {
  try {
    if (connection.isConnected) {
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

// Export the connect function as db.connect
const db = { connect };

// Export the db object
export default db;
