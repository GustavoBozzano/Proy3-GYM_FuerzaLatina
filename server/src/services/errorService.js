export const notFoundError = (resourse) => {
  throw {
    httpStatus: 404,
    code: "RESOURCE_NOT_FOUND",
    message: `El recurso requerido '${resourse}' no se encuentra`,
  };
};

export const userAlReadyRegistratedError = () => {
  throw {
    httpStatus: 409, //conflicto
    code: "USER_ALREADY_REGISTERED",
    message: `El nombre de usuario ya se encuentra registrado`,
  };
};

export const emailAlReadyRegistratedError = () => {
  throw {
    httpStatus: 409, //conflicto
    code: "EMAIL_ALREADY_REGISTERED",
    message: `El email ya se encuentra registrado`,
  };
};

export const invalidCredentialsError = () => {
  throw {
    httpStatus: 401, //no autorizado
    code: "INVALID_CREDENTIALS",
    message: `Credenciales inválidas`,
  };
};

export const sendMailError = () => {
  throw {
    httpStatus: 500, //no autorizado
    code: "SEND_MAIL_FAILED",
    message: `Error al enviar email`,
  };
};

export const pendignActivationError = () => {
  throw {
    httpStatus: 403,
    code: "PENDING_ACTIVATION",
    message: `Usuario pendiente de activación. Verifique su cuenta antes de continuar`,
  };
};

export const notAuthenticatedError = () => {
  throw {
    httpStatus: 401, // autenticacion
    code: "NOT_AUTHENTICATED",
    message: 'Se esperaba un token por el header "Authorization" ',
  };
};
export const photoLimitReachedError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "PHOTO_LIMIT_REACHED",
    message: "Se ha alcanzado el limite Maximo de Fotos",
  };
};

export const saveFileError = () => {
  throw {
    httpStatus: 500,
    code: "FILE_SAVE_FAILED",
    message: "Error al guardar la imagen",
  };
};

export const deleteFileError = () => {
  throw {
    httpStatus: 409, // conflicto
    code: "FILE_DELETED_FAILED",
    message: "Error al eliminar la imagen",
  };
};

export const favAlreadyExistsError = () => {
  throw {
    httpStatus: 409, //conflicto
    code: "VOTE_ALLREADY_ERROR",
    message: "No se puede añadir el ejercicio a favoritos mas de una vez",
  };
};

export const unauthorizedUserError = () => {
  throw {
    httpStatus: 409, //conflicto
    code: "UNAUTHORIZED",
    message: "El usuario no está autorizado para realizar esta operacion",
  };
};

export const photoLimitError = () => {
  throw {
    httpStatus: 409, //conflicto
    code: "PHOTO_LIMIT_ERROR",
    message: "Se alcanzó el limite de tres fotos en la entrada.",
  };
};

export const recoveryCodeError = () => {
  throw {
    httpStatus: 401, //no autorizado
    code: "INVALID_RECOVER_CODE",
    message: "Codigo de recuperación incorrecto",
  };
};

export const emptyFieldExerciseError = () => {
  throw {
    httpStatus: 400,
    code: "EMPTY_FIELD",
    message: "Faltan agregas campos",
  };
};

export const notLikeError = (resourse) => {
  throw {
    httpStatus: 404,
    code: "RESOURCE_NOT_FOUND",
    message: `Todavía no le has dado LIKE a ningun ejercicio`,
  };
};

export const deleteLikeError = () => {
  throw {
    httpStatus: 409, // conflicto
    code: "LIKE_DELETED_FAILED",
    message: "No se encuentra el Like solicitado ",
  };
};
export const emptyUserNameError = () => {
  throw {
    httpStatus: 400,
    code: "EMPTY_FIELD",
    message: "Falta agregar el Nombre de Usuario",
  };
};
