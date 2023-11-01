import React, { useState } from 'react';


const ArticleSearch = ({ articles, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="article-search-container">
      <input
        type="text"
        placeholder="Search by title..."
        className="article-search-input"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default ArticleSearch;
