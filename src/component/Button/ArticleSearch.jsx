import React, { useState } from 'react';
import "../FrontPage.css"

const ArticleSearch = ({ articles, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };



  return (
    <div className='search'>
      <input type="text" placeholder="Search Title"
        value={searchQuery}
        onChange={handleSearch}>
      </input>
    </div>


  );
};

export default ArticleSearch;
