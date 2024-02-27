import { DataSource, Driver } from "typeorm";
import config from "../../config/config";

const { mongodb, mysql } = config.db;

export const MongoConnection = new DataSource({
  type: "mongodb",
  host: mongodb.host,
  port: mongodb.port,
  username: mongodb.username,
  password: mongodb.password,
  database: mongodb.database,
  entities: ["src/entities/typeorm/**/*.entity.ts"],
  logging: true,
  synchronize: false,
  connectTimeoutMS: 2000,
  socketTimeoutMS: 3000,
});

export const SQLConnection = new DataSource({
  type: "mysql",
  host: mysql.host,
  port: mysql.port,
  username: mysql.username,
  password: mysql.password,
  database: mysql.database,
  logging: true,
  synchronize: false,
});