import React from 'react';
import "./Popup.css"

function ProfilePopup({ isOpen, onClose, onSave, setName, setBio, name, bio }) {


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSave = () => {
    // You can perform any actions you want with the name and bio here
    onSave();

    // Clear the input fields and close the popup
    setName('');
    setBio('');
    onClose();
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Author</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Bio:
          <textarea value={bio} onChange={handleBioChange} />
        </label>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default ProfilePopup;