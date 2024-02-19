import joi from "joi";

import joiErrorMessages from "../joiErrorMessages.js";

const newExerciseSchema = joi.object({
  name: joi.string().min(5).max(50).required().messages(joiErrorMessages),
  description: joi
    .string()
    .min(10)
    .max(500)
    .required()
    .messages(joiErrorMessages),
  muscle_group: joi
    .string()
    .min(3)
    .max(100)
    .required()
    .messages(joiErrorMessages),
  equipment: joi.string().min(3).max(100).required().messages(joiErrorMessages),
  typology: joi
    .string()
    .valid("value1", "value2", "value3")
    .required()
    .messages(joiErrorMessages),
});

export default newExerciseSchema;
