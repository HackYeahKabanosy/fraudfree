import mongoose, { Connection } from 'mongoose';
import { config } from 'src/config/config';

export const databaseProviders = [
  {
    provide: config.mongoUrl,
    useFactory: async (): Promise<Connection> =>
      await mongoose.createConnection(config.mongoUrl),
  },
];
