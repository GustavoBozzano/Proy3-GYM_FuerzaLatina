import { useState } from "react";
import axios from "axios";
import auth from "../../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import "./NewExercise.css";

function NewExercise() {
  const [okExercise, SetOkExercise] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    typology: "Fuerza",
    muscle_group: "",
    equipment: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetOkExercise("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("typology", formData.typology);
    formDataToSend.append("muscle_group", formData.muscle_group);
    formDataToSend.append("equipment", formData.equipment);

    const token = auth.getToken();
    try {
      const response = await axios.post("api/newExercises", formDataToSend, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.status === "ok") {
        navigate("/exercise");
        SetOkExercise("Ejercicio creado con EXITO..!!!");
      }
    } catch (error) {
      console.error("Error al crear un nuevo ejercicio:", error);
      const noOk = error.response.data.message;
      SetOkExercise(
        `ERROR al crear el ejercicio....intente nuevamente: ${noOk}`
      );
    }
  };

  return (
    <div className="new-exercise-form">
      <h2>Crea un nuevo ejercicio</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descrpition">Descripción: </label>
          <textarea
            required
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="typology">Tipología:</label>
          <input
            required
            type="radio"
            id="typologyFuerza"
            name="typology"
            value="Fuerza"
            onChange={handleChange}
            checked={formData.typology === "Fuerza"}
          />
          Fuerza
          <input
            type="radio"
            id="typologyPotencia"
            name="typology"
            value="Potencia"
            onChange={handleChange}
            checked={formData.typology === "Potencia"}
          />
          Potencia
          <input
            type="radio"
            id="typologyResistencia"
            name="typology"
            value="Resistencia"
            onChange={handleChange}
            checked={formData.typology === "Resistencia"}
          />
          Resistencia
        </div>

        <div className="form-group">
          <label htmlFor="muscle_group">Grupo Muscular:</label>
          <input
            required
            type="text"
            id="muscle_group"
            name="muscle_group"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="equipment">Equipo:</label>
          <input
            required
            type="text"
            id="equipment"
            name="equipment"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {okExercise && <p>{okExercise}</p>}

        <button type="submit" className="btn btn-primary">
          Crear Ejercicio
        </button>
        <Link className="btn-cancelar" to="#" onClick={() => window.history.back()}>
          Cancelar
        </Link>
      </form>
    </div>
  );
}

export default NewExercise;
