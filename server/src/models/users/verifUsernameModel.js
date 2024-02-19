import getPool from "../../database/getPool.js";

const verifUsernameModel = async (username) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
        SELECT id_user FROM users WHERE username = ?
        `,
    [username]
  );
  return result[0];
};

export default verifUsernameModel;
