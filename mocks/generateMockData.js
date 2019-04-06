import users from "./mockUsers";
import capabilities from "./mockCapabilities";
import events from "./mockEvents";

export default async db => {
  // Clear database
  console.log("Clearing database...");
  try {
    await Promise.all([
      db.collection("users").drop(),
      db.collection("capabilities").drop(),
      db.collection("events").drop()
    ]);
    console.log("Cleared database.");
  } catch (error) {
    console.log(error);
    console.log("Failed to clear the database.");
  }

  // Add mock data
  console.log("Adding mock data...");
  try {
    await db.collection("users").insertMany(users);
    await db.collection("capabilities").insertMany(capabilities);
    await db.collection("events").insertMany(events);
    console.log("Finished adding mock data.");
  } catch (error) {
    console.log(error);
    console.log("Failed to add mock data.");
  }
};
