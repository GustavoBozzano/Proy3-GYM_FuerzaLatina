import randomstring from "randomstring";
import validateSchemaUtil from "../../util/validateSchemaUtil.js";
import newUserSchema from "../../schemas/users/newUserSchema.js";
import insertUserModel from "../../models/users/insertUserModel.js";

const newUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    await validateSchemaUtil(newUserSchema, req.body);

    const registrationCode = randomstring.generate(30);

    await insertUserModel(username, email, password, registrationCode);

    res.send({
      status: "ok",
      message:
        "Usuario registrado. Verifique su cuenta mediante el email recibido",
    });
  } catch (error) {
    next(error);
  }
};

export default newUserController;
