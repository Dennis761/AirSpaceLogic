import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addComment } from "../../../Redux/Actions/commentActions.ts";
import { ADD_COMMENT_FORM_CLOSE } from "../../../Redux/Constants/commentConstants.ts"; 
import "./ReviewForm.css";
import { AppDispatch, RootState } from "../../../Redux/store.ts";

interface ReviewFormProps {
  productId: string; // ID продукту для додавання коментаря
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [hover, setHover] = useState<number | null>(null);
 
  const {success, error} = useSelector((state: RootState) => state.comments)

  useEffect(() => {
    if (success) {
      toast.success("Ваш коментар успішно додано!", {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      const timeout = setTimeout(() => {
        dispatch({ type: ADD_COMMENT_FORM_CLOSE });
      }, 3000);

      return () => clearTimeout(timeout);
    }

    if (error) {
      toast.error(`Помилка: ${error}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [success, error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || rating === null || !review) {
      toast.error("Будь ласка, заповніть усі обов’язкові поля.");
      return;
    } 
    
    const commentData = {
      commentText: review,
      rating,
      pros,
      cons,
    };

    try {
      await dispatch(addComment(productId, name, commentData));

      // Очистка форми після успішної відправки
      setName("");
      setRating(null);
      setReview("");
      setPros("");
      setCons("");
      setHover(null);
    } catch (error) {
      toast.error("Сталася помилка при відправці коментаря.");
    }
  };

  return (
    <>
    <div className="review-form-wrapper">
      <form className="review-form" onSubmit={handleSubmit}>
        <p className="review-title">Написати відгук</p>

        <label htmlFor="name" className="review-label">
          Ваше ім'я <span className="review-required">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="review-input"
          required
        />

        <label htmlFor="rating" className="review-label">
          Рейтинг <span className="review-required">*</span>
        </label>
        <div className="review-stars">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <FaStar
                  className="review-star"
                  color={
                    ratingValue <= (hover !== null ? hover : rating !== null ? rating : 0)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  size={30}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        <label htmlFor="review" className="review-label">
          Ваш відгук <span className="review-required">*</span>
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="review-textarea"
          required
        ></textarea>

        <div className="review-pros-cons">
          <div className="review-pros">
            <label htmlFor="pros" className="review-label">Переваги</label>
            <textarea
              id="pros"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              className="review-textarea-small"
            ></textarea>
          </div>

          <div className="review-cons">
            <label htmlFor="cons" className="review-label">Недоліки</label>
            <textarea
              id="cons"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              className="review-textarea-small"
            ></textarea>
          </div>
        </div>

        <p className="review-html-warning">
          Увага: HTML не підтримується! Використовуйте звичайний текст!
        </p>

        <button type="submit" className="review-submit-btn">
          Залишити відгук
        </button>
      </form>
    </div>
    <ToastContainer/>
    </>
  );
};

export default ReviewForm;
