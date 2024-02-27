// middleware/auth.js
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { redisGet } from '../libraries/redis.library';

export default async function (req:any, res:any, next:any) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded : any = jwt.verify(token, config.jwtSecret);
    
    const loginAccess = await redisGet(`jwt:${decoded.username}`)
    if(!loginAccess){
        throw new Error("401");
    }
    req.data = decoded;
    next();
  } catch (err) {
    console.log(err);
    
    res.status(401).json({ message: 'Token is not valid' });
  }
}
