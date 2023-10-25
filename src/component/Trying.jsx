import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './FormPage.css'; // Your custom styles

function Card() {
  return (
    <div className="quill-card">
      <img
        src="https://via.placeholder.com/150"
        alt="Card Image"
        className="quill-card-image"
      />
      <div className="quill-card-content">
        <h2 className="quill-card-title">Card Title</h2>
        <p className="quill-card-text">
          This is a simple card component with some content. You can customize it
          as needed.
        </p>
      </div>
    </div>
  );
}

function Trying() {
  const [body, setBody] = useState('');
  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
        ['blockquote'],
        ['card'], // Include the 'card' format
      ],
    },
  };

  const handleTextChange = (content) => {
    setBody(content);
  };

  return (
    <div style={{ width: '1050px' }}>
      <ReactQuill
        value={body}
        onChange={handleTextChange}
        placeholder="Enter your text here..."
        modules={modules}
        formats={['card']} // Include the 'card' format
        theme="snow" // You can use a different theme based on your needs
      />
    </div>
  );
}

export default Trying;
