import updateUserPassModel from "../../models/users/updateUserPassModel.js";
import validateSchemaUtil from "../../util/validateSchemaUtil.js";
import editUserPassSchema from "../../schemas/users/editUserPassSchema.js";

const editUserPasswordController = async (req, res, next) => {
  try {
    const { email, recoverPassCode, newPassword } = req.body;

    await validateSchemaUtil(editUserPassSchema, req.body);

    await updateUserPassModel(email, recoverPassCode, newPassword);

    res.send({
      status: "ok",
      message: "Contraseña actualizada",
    });
  } catch (error) {
    next(error);
  }
};

export default editUserPasswordController;
