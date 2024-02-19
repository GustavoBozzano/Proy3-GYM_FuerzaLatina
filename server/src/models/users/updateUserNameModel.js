import getPool from "../../database/getPool.js";

const updateUserNameModel = async (userId, username) => {
  const pool = await getPool();

  const [newUsername] = await pool.query(
    `
        UPDATE users
        SET username = ?
        WHERE id_user = ?
    `,
    [username, userId]
  );
  return;
};
export default updateUserNameModel;
