import { IUser } from "../../src/model/user";

declare global {
  namespace Express {
    interface Request {
      token: string | null;
      user: IUser;
      userId: string;
    }
  }
}
