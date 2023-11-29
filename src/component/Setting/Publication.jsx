import React from 'react';
import './style.css'; // Import your CSS file

function Publication() {
  return (
    <div className="container setting-page">
      

      <div className="settings-form-div">
        <div className="settings-form">
          <form action="">
            <div>
              <label htmlFor="">Publication Name</label>
              <input type="text" placeholder="Passivday" />
            </div>
            <div>
              <label htmlFor="">Domain Name</label>
              <input type="text" placeholder="passivday.com" />
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>

        <div className="flex text-green" style={{ margin: '10px 0 0 50px' }}>
          <img src="images/plus-green.png" alt="" />
          <p style={{ fontSize: '10px' }}>New Publication</p>
        </div>
      </div>

      <div className="selectors settings-second-selector">
        <div className="buttons-others flex">
          <p className="draft selected-item">Blog</p>
          <p className="draft">Page</p>
        </div>
      </div>

      <div className="container">
        <div className="choices-form">
          {/* Your existing choices-form content goes here */}
        </div>

        <div className="aside-form-div">
          {/* Your existing aside-form-div content goes here */}
        </div>
      </div>
    </div>
  );
}

export default Publication;
