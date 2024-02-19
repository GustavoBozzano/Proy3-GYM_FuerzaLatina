import getPool from "../database/getPool.js";
import { notFoundError } from "../services/errorService.js";

const exerciseExistsController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { exerciseId } = req.params;

    const [exercise] = await pool.query(
      `
                SELECT id_exercise FROM exercises WHERE id_exercise = ?
            `,
            [exerciseId]
    );

    if (exercise.length < 1) notFoundError("Ejercicio");

    next();
  } catch (error) {
    next(error);
  }
};

export default exerciseExistsController;
