import jwt from "jsonwebtoken";

import {
  unauthorizedUserError,
  notAuthenticatedError,
} from "../services/errorService.js";

const cantEditController = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    notAuthenticatedError();
  }

  ////////////////// SI NO SOMOS ADMIN NO PODEMOS EDITAR NINGÚN EJERCICIO ///////////////////
  try {
    const tokenInfo = jwt.verify(authorization, process.env.SECRET);
    if (tokenInfo.role !== "admin") unauthorizedUserError();

    req.user = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

export default cantEditController;
