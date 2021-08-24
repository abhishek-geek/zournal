import { IUser } from "./model/user";

declare namespace Express {
  export interface Request {
    token?: string;
    user?: IUser;
  }
}
