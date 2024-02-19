import getPool from "../../database/getPool.js";

const selectUserByIdModel = async (userId) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT id_user, username, email, role, createdAt
            FROM users
            WHERE id_user = ?
        `,
    [userId]
  );

  return user[0];
};

export default selectUserByIdModel;
