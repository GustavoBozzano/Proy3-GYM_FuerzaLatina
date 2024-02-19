import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";

const getOwnUserController = async (req, res, next) => {
  try {
    const user = await selectUserByIdModel(req.user.id);

    res.send({
      status: "ok",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getOwnUserController;
