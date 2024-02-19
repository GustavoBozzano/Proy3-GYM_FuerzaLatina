import jwt from "jsonwebtoken";
import {
  invalidCredentialsError,
  notAuthenticatedError,
} from "../services/errorService.js";

const authUserController = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    try {
      const tokenInfo = jwt.verify(authorization, process.env.SECRET);

      req.user = tokenInfo;

      next();
    } catch (error) {
      invalidCredentialsError();
    }
  } catch (error) {
    next(error);
  }
};

export default authUserController;
