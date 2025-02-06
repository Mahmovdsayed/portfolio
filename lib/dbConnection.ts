"use server";
import mongoose from "mongoose";

let connection: any;

const createConnection = async () => {
  if (connection) {
    return connection;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
  connection = await mongoose.connect(uri);
  return connection;
};

export const connectToDatabase = async () => {
  await createConnection();
  console.log("Connected to database");
};

export const disconnectFromDatabase = async () => {
  if (connection) {
    await connection.disconnect();
    connection = null;
    console.log("Disconnected from database");
  }
};
