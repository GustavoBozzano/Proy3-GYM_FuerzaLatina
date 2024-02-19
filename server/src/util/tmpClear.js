import fs from "fs";
import path from "path";

const tempFolderPath = path.join("../../", "tmp");

const limpiarTemp = () => {
  fs.readdir(tempFolderPath, (err, files) => {
    if (err) {
      console.error("Error al leer la carpeta Temp:", err);
      return;
    }

    const ahora = new Date().getTime();

    files.forEach((file) => {
      const filePath = path.join(tempFolderPath, file);
      const stat = fs.statSync(filePath);

      const tiempoDeVida = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
      const tiempoTranscurrido = ahora - stat.mtime.getTime();

      if (tiempoTranscurrido > tiempoDeVida) {
        fs.unlinkSync(filePath); // Elimina el archivo si ha pasado el tiempo de vida
      }
    });
    process.exit();
  });
};

// Ejecutar la limpieza cada 24 horas
setInterval(limpiarTemp, 24 * 60 * 60 * 1000);
