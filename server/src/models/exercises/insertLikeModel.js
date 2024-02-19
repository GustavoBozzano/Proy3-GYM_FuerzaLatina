import getPool from "../../database/getPool.js";
import { favAlreadyExistsError } from "../../services/errorService.js";

const insertLikeModel = async (userId, exerciseId) => {
  const pool = await getPool();

  /////////////////////// COMPROBAMOS SI YA EL USUARIO LE DIO LIKE. //////////////////////

  const [favs] = await pool.query(
    `
            SELECT id_like_exercise FROM like_exercises
            WHERE exerciseId=? AND userId = ?
        `,
    [exerciseId, userId],
  );

  if (favs.length >= 1) favAlreadyExistsError();

  /////////////////// SE INSERTA EL LIKE DEL USUARIO //////////////////////
  const [result] = await pool.query(
    `
    INSERT INTO like_exercises (userId, exerciseId)
    VALUES (?, ?)
    `,
    [userId, exerciseId],
  );

  return result;
};

export default insertLikeModel;
