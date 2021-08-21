import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/config";

export const connectMongo = (): Promise<typeof mongoose> => {
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
