import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import axios from 'axios';

const Review = ({ productId, userId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewSaved, setReviewSaved] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Debe iniciar sesión para dejar una reseña',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    const calification = {
      userId: userId,
      review: review,
      calification: rating,
    };

    productId &&
      axios
        .post(`https://backend-6ao2.onrender.com/products/${productId}/review`, calification)
        .then((response) => {
          if (response.status === 201) {
            setReviewSaved(true);
            setReviews([...reviews, { review: review, rating: rating }]);
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Reseña guardada con éxito',
              showConfirmButton: false,
              timer: 2000
            });
            setRating(0);
            setReview("");
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error',
            showConfirmButton: false,
            timer: 2000
          });
        });
  };

  return (
    <div className="container mx-auto py-10 ml-24">
      <h2 className="text-2xl font-semibold mb-6">Dejar una reseña</h2>

      {reviewSaved ? (
        <p className="text-green-500">¡Reseña guardada con éxito!</p>
      ) : null}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="rating" className="block mb-2 font-semibold text-gray-700">
            Puntuación
          </label>
          <Rating
            name="rating"
            classNames="rating-stars"
            count={5}
            size={48}
            isHalf={false}
            activeColor="#ffd700"
            emptyIcon={<i className="far fa-star" />}
            fullIcon={<i className="fas fa-star" />}
            value={rating}
            onChange={(value) => setRating(value)}
          />
          <label htmlFor="review" className="block mb-2 font-semibold text-gray-700">
            Reseña
          </label>
          <textarea
            id="review"
            name="review"
            className="w-full p-4 border border-gray-300 rounded"
            rows={6}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </div>

      <form className="max-w-3xl mt-6 flex justify-start" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
        >
          Enviar
        </button>
      </form>

      {reviews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Reseñas de clientes</h3>
          {reviews.map((review, index) => (
            <div key={index} className="border border-gray-300 p-4 mb-4">
              <p className="font-semibold mb-2">Calificación: {review.rating}</p>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;