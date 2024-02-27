// import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config/config';
import { createClient } from 'redis';
import { Container } from 'typedi';
import { route } from './routes/routes';
import { MongoConnection, SQLConnection } from './entities/typeorm/data-source';

export default class Loaders {
  app: any;
  constructor(app:any) {
    this.app = app;
  }
  
  async load() {
    try {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(cors());
      route(this.app);
      await this.dbCon();
    } catch (error:any) {
      console.log(error);
    }
  }

  async dbCon() {
    if(config.db.dbcon == "mongodb"){
      console.log("Waiting for MongoDB Connection . . .");
      MongoConnection.initialize()
      .then(async() => {
        console.log("MongoDB Connected!");
      })
      .catch((err) => {
          console.error("Error during Data Source initialization:", err)
      })
      Container.set('mongo', MongoConnection);
    }
    else{
      console.log("Waiting for MySQL Connection . . .");
      SQLConnection.initialize()
      .then(() => {
          console.log("MySQL Connected!")
      })
      .catch((err) => {
          console.error("Error during Data Source initialization:", err)
      })
      Container.set('mysql', SQLConnection);
    }
  }


}
