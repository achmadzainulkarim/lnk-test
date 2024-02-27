// Import required modules
import { createClient } from 'redis';
import config from '../config/config';

const client = createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
});

export const isConnected = async () => {
  try {
    await client.ping();
    return true;
  } catch (err) {
    return false;
  }
};

export const redisSet = async (key: string, value: string) => {
  try {
    const connected : boolean = await isConnected();
    if(!connected){
      await client.connect();
    }
    await client.set(key, value);
    return true;
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
}

export const redisGet = async (key: string) => {
  try {
    const connected : boolean = await isConnected();
    if(!connected){
      await client.connect();
    }
    const data = await client.get(key);
    return data;
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
}

export const redisDel = async (key: string) => {
  try {
    const connected : boolean = await isConnected();
    if(!connected){
      await client.connect();
    }
    const data = await client.del(key);
    return data;
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
}

export default client;