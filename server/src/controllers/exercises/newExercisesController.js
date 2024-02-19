import jwt from "jsonwebtoken";
import insertExerciseModel from "../../models/exercises/insertExerciseModel.js";

const newExercisesController = async (req, res, next) => {
  try {
    const { name, description, typology, muscle_group, equipment, photo } =
      req.body;

    const { authorization } = req.headers;
    const tokenInfo = jwt.verify(authorization, process.env.SECRET);
    const userId = tokenInfo.id;

    const exerciseId = await insertExerciseModel(
      name,
      description,
      typology,
      muscle_group,
      equipment,
      userId,
    );

    res.send({
      status: "ok",
      data: {
        exercise: {
          id: exerciseId,
          name,
          description,
          typology,
          muscle_group,
          equipment,
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default newExercisesController;
