import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV,
  mongoUrl: process.env.MONGO_URL,
  gptSecret: process.env.GPT_SECRET_KEY,
  vtSecret: process.env.VT_SECRET_KEY
};
