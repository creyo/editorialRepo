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
        <div class="choices">
          <div class="choices-pair">
            <div class="choice ">
              <p>Categories</p>
              <div class="checkbox">
                <label>
                  <input type="checkbox" checked="checked" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="choice">
              <p>Required</p>
              <div class="checkbox">
                <label>
                  <input type="checkbox" checked="checked" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="choices-selectors">
            <p class="choices-selector ">Status</p>
            <p class="choices-selector active-choices-selector">Draft</p>
            <p class="choices-selector active-choices-selector">Published</p>
            <div class="choice">
              <p>Review</p>
              <div class="checkbox">
                <label>
                  <input type="checkbox" checked="checked" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="choices-double-pair">
            <div class="choice choice-aligned">
              <p>Title</p>
            </div>
            <div class="choice-input flex">
              <label for="">Min</label>
              <input type="text" name="" id="" />
            </div>
            <div class="choice-input flex">
              <label for="">Max</label>
              <input type="text" name="" id="" />
            </div>
            <div class="choice">
              <p>Validate</p>
              <div class="checkbox">
                <label>
                  <input type="checkbox" checked="checked" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="choices-double-pair">
            <div class="choice choice-aligned">
              <p>Subtitle</p>
              <div class="checkbox">
                <label>
                  <input type="checkbox" checked="checked" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="choice-input flex" />
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="choices-double-pair">
          <div class="choice choice-aligned">
            <p>SEO Score</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="choice-input flex">
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex hidden">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="choices-double-pair">
          <div class="choice choice-aligned">
            <p>Seo Title</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="choice-input flex">
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="choices-double-pair">
          <div class="choice choice-aligned">
            <p>SEO Description</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="choice-input flex">
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="choices-double-pair">
          <div class="choice choice-aligned">
            <p>Tag</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="choice-input flex">
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="choices-double-pair">
          <div class="choice choice-aligned">
            <p>Keyword</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="choice-input flex">
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="choices-double-pair">
          <div class="choice choice-aligned">
            <p>Featured Image</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="choice-input flex hidden">
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex hidden">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="choices-double-pair">
          <div class="choice choice-aligned">
            <p>Author</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="choice-input flex hidden">
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex hidden">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="choices-double-pair">
          <div class="choice choice-aligned">
            <p>Note</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="choice-input flex hidden">
            <label for="">Min</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice-input flex hidden">
            <label for="">Max</label>
            <input type="text" name="" id="" />
          </div>
          <div class="choice">
            <p>Validate</p>
            <div class="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
            </div>
            
          </div>
          
        </div>
        
      </div>

      <div class="aside-form-div">
        <p class="border-bottom">New Category</p>

        <div class="aside-form">
          <form action="">
            <div>
              <label for="">Name</label>
              <input type="text" placeholder="" />
            </div>
            <div>
              <label for="">URL</label>
              <input type="text" placeholder="" />
            </div>
            <div>
              <label for="">Parent</label>
              <input type="text" placeholder="" />
              <div class="dropdown">
                <select value="">
                  <option name="" id=""></option>
                </select>
                <img src="images/arrow-down.png" alt="" />
              </div>
            </div>
            <div>
              <p class="hidden"></p>
              <button class="btn">Submit</button>
            </div>

          </form>
        </div>
        <div class="categories-section">
          <p>Categories</p>
          <div class='categories'>
            <div class="category">
              <div class="flex">
                <p>Digital Products</p>
                <img src="images/trash-grey.png" alt="" />
              </div>
              <ul>
                <li>
                  <div class="flex">
                    <p>PDF Print</p>
                    <p>(25)</p>
                    <img src="images/trash-grey.png" alt="" />
                  </div>
                </li>
                <li>
                  <div class="flex">
                    <p>Icon Packets</p>
                    <img src="images/trash-2.png" alt="" />
                  </div>
                </li>

              </ul>
            </div>
            <div class="flex">
              <div>
              <p style={{marginRight: "7px"}}>Affliate Website</p>
               
                <p style={{ marginRight: '7px' }}>(12)</p>
              </div>
              <img src="images/trash-grey.png" alt="" />
            </div>

          </div>
        </div>

      </div>
      
    </div>

  );
}

export default Publication;
