import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { sendMailError } from "../services/errorService.js";

dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

//   SI NO REQUIERE SEGURIDAD AL ENVIAR EL MAIL, DESCOMENTAR ESTA PARTE Y COMENTAR LA SIGUIENTE //

// const transport = nodemailer.createTransport({
//   host: SMTP_HOST,
//   port: SMTP_PORT,

//   auth: {
//     user: SMTP_USER,
//     pass: SMTP_PASS,
//   },
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////
//  ESTE CODIGO ES POR SI TIENES EL ERROR:    Error: self-signed certificate in certificate chain  //
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
const sendMailUtil = async (email, subject, body) => {
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject,
      text: body,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    sendMailError();
  }
};

export default sendMailUtil;
