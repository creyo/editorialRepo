import React, { useEffect, useState } from 'react';
import supabase from '../../config/supabase';
import './style.css'; // Import your CSS file

function Publication() {

  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [publicationData,setPublicationData] = useState({})




  async function fetchPublicationData(publicationId) {
    try {
        let { data, error } = await supabase
            .from('publication')
            .select('*')
            .eq('publication_id', `${publicationId}`);

        if (error) {
          console.warn("nothing")
            throw error;
        } else {
            
            setPublicationData(data[0]);
        }
    } catch (error) {
        console.error('Error:', error.message);
        // Handle the error in a user-friendly way or propagate it further
    }
}

let publicationId = localStorage.getItem('publicationId')


  useEffect(()=>{
  fetchPublicationData(publicationId)
    },[publicationId])


    console.log(publicationData.token)


  const handleReset = () => {
    setIsModalOpen(true);

    
  };

  const handleConfirmReset = async () => {
    if (isModalOpen) {
      try {
        // Make your API call here
        // Replace 'yourApiEndpoint' with the actual endpoint you want to call
        const response = await fetch('https://wisulbackend.netlify.app/.netlify/functions/index/resetToken', {
          method: 'POST', // or 'DELETE' or any other HTTP method
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicationData.token}`
          },
          
        });
        console.log(response)
  
        if (response.ok) {
          console.log('API call successful');
          
          setIsModalOpen(false);
        } else {
          console.error('API call failed');
          // Handle the error or display an error message
          // ...
  
          // Close the modal (optional, depending on your use case)
          setIsModalOpen(false);
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Handle the error in a user-friendly way or propagate it further
      }
    }
  };
  

  const handleCloseModal = () => {
    // Close the modal without resetting
    setIsModalOpen(false);
  };


  const copyText = () => {
    const textToCopy = `${publicationData.token}`; // Replace with your actual text
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
    }).catch((err) => {
      console.error('Unable to copy text', err);
    });
  };
  console.log(copied)


  return (
    <div className="container setting-page">
      <div className="settings-form-div">
        <div className="settings-form">
          <form action="">
            <div>
              <label htmlFor="">Publication Name</label>
              <input type="text" placeholder="Passivday" style={{color:"#1579FF",fontWeight:"bold"}} value={publicationData.publication_name}/>
            </div>
            <div>
              <label htmlFor="">Domain Name</label>
              <input type="text" placeholder="passivday.com"  style={{color:"#1579FF",fontWeight:"bold"}} value={publicationData.domain_name}/>
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>

        <div>

          <div className="flex text-green" style={{ margin: '10px 0 0 50px' }}>
            <img src="images/plus-green.png" alt="" />
            <p style={{ fontSize: '10px' }}>New Publication</p>
          </div>



          {/* Modal */}
         
          <div style={{ marginLeft: "100px" }}>
          <label> API TOKEN </label>
            <textarea name="" id="" cols="30" rows="5" style={{fontWeight:"bold"}}  readOnly={true} >{publicationData.token}</textarea>
            <div>
              <button onClick={copyText}>Copy</button>
              <button onClick={handleReset}>Reset</button>
              {/* {copied && <p className="copy-message">Text copied! Use Ctrl+V to paste.</p>} */}
              {isModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <p>Are you sure you want to reset?</p>
                    <button onClick={handleConfirmReset}>Yes</button>
                    <button onClick={handleCloseModal}>No</button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      <div className="selectors settings-second-selector">
        <div className="buttons-others flex">
          <p className="draft selected-item">Blog</p>
          <p className="draft">Page</p>
        </div>
      </div>

      <div className="container">
        <div class="choices-form">
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
                    <p style={{ marginRight: "7px" }}>Affliate Website</p>

                    <p style={{ marginRight: '7px' }}>(12)</p>
                  </div>
                  <img src="images/trash-grey.png" alt="" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Publication;