import React, { useState } from 'react';
import "./Popup.css"

function AddProduct({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSave = () => {
    // You can perform any actions you want with the title, description, and link here
    onSave({ title, description, link });

    // Clear the input fields and close the popup
    setTitle('');
    setDescription('');
    setLink('');
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Add Product</h2>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <label>
          Link:
          <input type="text" value={link} onChange={handleLinkChange} />
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default AddProduct;
