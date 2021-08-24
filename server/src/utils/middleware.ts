import jwt from "jsonwebtoken";
import User from "../model/user";
import { NextFunction, Request, Response } from "express";
import { SECRET } from "./config";

// interface Req extends Request {
//   token: string;
//   user: IUser | null;
// }

const tokenExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const token = String(request.get("Authorization"));

    if (token) {
      request.token = token;
    }
  } catch (ex) {
    console.error(ex);
    next();
  } finally {
    next();
  }
};

const userExtractor = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const token = request.token;

    if (token) {
      // token = token.substr(1, token.length - 2);
      console.log(token);
      const u = jwt.verify(token, SECRET) as {
        _id: string;
        name: string;
        email: string;
      };
      const user = await User.findById(u._id);
      request.user = user;
    }
  } catch (ex) {
    console.error(ex);
    next();
  } finally {
    next();
  }
};

const middleware = { tokenExtractor, userExtractor };
export default middleware;
