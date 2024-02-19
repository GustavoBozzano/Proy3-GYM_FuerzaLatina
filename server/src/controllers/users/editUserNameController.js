import { emptyUserNameError } from "../../services/errorService.js";
import updateUserNameModel from "../../models/users/updateUserNameModel.js";

const editUserNameController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let { username } = req.body;

    if (!username) emptyUserNameError();

    const newUsername = await updateUserNameModel(userId, username);

    res.send({
      status: "ok",
      message: "Username modificado con EXITO",
    });
  } catch (error) {
    next(error);
  }
};

export default editUserNameController;
