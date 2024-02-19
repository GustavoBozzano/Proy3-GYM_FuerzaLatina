import getPool from "../../database/getPool.js";

const modifExerciseModel = async (
  exerciseId,
  name,
  description,
  typology,
  muscle_group,
  equipment,
  photoName
) => {
  const pool = await getPool();

  const [namePhoto] = await pool.query(
    `
        SELECT name FROM photo_exercises
        WHERE exerciseId = ${exerciseId} 
    `
  );

  const [photo] = await pool.query(
    `
        UPDATE photo_exercises
        SET name = ?, exerciseId = ?
        WHERE exerciseId = ${exerciseId} 
    `,
    [photoName, exerciseId]
  );

  const [result] = await pool.query(
    `
            UPDATE exercises
            SET name = ?, description = ?, typology = ?, muscle_group = ?, equipment = ?
            WHERE id_exercise = ${exerciseId}
        `,
    [name, description, typology, muscle_group, equipment]
  );

  return namePhoto;
};

export default modifExerciseModel;
