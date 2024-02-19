import getPool from "../../database/getPool.js";

const selectExercisesByQueryParamsModel = async (params) => {
  const pool = await getPool();

  try {
    let query = `SELECT * FROM exercises WHERE`;
    const queryParams = [];

    // Construir la consulta SQL según el primer parámetro proporcionado
    if (params.muscle_group) {
      query += " muscle_group LIKE ?";
      queryParams.push(`%${params.muscle_group}%`);
    } else if (params.equipment) {
      query += " equipment LIKE ?";
      queryParams.push(`%${params.equipment}%`);
    } else if (params.typology) {
      query += " typology = ?";
      queryParams.push(params.typology);
    }

    // Ejecutar la consulta SQL con los parámetros
    const [exercises] = await pool.query(query, queryParams);

    for (const exercise of exercises) {
      const [photos] = await pool.query(
        `
        SELECT id_photo_exercise, name FROM photo_exercises WHERE exerciseId=?
      `,
        [exercise.id_exercise]
      );

      exercise.photos = photos;
    }

    return exercises;
  } catch (error) {
    console.error("Error al obtener los ejercicios:", error.message);
    throw error;
  }
};

export default selectExercisesByQueryParamsModel;
