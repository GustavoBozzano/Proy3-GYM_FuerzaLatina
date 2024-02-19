import getPool from "../../database/getPool.js";

const selectExercisesByIdModel = async (exerciseId) => {
  const pool = await getPool();

  const [exercise] = await pool.query(
    `
            SELECT e.name, e.description, e.typology, e.muscle_group, e.equipment, COALESCE(COUNT(l.id_like_exercise), 0) AS likes
            FROM exercises e
            LEFT JOIN like_exercises l ON l.exerciseId = e.id_exercise
            WHERE e.id_exercise = ${exerciseId}
    `,
  );

  const [photos] = await pool.query(
    `
      SELECT id_photo_exercise, name FROM photo_exercises WHERE exerciseId = ?
    `,
    [exerciseId],
  );

  exercise[0].photos = photos;
  
  return exercise[0];
};

export default selectExercisesByIdModel;
