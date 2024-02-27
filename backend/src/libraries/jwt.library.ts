import jwt from 'jsonwebtoken';
import config from "../config/config";

export const signJwtCallback = (payload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration }, (error, token) => {
      if (error) {
        reject("error");
      } else {
        console.log(token);
        resolve(token);
      }
    });
  });
};

export const verifyJwt = (token): boolean => {
  try {
    jwt.verify(token, config.jwtSecret)
    return true;
  } catch (error) {
    return false;
  }
}

