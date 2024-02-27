import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWTSECRET || "secret",
    jwtExpiration: process.env.JWTEXP || '1d',
    db : {
      dbcon : process.env.DB_CONNECTION || "mysql",
      mysql : {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: Number(process.env.DB_PORT),
      },
      mongodb : {
        host: process.env.MDB_HOST,
        port: Number(process.env.MDB_PORT),
        username : process.env.MDB_USERNAME,
        password : process.env.MDB_PASSWORD,
        database : process.env.MDB_DATABASE,
      },
    },
    redis: {
      host : process.env.REDIS_HOST || 'localhost',
      port : process.env.REDIS_PORT || 6379,
    },
    nodemailer : {
      email : process.env.NODEMAILER_EMAIL,
      appPass : process.env.NODEMAILER_APP_PASS,
    }
};
  