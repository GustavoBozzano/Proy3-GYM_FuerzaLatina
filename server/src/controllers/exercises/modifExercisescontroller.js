import { cloudinaryService } from "../../services/cloudinaryService.js";
import modifExerciseModel from "../../models/exercises/modifExerciseModel.js";
import { emptyFieldExerciseError } from "../../services/errorService.js";

const modifExercisesController = async (req, res, next) => {
  try {
    let { exerciseId } = req.params;
    let { name, description, typology, muscle_group, equipment } = req.body;

    if (!name && !description && !typology && !muscle_group && !equipment)
      emptyFieldExerciseError;

    let photoName = "";

    if (req.files && Object.values(req.files).length > 0) {
      const newPhoto = Object.values(req.files)[0];
      photoName = await cloudinaryService(newPhoto);
    }

    const exercise = await modifExerciseModel(
      exerciseId,
      name,
      description,
      typology,
      muscle_group,
      equipment,
      photoName
    );

    res.send({
      status: "ok",
      message: "Ejercicio modificado con EXITO",
    });
  } catch (error) {
    next(error);
  }
};

export default modifExercisesController;
