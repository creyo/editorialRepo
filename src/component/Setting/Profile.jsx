import React from 'react';
import './style.css'; // Import your CSS file

function Profile() {
  return (
    <div className="container author-page">
      

      <div className="settings-form profile-page-form">
        <img src="./images/author.png" alt="" />
        <form action="">
          <div>
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Zubia Shahid" />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="text" placeholder="Zubia Shahid" />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" placeholder="***********" />
          </div>
          <p className="reset">Reset Password</p>
          <button className="btn">Update</button>
        </form>
      </div>

      <div className="profile-page-list">
        <h1>Publications</h1>
        <div className="profile-page-list-div">
          <table className="list-table">
            <thead>
              <tr>
                <th>Publication</th>
                <th>Domain</th>
                <th>Created</th>
                <th>Items</th>
                <th>Bio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Add your table rows with data */}
              </tr>
              {/* Additional rows for your publications */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;
