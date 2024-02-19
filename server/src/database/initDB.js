import getPool from "./getPool.js";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const { UPLOADS_DIR } = process.env;
const { MYSQL_DATABASE } = process.env;

/////////////////////   VACIADO DE CARPETA UPLOAD    ////////////////////
const folderUpload = path.join(process.cwd(), `./src/${UPLOADS_DIR}`);
// Función asincrónica para vaciar la carpeta de las fotos
const folderEmpty = async (folder) => {
  try {
    // Elimina la carpeta y su contenido
    await fs.rm(folder, { recursive: true });

    // Crea la carpeta vacía nuevamente
    await fs.mkdir(folder);

  } catch (error) {
    console.error(`Error al vaciar la carpeta ${UPLOADS_DIR}:`, error);
  }
};
folderEmpty(folderUpload);

///////////////////////////  INICIALIZADO DE BBDD  ///////////////////7
const initDB = async () => {
  try {
    let pool = await getPool();

    await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

    await pool.query(`USE ${MYSQL_DATABASE}`);
    await pool.query(
      "DROP TABLE IF EXISTS like_exercises, photo_exercises, exercises, users"
    );

    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
      `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS exercises (
                id_exercise INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                description TEXT NOT NULL,
                typology ENUM('fuerza', 'potencia', 'resistencia'),
                muscle_group VARCHAR(100),
                equipment VARCHAR(100),
                userId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id_user)

        )
     `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS photo_exercises (
                id_photo_exercise INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(250) NOT NULL,
                exerciseId INT NOT NULL,
                FOREIGN KEY (exerciseId) REFERENCES exercises(id_exercise)
            )
    `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS like_exercises (
                id_like_exercise INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                userId INT NOT NULL,
                exerciseId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id_user),
                FOREIGN KEY (exerciseId) REFERENCES exercises(id_exercise)
                );
    `);
    await pool.query(`
                ALTER TABLE like_exercises
                ADD CONSTRAINT fk_like_exercises_exercise
                FOREIGN KEY (exerciseId)
                REFERENCES exercises(id_exercise)
                ON DELETE CASCADE;
    `);

  } catch (error) {
    console.log(error);
  } finally {

    process.exit();
  }
};

initDB();
