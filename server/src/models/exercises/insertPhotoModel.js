import getPool from "../../database/getPool.js";

const insertPhotoModel = async (name, exerciseId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
            INSERT INTO photo_exercises (name, exerciseId)
            VALUES (?,?)
        `,
    [name, exerciseId],
  );

  const { insertId } = result;

  return insertId;
};

export default insertPhotoModel;
