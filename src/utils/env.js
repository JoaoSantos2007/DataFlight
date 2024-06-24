import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const ACCESSTOKEN_LIFETIME = process.env.ACCESSTOKEN_LIFETIME || 15;
const REFRESHTOKEN_LIFETIME = process.env.REFRESHTOKEN_LIFETIME || 52;
const MONGO_URL = process.env?.MONGO_URL;
const DATABASE_NAME = process.env?.DATABASE_NAME;
const SALT = process.env?.SALT;
const SECRET = process.env?.SECRET;
const MQTT_URL = process.env?.MQTT_URL;
const MQTT_USER = process.env?.MQTT_USER;
const MQTT_PASSWORD = process.env?.MQTT_PASSWORD;

if (!MONGO_URL || !SALT || !SECRET || !DATABASE_NAME) {
  throw new Error('It is missing the Environment Variables in the .env file at the root of the project!');
}

export {
  PORT,
  HOST,
  ACCESSTOKEN_LIFETIME,
  REFRESHTOKEN_LIFETIME,
  MONGO_URL,
  DATABASE_NAME,
  SALT,
  SECRET,
  MQTT_URL,
  MQTT_USER,
  MQTT_PASSWORD,
};
