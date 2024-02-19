import { useState, useEffect } from "react";
import axios from "axios";
import ExerciseCard from "../../exercise/ExerciseCard/ExerciseCard";

const defaultExercise = "https://placehold.co/90x90.png";

function ListLike() {
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
        const response = await axios.get("/api/listlikes", options);

        const reversedExercises = response.data.data;

        setExercises(reversedExercises);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

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
          exercise.title.toLowerCase().indexOf(searchKeyword.toLowerCase()) !==
          -1
      );
  } else {
    result = exercises;
  }

  return (
    <div className="exercise-list-container">
      {error && <p className="error-message">{error}</p>}

      {loading && <h1 className="loading-message">LOADING ...</h1>}

      {result.map(
        ({
          id_exercise,
          name,
          photoName,
          description,
          typology,
          muscle_group,
          equipment,
        }) => (
          <ExerciseCard
            key={id_exercise}
            id={id_exercise}
            name={name}
            photos={photoName ? photoName : defaultExercise}
            description={description}
            typology={typology}
            muscle_group={muscle_group}
            equipment={equipment}
          />
        )
      )}
    </div>
  );
}

export default ListLike;
