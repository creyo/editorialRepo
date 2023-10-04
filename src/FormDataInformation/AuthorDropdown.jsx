import React, { useEffect, useState } from 'react';
import supabase from '../config/supabase';

const customStyles = {
  container: {
    width: '800px',
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

function AuthorDropdown({ onAuthorChange }) {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const { data, error } = await supabase.from('authors').select('*');
        if (error) {
          throw error;
        }

        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
        // Handle error as needed
      }
    }

    fetchAuthors();
  }, []);

  const handleAuthorChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAuthor(selectedValue);

    if (onAuthorChange) {
      console.log("Selected Author ID (AuthorDropdown):", selectedValue); // Debug statement
      onAuthorChange(selectedValue); // Pass the selected author's ID to the parent component
    }
  };

  return (
    <div style={customStyles.container}>
      <select
        onChange={handleAuthorChange}
        value={selectedAuthor}
        style={customStyles.option}
      >
        <option value="">Select an author</option>
        {authors.map((author) => (
          <option
            key={author.author_id}
            value={author.author_id}
            style={{
              ...(selectedAuthor === author.author_id
                ? customStyles.selectedOption
                : {}),
            }}
          >
            {author.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AuthorDropdown;
