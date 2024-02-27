import { MongoClient } from 'mongodb';
import { MongoConnection } from '../typeorm/data-source';

const createCollectionsIfNotExist = async (): Promise<void> => {
  try {
    // Initialize connection
    await MongoConnection.initialize();
    console.log("MongoDB Connected!");

    // Access the MongoDB native client
    const mongoClient: MongoClient = (MongoConnection.driver as any).mongodb;

    // Access metadata using getMongoManager
    const metadata = MongoConnection.manager.connection.entityMetadatas;
    console.log("Metadata loaded:", metadata);

    // Ensure collections for each entity exist
    await Promise.all(metadata.map(async (entity) => {
      const collectionName = entity.tableName;

      // Use native MongoDB command to create the collection
      const db = mongoClient.db();
      await db.createCollection(collectionName);

      console.log(`Collection checked/created: ${collectionName}`);
    }));
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

// Run the migration
createCollectionsIfNotExist();
