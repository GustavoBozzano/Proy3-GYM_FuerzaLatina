import { useState } from "react";
import axios from "axios";
import Modal from "../../Modal";
import "./PassRecovery.css";

function PassRecovery({ handleModal }) {
  const [emailForReset, setEmailForReset] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetPhase, setResetPhase] = useState("request"); 
  const [notOkRecoverPass, SetNotOkRecoverPass] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    SetNotOkRecoverPass("");
    try {
      if (resetPhase === "request") {

        await axios.post("/api/users/password/recover", {
          email: emailForReset,
        });
        setResetMessage(
          "Se te ha enviado un email con las instrucciones para restablecer tu contraseña."
        );
        setResetPhase("reset"); 
      } else {

        await axios.put("/api/users/password", {
          email: emailForReset,
          recoverPassCode: resetCode,
          newPassword: newPassword,
        });
        setResetMessage("La contraseña se ha restablecido con éxito.");

        setEmailForReset("");
        setResetCode("");
        setNewPassword("");
        setResetPhase("request"); 
      }
    } catch (error) {
      setResetMessage(
        "Error al enviar la solicitud o restablecer la contraseña. Por favor, inténtalo de nuevo."
      );
      SetNotOkRecoverPass(error.response.data.message);
    }
  };

  return (
    <Modal>
      <div className="password-recovery-container">
        <form onSubmit={handlePasswordReset} className="password-recovery-form">
          <div className="e-reset">
            <label className="email-label" htmlFor="email-reset">
              Email para Restablecer Contraseña
              <input
                required
                type="email"
                id="email-reset"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                placeholder="Ingresa email"
              />
            </label>
          </div>

          {resetPhase === "reset" && (
            <>
              <div>
                <label htmlFor="reset-code">
                  Código de Recuperación
                  <input
                    required
                    type="text"
                    id="reset-code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Ingresa código"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="new-password">
                  Nueva Contraseña
                  <input
                    required
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Ingresa nueva contraseña"
                  />
                </label>
              </div>
            </>
          )}
          {notOkRecoverPass && (
            <p style={{ color: "orange" }}>{notOkRecoverPass}</p>
          )}

          <button type="submit">
            {resetPhase === "request"
              ? "Enviar Solicitud"
              : "Restablecer Contraseña"}
          </button>

          <button onClick={handleModal}>Cancelar</button>

          {resetMessage && (
            <>
              <p className="reset-message">{resetMessage}</p>
              <button onClick={handleModal}>OK</button>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
}

export default PassRecovery;
