import React, { useEffect, useState } from 'react';
import supabase from '../config/supabase';
import {filterAuthorsByPublication} from "../component/filter"

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

function AuthorDropdown({ onAuthorChange ,authorValue,publicationValue}) {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

// author publication
useEffect(() => {
  async function fetchData() {
    try {
      const { data: author_publication, error } = await supabase
        .from('author_publication').select(`
        *,
        authors(*),
        publication(*)`);

      if (error) {
        throw error.message
      } else {
        let data = filterAuthorsByPublication(author_publication,publicationValue)
        setAuthors(data);
      }
    } catch (error) {
      throw error.message
    }
  }

  fetchData();
}, [publicationValue]); 

  const handleAuthorChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAuthor(selectedValue);

    if (onAuthorChange) {
     
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
        <option value="">{authorValue}</option>
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
