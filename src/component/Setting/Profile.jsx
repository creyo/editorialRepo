import React from 'react';
import authorPic from "./images/author.png";
import './style.css'; // Import your CSS file

function Profile() {
  return (
    <div className="container author-page">


      <div class="settings-form profile-page-form">

        <img src={authorPic} alt="" />
        <form action="">
          <div>
            <label for="">Name</label>
            <input type="text" placeholder="Zubia Shahid" />
          </div>
          <div>
            <label for="">Email</label>
            <input type="text" placeholder="Zubia Shahid" />
          </div>
          <div>
            <label for="">Password</label>
            <input type="password" placeholder="***********" />
          </div>
          <p class="reset">Reset Password</p>
          <button class="btn">Update</button>

        </form>
      </div>

      <div class="profile-page-list">
        <h1>Publications</h1>
        <div class="profile-page-list-div">
          <table class="list-table">
            <tr>
              <th><h2>Publication</h2></th>
              <th><h2>Domain</h2></th>
              <th><h2>Created</h2></th>
              <th>
                <h2>Items</h2>
              </th>
              <th>
                <h2>Bio</h2>
              </th>
            </tr>
            <tr>
              <td>
                <div class="checkbox-flex">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" checked="checked"/>
                        <span class="checkmark"></span>
                    </label>
                  </div>
                  <p class="small-text">Select All</p>
                  <img src="images/trash-2.png" alt="" />
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div class="checkbox-flex">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" checked="checked" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <p>Passiveday</p>
                </div>
              </td>
              <td><p>passiveday.com</p></td>
              <td><p> 24 Jun 2023</p></td>
              <td><p>30</p> </td>
              <td><p>Admin</p> </td>
            </tr>
            <tr>
              <td>
                <div class="checkbox-flex">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" checked="checked" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <p>Appsala</p>
                </div>
              </td>
              <td><p>appsala.com</p></td>
              <td><p> 24 Jun 2023</p></td>
              <td><p>30</p> </td>
              <td><p>Admin</p> </td>
            </tr>
            <tr>
              <td>
                <div class="checkbox-flex">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" checked="checked" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <p>Brandemy</p>
                </div>
              </td>
              <td><p>brandemy.com</p></td>
              <td><p> 24 Jun 2023</p></td>
              <td><p>30</p> </td>
              <td><p>Admin</p> </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

  );
}

export default Profile;
