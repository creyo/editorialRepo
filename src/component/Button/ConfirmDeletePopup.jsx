import React from 'react';
import './ConfirmDeletePopup.css'; // Import the CSS file

const ConfirmDeletePopup = ({ isOpen, articleId, onClose, onConfirm ,length}) => {
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="custom-popup-overlay">
      <div className="custom-popup">
      <p className="custom-popup-text">Are you sure you want to delete this {articleId.length} article?</p>
        <div className="button-container">
          <button className="custom-confirm-button" onClick={() => onConfirm(articleId)}>Confirm</button>
          <button className="custom-cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
