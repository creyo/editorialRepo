import React, { useState } from 'react';
import './PostTypeButton.css'; // Import your CSS file

function PostTypeButton({ onChangeValue }) {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleButtonClick = (option) => {
    let id, value;

    if (option === 'page') {
      id = 1;
      value = 'Page';
    } else if (option === 'blog') {
      id = 2;
      value = 'Blog';
    }

    setSelectedOption(id);
    onChangeValue(id, value); // Send both id and value
  };

  return (
    <div>
      <button
        onClick={() => handleButtonClick('page')}
        className={selectedOption === 1 ? 'active' : ''}
      >
        Page
      </button>
      <button
        onClick={() => handleButtonClick('blog')}
        className={selectedOption === 2 ? 'active' : ''}
      >
        Blog
      </button>
    </div>
  );
}

export default PostTypeButton;
