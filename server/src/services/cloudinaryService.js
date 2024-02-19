import cloudinary from "cloudinary";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

dotenv.config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_ACCESS_KEY } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_ACCESS_KEY,
});

export const cloudinaryService = async (photo) => {
  try {
    const imgName = `${uuid()}`;

    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "Imagenes", 
      public_id: imgName, 
    });

    return result.secure_url;
  } catch (err) {
    console.error("Error al subir la imagen a Cloudinary:", err);
    throw new Error(err);
  }
};

export default {
  cloudinaryService,
};
