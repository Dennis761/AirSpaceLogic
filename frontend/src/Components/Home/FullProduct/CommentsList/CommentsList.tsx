import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./CommentsList.css";

interface Comment {
  name: string;
  date: string;
  isPurchaseVerified: boolean;
  rating: number;
  commentText: string;
}

interface CommentsListProps {
  comments: Comment[];
  commentsPerPage?: number; // Количество комментариев на одной странице
}


const CommentsList: React.FC<CommentsListProps> = ({ comments, commentsPerPage = 5 }) => {
  const maxCommentsToShow = Math.min(comments.length, 25);
  const totalPages = Math.ceil(maxCommentsToShow / commentsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="comments-wrapper">
      <h3 className="comments-wrapper-h3">Коментарі</h3>
      <div className="comments-list">
        <div className="comments-container">
        {currentComments.map((comment, index) => (
          <div key={index} className="comment-item">
            <div className="comment-header">
              <strong>{comment.name}</strong>
              <span className="comment-date">{comment.date}</span>
            </div>
            <div className="comment-body">
              <div className="comment-rating">
                {Array.from({ length: comment.rating }).map((_, i) => (
                  <FaStar key={i} color="#ffc107" />
                ))}
              </div>
              
              <p className="comment-text">{comment.commentText}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">{renderPageNumbers()}</div>
    </div>
    </div>
  );
};

export default CommentsList;

