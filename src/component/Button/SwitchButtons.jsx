import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../../Reducers/SettingReducer';
import './SettingsPage.css';

const SwitchButtons = (props) => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.settings);
  console.log(fields)

  const handleToggle = (field) => {
    const updatedFields = {
      ...fields,
      [field]: !fields[field],
    };
    console.log(field)
    dispatch(updateSettings(updatedFields));
  };

  const handleSave = () => {
    
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
