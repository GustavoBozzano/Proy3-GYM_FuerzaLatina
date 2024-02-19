import getPool from "../database/getPool.js";
import { notFoundError } from "../services/errorService.js";

const userExistsController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const userId = req.params.userId || req.user?.id;

    const [user] = await pool.query(
      `
                SELECT id_user FROM users WHERE id_user = ?
            `,
      [userId],
    );

    if (!user.length) {
      notFoundError("usuario");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default userExistsController;
