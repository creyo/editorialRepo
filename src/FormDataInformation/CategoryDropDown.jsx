import React, { useEffect, useState } from 'react';
import supabase from '../config/supabase'; // Import your Supabase client

const customStyles = {
  container: {
    width: '700px', // Adjust the width as needed
    borderRadius: '4px',
    borderColor: '#ccc',
  },
  option: {
    padding: '8px',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: '#007bff',
    color: 'white',
  },
};

function CategoryDropdown({ onCategoryChange ,categoryValue}) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('real-estate'); // Adjust the initial selected category
 

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase.from('categories').select('*');
        if (error) {
          throw error;
        }
  
        setCategories(data);
        
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error as needed
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);

    // Find the category object that corresponds to the selected value
    const selectedCategoryObject = categories.find(
      (category) => category.url === selectedValue
    );

    if (selectedCategoryObject) {
      // Create separate objects for category_id and category_url
      const category_id = selectedCategoryObject.category_id;
      const category_url = selectedCategoryObject.url;

      // Call the callback function to update category_id and category_url in the FormPage
      onCategoryChange({ category_id, category_url });
    }
  };

  return (
    <div style={customStyles.container}>
      <select
        onChange={handleCategoryChange}
        value={selectedCategory}
        style={customStyles.option}
      >
        <option value="">{categoryValue}</option>
        {categories.map((category) => (
          <option
            key={category.category_id}
            value={category.url}
            style={{
              ...(selectedCategory === category.category_id
                ? customStyles.selectedOption
                : {}),
            }}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;