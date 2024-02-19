import getPool from "../database/getPool.js";

const verifUsernameController = async (req, res) => {
  try {
    const pool = await getPool();

    const { username } = req.body;

    const [result] = await pool.query(
      "SELECT id_user FROM users WHERE username = ?",
      [username]
    );

    if (result.length > 0) {
      // El nombre de usuario ya está en uso
      res.json({ isTaken: true });
    } else {
      // El nombre de usuario está disponible
      res.json({ isTaken: false });
    }
  } catch (error) {
    console.error("Error al verificar el nombre de usuario:", error);
    res.status(500).json({ error: "Error al verificar el nombre de usuario." });
  }
};

export default verifUsernameController;
