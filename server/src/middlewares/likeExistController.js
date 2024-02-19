import getPool from "../database/getPool.js";
import { notLikeError } from "../services/errorService.js";

const listLikesController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const userId = req.params.userId || req.user?.id;

    const [likes] = await pool.query(
      `
      SELECT 
        e.id_exercise, 
        e.name, 
        e.description, 
        e.typology, 
        e.muscle_group, 
        e.equipment,
        pe.id_photo_exercise AS photoId,
        pe.name AS photoName
      FROM like_exercises l
      JOIN exercises e ON l.exerciseId = e.id_exercise
      LEFT JOIN photo_exercises pe ON e.id_exercise = pe.exerciseId
      WHERE l.userId = ?
      `,
      [userId]
    );

    if (!likes.length) {
      notLikeError(`${userId}`);
    }
    res.send({
      status: "ok",
      data: likes,
    });
  } catch (error) {
    next(error);
  }
};

export default listLikesController;
