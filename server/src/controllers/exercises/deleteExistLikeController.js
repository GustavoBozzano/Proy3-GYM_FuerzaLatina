import deleteLikeModel from "../../models/exercises/deleteLikeModel.js";
import { notFoundError } from "../../services/errorService.js";

const deleteExistLikeController = async (req, res, next) => {
  try {
    let { exerciseId } = req.params;
    const userId = req.user.id;
    if (!exerciseId) notFoundError();

    const exercise = await deleteLikeModel(userId, exerciseId);

    res.send({
      status: "ok",
      message: "Like eliminado con EXITO",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteExistLikeController;
