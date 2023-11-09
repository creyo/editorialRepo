import React, { useEffect, useState } from 'react';
import '../FrontPage'; // Import your CSS file

function PostTypeButton({ onChangeValue , formValue }) {
  const [selectedOption, setSelectedOption] = useState('Blog'); // Initialize with 'Blog' as the default value

  const handleButtonClick = (value,option) => {
    setSelectedOption(value);
    onChangeValue(option); // Pass the selected option value to the parent component
    
  }

useEffect(()=>{ 
   if(parseInt(formValue) === 1){
    setSelectedOption("Page")
  }else{
    setSelectedOption("Blog")
  }},[formValue])



  return (
    <div className="buttons-others flex">
      <p
        className={selectedOption === 'Blog' ? 'draft selected-item' : 'draft'}
        onClick={() => handleButtonClick('Blog',2)}
      >
        Blog
      </p>
      <p
        className={selectedOption === 'Page' ? 'draft selected-item' : 'draft'}
        onClick={() => handleButtonClick('Page',1)}
      >
        Page
      </p>
    </div>
  );
}

export default PostTypeButton;
