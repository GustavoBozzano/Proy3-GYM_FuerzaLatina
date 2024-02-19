import selectExerciseByIdModel from "../../models/exercises/selectExerciseByIdModel.js";

const getExercisesController = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;

    const exercise = await selectExerciseByIdModel(exerciseId);

    res.send({
      status: "ok",
      data: exercise,
    });
  } catch (error) {
    next(error);
  }
};

export default getExercisesController;
