import React, { useEffect, useState } from 'react';
import supabase from '../../config/supabase';
import activeTrash from "../images/trash-2.png"
// import trashGreyImage from '../images/deletedtrash.jpeg';
import './style.css'; // Import your CSS file
import CategoryDropdown from '../../FormDataInformation/CategoryDropDown';

function Publication({ onPublicationNameChange }) {

  

  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updated, setUpdated] = useState(false)
  const [publicationData, setPublicationData] = useState({
    publication_name: '',
    domain_name: '',
  });

  const handleChange = (field, value) => {
    setPublicationData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const submitPublication = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('categories')
        .upsert([publicationData])
        .select();

      if (error) {
        throw error;
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };



  let publicationId = localStorage.getItem('publicationId')





  const [categroy, setCategory] = useState({

    name: '',
    url: '',
    parent_category_id: 0,
    publication_id: parseInt(publicationId),
  })

  const handleCategory = (key, value) => {
    // if (key === "url") {
    //   const urlRegex = /^([a-z0-9-]+\.?){1,}[a-z]}$/;
    //   const isValidUrl = urlRegex.test(value);

    //   if (!isValidUrl) {
    //     // Handle validation error more gracefully (e.g., display error message in UI)
    //     window.alert("Please enter valid")
    //     return; // Do not proceed with setting state if the URL is invalid
    //   }
    // }

    setCategory((prevCategory) => ({
      ...prevCategory,
      [key]: value,
    }));
  };


  const handleCategoryChange = (selectedCategoryInfo) => {

    setCategory((prevCategory) => ({
      ...prevCategory,
      parent_category_id: selectedCategoryInfo.category_id
    }));
  };


  const onSubmitNewCategory = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('categories')
        .upsert([categroy])
        .select()

      if (error) {
        throw error
      } else {
        console.log(data)
      }




    } catch (err) {
      console.log(err.message)
    }
  }



  const [postSettings, setPostSettings] = useState({

    publication_id: 1,
    category_required: false,
    category_compulsory: false,
    post_type_id: 2,
    title_min_length: 0,
    title_max_length: 0,
    title_validate: false,
    subtitle_min_length: 0,
    subtitle_max_length: 0,
    subtitle_validate: false,
    subtitle_required: false,
    seo_score_min: 0,
    seo_score_max: 0,
    seo_score_validate: false,
    seo_score_required: false,
    seo_title_min_length: 0,
    seo_title_max_length: 0,
    seo_title_validate: false,
    seo_title_required: false,
    seo_description_min_length: 0,
    seo_description_max_length: 0,
    seo_description_validate: false,
    seo_description_required: false,
    tag_min_length: 0,
    tag_max_length: 0,
    tag_validate: false,
    tag_required: false,
    keyword_min_length: 0,
    keyword_max_length: 0,
    keyword_validate: false,
    keyword_required: false,
    featured_image_required: false,
    featured_image_validate: false,
    author_required: false,
    author_validate: false,
    note_required: false,
    note_validate: false
  });



  const [categories, setCategories] = useState([]);

  // Fetch data from the 'categories' table with information about the parent category
  useEffect(() => {
  async function fetchCategory() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
                  *,
                  category:categories(*)
              `);

      if (error) {
        console.error('Error fetching data:', error.message);
      } else {

        // Filter categories based on post_type
        const filteredCategories = data.filter(
          (category) => category.post_type === postSettings.post_type_id // Replace 1 with your desired post_type value
        );
        setCategories(filteredCategories);
       

      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

 
      fetchCategory();
  }, [postSettings.post_type_id]);


  const countSubcategories = (category) => {
    return category.category ? category.category.length : 0;
  };



  // Function to save postSettings to Supabase
  const saveSettingsToSupabase = async () => {
    try {
      console.log(postSettings.publication_id, postSettings.post_type_id);

      // Check if the row with the given publication_id and post_type exists
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('post_type_id', postSettings.post_type_id)
        .eq('publication_id', postSettings.publication_id)

      if (error) {
        throw error;
      }

      // Create a copy of postSettings without modifying the original
      let updateData = { ...postSettings };
      console.log(updateData)
      // Remove post_type and publication properties
      delete updateData.post_type
      delete updateData.publication
      console.log(data)
      if (data.length > 0) {
        // If the row exists, perform an update
        const { data, error } = await supabase
          .from('settings')
          .update(updateData)
          .eq('publication_id', postSettings.publication_id)
          .eq('post_type_id', postSettings.post_type_id);

        if (error) {
          console.log(error.message);
          throw error;
        }

        console.log('Settings updated successfully:', data);
      } else {
        // If the row doesn't exist, perform an insert
        const { data, error } = await supabase
          .from('settings')
          .upsert([updateData]);

        if (error) {
          throw error;
        }

        console.log('New settings inserted successfully:', data);
      }
    } catch (error) {
      console.error('Error saving settings:', error.message);
    }
  };




  const handleSaveButtonClick = async () => {
    // Save settings to Supabase
    await saveSettingsToSupabase();
    setUpdated(true)
  };

  const fetchPublicationID = async (publicationID) => {
    setPostSettings((prevSettings) => ({
      ...prevSettings,
      publication_id: parseInt(publicationID),
    }));
  };





  const fetchSettingData = async (publicationID) => {
    try {
      let { data, error } = await supabase
        .from('settings')
        .select(`
          *,
          post_type(*),
          publication(*)
        `)
        .eq('publication_id', publicationID);

      if (error) {
        throw error;
      } else {
        console.log(data);

        if (data.length > 0) {
          // Data is present in the database, update the state with the retrieved settings
          const retrievedSettings = data[0];
          console.log(retrievedSettings);
          // const updatePostTypeId = (newPostTypeId) => {
          //   setPostSettings((prevSettings) => ({
          //     ...prevSettings,
          //     post_type_id: `${newPostTypeId}`,
          //   }));
          // };
          setPostSettings(retrievedSettings);
          setPostSettings((prevSettings) => ({
            ...prevSettings,
            post_type_id:retrievedSettings.post_type.post_type_id,
          }))
          console.log("value",retrievedSettings.post_type)
          
       
          
        } else {
          // Data is not present in the database, leave postSettings as it is
          console.log('No settings found in the database.');
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };








  // Function to update a specific property in the state
  const updateSetting = (key, value) => {
   
    
    setPostSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));

    setUpdated(false)
    
    
   
  };




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









  const handleReset = () => {
    setIsModalOpen(true);


  };
 
 
  const handleConfirmReset = async () => {
    if (isModalOpen) {
      try {
        console.log(publicationData.token);
        // Make your API call here
        const response = await fetch(
          'https://wisulbackend.netlify.app/.netlify/functions/index/login', // Endpoint URL
          {
             // Specify the HTTP method
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicationData.token}`,
            },
             // Request body (empty in this case)
          }
        );
  
        console.log(response.status);
  
        if (response.status === true) { // Check if response is successful (status 200-299)
          console.log('API call successful');
          window.alert("Token reset successful. It will take some time to update");
          setIsModalOpen(false);
          
        } else {
          // If response status is not in the range 200-299
          let responseData;
          try {
            responseData = await response.json();
            window.alert(responseData.msg); // Display error message returned from the server
          } catch (error) {
            // If response is not valid JSON
            console.error('API call failed:', response.status);
            // Handle the error or display an error message
            // ...
          }
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


  useEffect(() => {
    // Callback to send publication_name to parent component
    onPublicationNameChange(publicationData.publication_name);
    fetchPublicationID(localStorage.getItem('publicationId'));
    fetchSettingData(publicationId)
    fetchPublicationData(publicationId)

  }, [publicationData.publication_name, onPublicationNameChange,publicationId]);


  console.log(copied)


  return (
    <div className="container setting-page">
      <div className="settings-form-div">
        <div className="settings-form">
          <form action="" onSubmit={submitPublication}>
            <div>
              <label htmlFor="publication_name">Publication Name</label>
              <input
                type="text"
                placeholder="Passivday"
                style={{ color: "#1579FF", fontWeight: "bold" }}
                value={publicationData.publication_name}
                onChange={(e) => handleChange("publication_name", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="domain_name">Domain Name</label>
              <input
                type="text"
                placeholder="passivday.com"
                style={{ color: "#1579FF", fontWeight: "bold" }}
                value={publicationData.domain_name}
                onChange={(e) => handleChange("domain_name", e.target.value)}
              />
            </div>
            <button className="btn" type="submit">
              Submit
            </button>
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
            <textarea name="" id="" style={{ height: "100px", width: "300px" }} readOnly={true} value={publicationData.token} />
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
          <p
            className={`draft ${postSettings.post_type_id === 2 ? 'selected-item' : ''}`}
            onClick={() => updateSetting('post_type_id', 2)}
          >
            Blog
          </p>
          <p
            className={`draft ${postSettings.post_type_id === 1 ? 'selected-item' : ''}`}
            onClick={() => updateSetting('post_type_id', 1)}
          >
            Page
          </p>
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
                    <input type="checkbox"
                      checked={postSettings.category_required}
                      onChange={(event) => updateSetting('category_required', event.target.checked)}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="choice">
                <p>Required</p>
                <div class="checkbox">
                  <label>
                    <input type="checkbox"
                      checked={postSettings.category_compulsory}
                      onChange={(event) => updateSetting('category_compulsory', event.target.checked)}
                      disabled={!postSettings.category_required}
                    />
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
                <input type="text" name="" id="" value={postSettings.title_min_length}
                  onChange={(event) => updateSetting('title_min_length', event.target.value)} />
              </div>

              <div class="choice-input flex">
                <label for="">Max</label>
                <input type="text" name="" id="" value={postSettings.title_max_length}
                  onChange={(event) => updateSetting('title_max_length', event.target.value)} />
              </div>
              <div class="choice">
                <p>Validate</p>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={postSettings.title_validate}
                      onChange={(event) => updateSetting('title_validate', event.target.checked)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="choices-double-pair">
              <div class="choice choice-aligned">
                <p>Subtitle</p>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={postSettings.subtitle_required}
                      onChange={(event) => updateSetting('subtitle_required', event.target.checked)}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="choice-input flex">
                <label for="">Min</label>
                <input type="text" name="" id="" value={postSettings.subtitle_min_length}
                  onChange={(event) => updateSetting('subtitle_min_length', event.target.value)}
                  readOnly={!postSettings.subtitle_required}
                  style={{ color: postSettings.subtitle_required ? '' : 'grey' }} />
              </div>
              <div class="choice-input flex">
                <label for="">Max</label>
                <input type="text" name="" id="" value={postSettings.subtitle_max_length}
                  onChange={(event) => updateSetting('subtitle_max_length', event.target.value)}

                  readOnly={!postSettings.subtitle_required}
                  style={{ color: postSettings.subtitle_required ? '' : 'grey' }}
                />
              </div>
              <div class="choice">
                <p>Validate</p>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={postSettings.subtitle_validate}
                      onChange={(event) => updateSetting('subtitle_validate', event.target.checked)}
                      disabled={!postSettings.subtitle_required}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.seo_score_required}
                      onChange={(event) => updateSetting('seo_score_required', event.target.checked)}

                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="choice-input flex">
                <label for="">Min</label>
                <input type="text" name="" id=""
                  value={postSettings.seo_score_min}
                  onChange={(event) => updateSetting('seo_score_min', event.target.value)}
                  readOnly={!postSettings.seo_score_required}
                  style={{ color: postSettings.seo_score_required ? '' : 'grey' }}
                />
              </div>
              <div class="choice-input flex "  >
                <label for="">Max</label>
                <input type="text" name="" id=""
                  value={100}
                  style={{ color: 'grey' }}
                />
              </div>
              <div class="choice">
                <p>Validate</p>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={postSettings.seo_score_validate}
                      onChange={(event) => updateSetting('seo_score_validate', event.target.checked)}
                      disabled={!postSettings.seo_score_required}

                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.seo_title_required}
                      onChange={(event) => updateSetting('seo_title_required', event.target.checked)}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="choice-input flex">
                <label for="">Min</label>
                <input type="text" name="" id="" value={postSettings.seo_title_min_length}
                  onChange={(event) => updateSetting('seo_title_min_length', event.target.value)}
                  readOnly={!postSettings.seo_title_required}
                  style={{ color: postSettings.seo_title_required ? '' : 'grey' }}
                />
              </div>
              <div class="choice-input flex">
                <label for="">Max</label>
                <input type="text" name="" id="" value={postSettings.seo_title_max_length}
                  onChange={(event) => updateSetting('seo_title_max_length', event.target.value)}
                  readOnly={!postSettings.seo_title_required}
                  style={{ color: postSettings.seo_title_required ? '' : 'grey' }} />
              </div>
              <div class="choice">
                <p>Validate</p>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={postSettings.seo_title_validate}
                      onChange={(event) => updateSetting('seo_title_validate', event.target.checked)}
                      disabled={!postSettings.seo_title_required}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.seo_description_required}
                      onChange={(event) => updateSetting('seo_description_required', event.target.checked)}

                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="choice-input flex">
                <label for="">Min</label>
                <input type="text" name="" id="" value={postSettings.seo_description_min_length}
                  onChange={(event) => updateSetting('seo_description_min_length', event.target.value)}
                  readOnly={!postSettings.seo_description_required}
                  style={{ color: postSettings.seo_description_required ? '' : 'grey' }} />
              </div>
              <div class="choice-input flex">
                <label for="">Max</label>
                <input type="text" name="" id="" value={postSettings.seo_description_max_length}
                  onChange={(event) => updateSetting('seo_description_max_length', event.target.value)}
                  readOnly={!postSettings.seo_description_required}
                  style={{ color: postSettings.seo_description_required ? '' : 'grey' }} />
              </div>
              <div class="choice">
                <p>Validate</p>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={postSettings.seo_description_validate}
                      onChange={(event) => updateSetting('seo_description_validate', event.target.checked)}
                      disabled={!postSettings.seo_description_required}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.tag_required}
                      onChange={(event) => updateSetting('tag_required', event.target.checked)}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="choice-input flex">
                <label for="">Min</label>
                <input type="text" name="" id="" value={postSettings.tag_min_length}
                  onChange={(event) => updateSetting('tag_min_length', event.target.value)}
                  readOnly={!postSettings.tag_required}
                  style={{ color: postSettings.tag_required ? '' : 'grey' }} />
              </div>
              <div class="choice-input flex">
                <label for="">Max</label>
                <input type="text" name="" id="" value={postSettings.tag_max_length}
                  onChange={(event) => updateSetting('tag_max_length', event.target.value)}
                  readOnly={!postSettings.tag_required}
                  style={{ color: postSettings.tag_required ? '' : 'grey' }} />
              </div>
              <div class="choice">
                <p>Validate</p>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={postSettings.tag_validate}
                      onChange={(event) => updateSetting('tag_validate', event.target.checked)}
                      disabled={!postSettings.tag_required}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.keyword_required}
                      onChange={(event) => updateSetting('keyword_required', event.target.checked)}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="choice-input flex">
                <label for="">Min</label>
                <input type="text" name="" id="" value={postSettings.keyword_min_length}
                  onChange={(event) => updateSetting('keyword_min_length', event.target.value)}
                  readOnly={!postSettings.keyword_required}
                  style={{ color: postSettings.keyword_required ? '' : 'grey' }} />

              </div>
              <div class="choice-input flex">
                <label for="">Max</label>
                <input type="text" name="" id="" value={postSettings.keyword_max_length}
                  onChange={(event) => updateSetting('keyword_max_length', event.target.value)}
                  readOnly={!postSettings.keyword_required}
                  style={{ color: postSettings.keyword_required ? '' : 'grey' }} />
              </div>
              <div class="choice">
                <p>Validate</p>
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={postSettings.keyword_validate}
                      onChange={(event) => updateSetting('keyword_validate', event.target.checked)}
                      disabled={!postSettings.keyword_required}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.featured_image_required}
                      onChange={(event) => updateSetting('featured_image_required', event.target.checked)}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.featured_image_validate}
                      onChange={(event) => updateSetting('featured_image_validate', event.target.checked)}
                      disabled={!postSettings.featured_image_required}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.author_required}
                      onChange={(event) => updateSetting('author_required', event.target.checked)}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.author_validate}
                      onChange={(event) => updateSetting('author_validate', event.target.checked)}
                      disabled={!postSettings.author_required}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.note_required}
                      onChange={(event) => updateSetting('note_required', event.target.checked)}
                    />
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
                    <input
                      type="checkbox"
                      checked={postSettings.note_validate}
                      onChange={(event) => updateSetting('note_validate', event.target.checked)}
                      disabled={!postSettings.note_required}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>

              </div>

            </div>
            <button type="button" onClick={handleSaveButtonClick} className="btn" style={{ backgroundColor: updated ? "grey" : "#1579FF" }}>Save</button>
          </div>

          <div class="aside-form-div">
            <p class="border-bottom">New Category</p>

            <div class="aside-form">
              <form action="" onSubmit={onSubmitNewCategory}>
                <div>
                  <label for="">Name</label>
                  <input type="text" placeholder="" onChange={(event) => handleCategory("name", event.target.value)} />
                </div>
                <div>
                  <label for="">URL</label>
                  <input type="text" placeholder="" onChange={(event) => handleCategory("url", event.target.value)} />
                </div>
                <div>
                  <label for="">Parent</label>
                  {/* <input type="text" placeholder="" onChange={(event) => handleCategory("parent_category_id", event.target.value)} /> */}
                  <div class="dropdown">

                    <CategoryDropdown onCategoryChange={handleCategoryChange} publicationValue={postSettings.publication_id} />

                    {/* <img src="images/arrow-down.png" alt="" /> */}
                  </div>
                </div>
                <div >
                  <p class="hidden"></p>
                  <button class="btn" >Submit</button>
                </div>

              </form>
            </div>
            <div className="categories-section">
              <p>Categories</p>
              <div className="categories">
                {categories.map((category) => (
                  <div key={category.category_id} className="category">
                    <div className="flex">
                      <p>{category.name} ({countSubcategories(category)})</p>
                      <img src={activeTrash} alt="" />
                    </div>
                    <ul>
                      {category.category &&
                        category.category.map((subCategory) => (
                          <li key={subCategory.category_id}>
                            <div className="flex">
                              <p>{subCategory.name}</p>
                              <p>({countSubcategories(subCategory)})</p>
                              <img src="images/trash-grey.png" alt="" />
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Publication;