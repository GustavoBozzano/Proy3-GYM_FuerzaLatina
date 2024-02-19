import joi from "joi";

import imgSchema from "../../src/schemas/imgSchema.js";

const addExercisePhotoSchema = joi.object({
  photo: imgSchema.required(),
});

export default addExercisePhotoSchema;
