import insertPhotoModel from "../../models/exercises/insertPhotoModel.js";
import selectExerciseByIdModel from "../../models/exercises/selectExerciseByIdModel.js";
import { cloudinaryService } from "../../services/cloudinaryService.js";
import { photoLimitReachedError } from "../../services/errorService.js";

const addExercisePhotoController = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;

    const exercise = await selectExerciseByIdModel(exerciseId);

    if (exercise.photos.length > 0) {
      photoLimitReachedError();
    }

    const photoName = await cloudinaryService(req.files.photo);

    const photoId = await insertPhotoModel(photoName, exerciseId);
    res.send({
      status: "ok",
      data: {
        photo: {
          id: photoId,
          name: photoName,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default addExercisePhotoController;
