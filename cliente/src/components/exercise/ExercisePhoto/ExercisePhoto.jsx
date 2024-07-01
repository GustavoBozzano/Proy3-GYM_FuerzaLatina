import React, { useState } from 'react';
import axios from 'axios';
import auth from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../Error';
import './ExercisePhoto.css';

function ExercisePhoto({ exerciseId, onUpload, onClose }) {
  const [file, setFile] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const token = auth.getToken();
      const response = await axios.post(
        `api/exercise/${exerciseId}/photo`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      navigate('/exercise/');
    } catch (error) {
      console.error('Error al cargar la foto:', error.response.data.message);
      setError(error.response.data.message);
      setShowErrorModal(true);
    }
  };

  const handleModalClose = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="exercise-details-container">
      <h2 className="entry-title">Foto del ejercicio</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div>
        <button onClick={handleUpload}>Subir Foto</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
      {showErrorModal && (
        <ErrorModal errorMessage={error} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default ExercisePhoto;
