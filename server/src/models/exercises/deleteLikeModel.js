import getPool from "../../database/getPool.js";
import { deleteLikeError } from "../../services/errorService.js";

const deletetLikeModel = async (userId, exerciseId) => {
  const pool = await getPool();

  /////////////////////// COMPROBAMOS SI EXISTE LIKE. //////////////////////

  const [favs] = await pool.query(
    `
                SELECT id_like_exercise FROM like_exercises
                WHERE exerciseId=? AND userId = ?
            `,
    [exerciseId, userId],
  );

  if (favs.length == 0) deleteLikeError();

  ///////////// SE ELIMINA EL LIKE DEL USUARIO //////////////////////
  const [result] = await pool.query(
    `
      DELETE FROM like_exercises
      WHERE exerciseId = ? AND userId= ?
      `,
    [exerciseId, userId],
  );

  return result;
};

export default deletetLikeModel;
