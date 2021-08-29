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
const userIdExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const token = request.token;
    console.log("asf", token);

    if (token && token !== "undefined") {
      // token = token.substr(1, token.length - 2);
      console.log(token);

      if (token.length < 500) {
        console.log(token);
        const u = jwt.verify(token, SECRET) as {
          email: string;
        };
        request.userId = u.email;
      } else {
        const u = jwt.decode(token) as {
          email: string;
        };
        request.userId = u.email;
      }
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
    const userId = request.userId;
    console.log("userid", userId);

    if (userId) {
      const user = await User.findOne({ email: userId });
      if (user) {
        request.user = user;
        console.log(user);
      }
      console.log("ou");
    }
  } catch (ex) {
    console.error(ex);
    next();
  } finally {
    next();
  }
};

const middleware = { tokenExtractor, userExtractor, userIdExtractor };
export default middleware;
