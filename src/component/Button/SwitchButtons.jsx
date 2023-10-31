import React, { useState } from 'react';
import "./SettingsPage.css"

const SwitchButtons = (props) => {
  // Use the parent's fields state as initial state
  const [fields, setFields] = useState(props.currentSettings);

  const handleToggle = (field) => {
    // Update the local state and use a callback to call props.updateSettings
    setFields((prevFields) => {
      const updatedFields = {
        ...prevFields,
        [field]: !prevFields[field],
      };
      // Call the function from the parent component to update the parent's state
      props.updateSettings(updatedFields);
      return updatedFields; // Return the updated state
    });
  };

  const handleSave = () => {
    // Call the function from the parent component to close the popup
    props.closePopup();
  };

  return (
    <div>
      {Object.keys(fields).map((field) => (
        <div key={field}>
          {field}:
          <label className="switch">
            <input
              type="checkbox"
              checked={fields[field]}
              onChange={() => handleToggle(field)}
            />
            <span className={`slider ${fields[field] ? 'Enable' : 'Disable'}`}></span>
          </label>
        </div>
      ))}  
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SwitchButtons;
