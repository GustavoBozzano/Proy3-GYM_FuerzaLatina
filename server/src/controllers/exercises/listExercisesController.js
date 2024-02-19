import selectAllExercisesModel from "../../models/exercises/selectAllExercisesModel.js";
import selectExercisesByQueryParamsModel from "../../models/exercises/selectExercisesByQueryParamsModel.js";

const listExercisesController = async (req, res, next) => {
  try {
    const queryParams = req.query;

    let exercises;

    if (Object.keys(queryParams).length === 0) {
      exercises = await selectAllExercisesModel();
    } else {
      exercises = await selectExercisesByQueryParamsModel(queryParams);
    }

    res.send({
      data: exercises,
    });
  } catch (error) {
    next(error);
  }
};

export default listExercisesController;
