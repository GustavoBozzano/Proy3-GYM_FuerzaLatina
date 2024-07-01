/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './likeToogle.css';

const LikeToggle = ({ exerciseId }) => {
  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  const storedLike = userId
    ? localStorage.getItem(`user-${userId}-exercise-${exerciseId}`)
    : null;
  const [isLiked, setIsLiked] = useState(storedLike === 'true');

  const handleLikeToggle = async () => {
    try {
      if (!token || !userId) {
        console.error('Usuario no autenticado');
        return;
      }

      if (isLiked) {
        await fetch(`/api/dislike/${exerciseId}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        });
      } else {
        await fetch(`/api/exercise/like/${exerciseId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
      }

      setIsLiked((prevIsLiked) => !prevIsLiked);
      localStorage.setItem(
        `user-${userId}-exercise-${exerciseId}`,
        (!isLiked).toString()
      );
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    const storedLike = userId
      ? localStorage.getItem(`user-${userId}-exercise-${exerciseId}`)
      : null;
    setIsLiked(storedLike === 'true');
  }, [userId, exerciseId]);

  return (
    <div>
      <span
        className="like-toggle-heart"
        onClick={handleLikeToggle}
        style={{ cursor: 'pointer', color: isLiked ? 'red' : 'white' }}
      >
        &#10084;
      </span>
    </div>
  );
};

export default LikeToggle;
