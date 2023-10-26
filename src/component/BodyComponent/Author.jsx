import React from "react";


function Author({ name, bio }) {
  return (
    <div className="blog-component-card author-info">
      <div className="author-name-intro">
        <h3>{name}</h3>
        <p>{bio}</p>
      </div>
    </div>
  );
}


 export default Author;