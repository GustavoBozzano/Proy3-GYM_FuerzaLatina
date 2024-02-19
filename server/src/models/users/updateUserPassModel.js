import getPool from "../../database/getPool.js";
import bcrypt from "bcrypt";
import { recoveryCodeError } from "../../services/errorService.js";
import selectUserByEmailModel from "./selectUserByEmailModel.js";

const updateUserPassModel = async (email, recoverPassCode, newPassword) => {
  const pool = await getPool();

  const user = await selectUserByEmailModel(email);

  if (!user || user.recoverPassCode !== recoverPassCode) recoveryCodeError();

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(newPassword, salt);

  await pool.query(
    `
            UPDATE users
            SET password = ?, recoverPassCode = null
            WHERE recoverPassCode = ?
        `,
    [hashPass, recoverPassCode]
  );
};

export default updateUserPassModel;
