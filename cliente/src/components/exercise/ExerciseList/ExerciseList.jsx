import { AuthContext } from "../../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import SearchBar from "../../SearchBar";
import "./ExerciseList.css";

function ExerciseList() {
  const { user } = useContext(AuthContext);

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");

        const options = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get("/api/exercises", options);

        const reversedExercises = response.data.data;

        setExercises(reversedExercises);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  if (loading) {
    return <h1 className="loading-message">LOADING ...</h1>;
  }
  let result;

  const searchHandler = (e) => {
    const searchString = e.target.value;
    searchString.length > 1
      ? setSearchKeyword(searchString)
      : setSearchKeyword("");
  };

  if (searchKeyword !== "") {
    result =
      exercises &&
      exercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !==
            -1 ||
          exercise.typology
            .toLowerCase()
            .indexOf(searchKeyword.toLowerCase()) !== -1 ||
          exercise.muscle_group
            .toLowerCase()
            .indexOf(searchKeyword.toLowerCase()) !== -1 ||
          exercise.equipment
            .toLowerCase()
            .indexOf(searchKeyword.toLowerCase()) !== -1
      );
  } else {
    result = exercises;
  }

  return (
    <div>
      {error && <p className="error-message">{error}</p>}

      <div className="exerc-container">
        {user && user.role === "admin" && (
          <Link to="/NewExercise" className="exerc-link">
            <button className="btn-new">Crear Nuevo Ejercicio</button>
          </Link>
        )}
        <SearchBar searchHandler={searchHandler} />
      </div>

      <div className="exercise-list-container">
        {result.map(
          ({
            id_exercise,
            name,
            photos,
            description,
            typology,
            muscle_group,
            equipment,
          }) => (
            <ExerciseCard
              key={id_exercise}
              id={id_exercise}
              name={name}
              photos={photos.map((photo) => photo.name)}
              description={description}
              typology={typology}
              muscle_group={muscle_group}
              equipment={equipment}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ExerciseList;
