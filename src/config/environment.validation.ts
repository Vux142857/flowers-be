import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  // JWT
  JWT_SECRET: Joi.string(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
  // Google Auth
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  // Zalo Auth
  ZALO_APP_ID: Joi.string().required(),
  ZALO_KEY1: Joi.string().required(),
  ZALO_KEY2: Joi.string().required(),
  // Server and client
  SERVER: Joi.string().required(),
  CLIENT: Joi.string().required(),
});
