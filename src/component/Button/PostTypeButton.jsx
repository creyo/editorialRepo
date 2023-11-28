import React, { useEffect, useState } from 'react';
import '../FrontPage'; // Import your CSS file

function PostTypeButton({ onChangeValue , formValue, PostTypeData ,articleLength }) {
  const option = localStorage.getItem('selectedOption')
  console.log(option)
  const [selectedOption, setSelectedOption] = useState(option); // Initialize with 'Blog' as the default value

  const handleButtonClick = (value,option) => {
    setSelectedOption(value);
    onChangeValue(option); // Pass the selected option value to the parent component
    localStorage.setItem('selectedOption', value)
  }

useEffect(()=>{ 
  setSelectedOption(option)
  },[setSelectedOption,option])



  return (
    <div className="buttons-others flex">
      <p
        className={selectedOption === 'Blog' ? 'draft selected-item' : 'draft'}
        onClick={() => handleButtonClick('Blog',2)}
      >
       Blog {
  selectedOption === "Blog" 
    ? PostTypeData 
    : (isNaN(articleLength - PostTypeData) || articleLength - PostTypeData === 0 ? "" : articleLength - PostTypeData)
}


      </p>
      <p
        className={selectedOption === 'Page' ? 'draft selected-item' : 'draft'}
        onClick={() => handleButtonClick('Page',1)}
      >
       Page {
  selectedOption === "Page" 
    ? PostTypeData 
    : (isNaN(articleLength - PostTypeData) || articleLength - PostTypeData === 0 ? "" : articleLength - PostTypeData)
}


      </p>
    </div>
  );
}

export default PostTypeButton;
