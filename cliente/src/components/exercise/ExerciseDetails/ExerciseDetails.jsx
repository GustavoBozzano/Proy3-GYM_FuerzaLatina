import { AuthContext } from "../../../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Modal from "../../Modal";
import ExercisePhoto from "../ExercisePhoto/ExercisePhoto";
import ExerciseModify from "../ExerciseModify/ExerciseModify";
import ExerciseDelete from "../ExerciseDelete/ExerciseDelete";

import "./ExerciseDetails.css";

const ExerciseDetails = () => {
  const { user } = useContext(AuthContext);

  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [photos, setPhotos] = useState([]);

  const defaultExercise = "https://placehold.co/90x90.png";

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");
        const options = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(
          `/api/exercise/${exerciseId}`,
          options
        );
        setExercise(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [exerciseId]);

  const handleUploadSuccess = (newPhotos) => {
    setPhotos([...photos, newPhotos]);
  };

  if (!exercise) {
    return <div>Cargando...</div>;
  }

  const { name, description, typology, muscle_group, equipment } = exercise;

  const getMainPhoto = () => {
    // Si hay fotos, devuelve la URL de la primera foto
    if (exercise.photos && exercise.photos.length > 0) {
      return exercise.photos[0].name;
    }
    // Si no hay fotos, devuelve la URL de la imagen por defecto
    return defaultExercise;
  };

  return (
    <div>
      <div className="exercise-details-container">
        <div className="foto-list">
          <img
            src={getMainPhoto()}
            alt={`Main Photo`}
            className="exercise-foto"
          />
          {/* {exercise.photos &&
            exercise.photos.map((photo) => (
              <img
                key={photo.id_photo_exercise}
                src={photo.name}
                alt={`photo ${photo.id_photo_exercise}`}
                className="exercise-foto"
              />
            ))} */}
        </div>
        {error && <p>{error}</p>}
        {loading && <h1>LOADING ...</h1>}
        {exercise && (
          <>
            <div className="details-exercise">
              <h2 className="exercise-nombre">
                <span className="underline">Nombre: </span>&nbsp; {name}
              </h2>
              <p className="exercise-descripcion">
                <span className="underline">Descripción: </span>&nbsp;
                {description}
              </p>
              <p className="exercise-tipologia">
                <span className="underline">Tipología:</span>&nbsp; {typology}
              </p>
              <p className="exercise-grupoMuscular">
                <span className="underline">Grupo Muscular:</span>&nbsp;{" "}
                {muscle_group}
              </p>
              <p className="exercise-equipo">
                <span className="underline">Equipo:</span>&nbsp; {equipment}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="buttons-container">
        {user.role === "admin" && (
          <div>
            <button
              onClick={() => setShowPhotoModal(true)}
              className="add-photo-button"
            >
              Agregar foto
            </button>
            {showPhotoModal && (
              <Modal>
                <ExercisePhoto
                  exerciseId={exerciseId}
                  onClose={() => setShowPhotoModal(false)}
                  onUpload={handleUploadSuccess}
                />
              </Modal>
            )}

            <button
              onClick={() => setShowModifyModal(true)}
              className="add-photo-button"
            >
              Editar
            </button>

            {showModifyModal && (
              <Modal>
                <ExerciseModify
                  exerciseId={exerciseId}
                  onClose={() => setShowModifyModal(false)}
                  onUpload={handleUploadSuccess}
                />
              </Modal>
            )}

            <button
              onClick={() => setShowDeleteModal(true)}
              className="add-photo-button"
            >
              Eliminar
            </button>

            {showDeleteModal && (
              <Modal>
                <ExerciseDelete
                  exerciseId={exerciseId}
                  onClose={() => setShowDeleteModal(false)}
                  onUpload={handleUploadSuccess}
                />
              </Modal>
            )}
          </div>
        )}

        <Link
          className="ReturListExercise"
          to="#"
          onClick={() => window.history.back()}
        >
          <h3>VOLVER</h3>
        </Link>
      </div>
    </div>
  );
};

export default ExerciseDetails;
