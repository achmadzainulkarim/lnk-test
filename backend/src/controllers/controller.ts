// controller.ts
import { createConnection } from 'typeorm';
import { MongoConnection } from '../entities/typeorm/data-source';
import UserController from './user.controller';

// Initialize the TypeORM connection
createConnection().then(async (connection) => {
  // Now you can instantiate controllers and start your application
  const userController = new UserController();
  // ... instantiate other controllers, set up routes, etc.
});