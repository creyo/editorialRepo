import React, { useState, useEffect } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './FormPage.css'; // Import your CSS file
import StatusSelection from '../FormDataInformation/StatusSelection';
import CategoryDropdown from '../FormDataInformation/CategoryDropDown';
import AuthorDropdown from '../FormDataInformation/AuthorDropdown';
import supabase from '../config/supabase'; // Import the Supabase instance

function FormPage() {

  const { publicationId, postTypeId } = useParams();
  const navigate = useNavigate
  const [statusId, setStatusId] = useState(1);
  const [typedUrl, setTypedUrl] = useState('');
  const [seoScore, setSeoScore] = useState(0);
  const [category_id, setCategory_id] = useState(0);
  const [category_url, setCategory_url] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [tag, setTag] = useState('');
  const [keywords, setKeywords] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [authorId, setAuthorId] = useState(0);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [note, setNote] = useState('');



  //dropdown 
  const [publicationData, setPublicationData] = useState([]);
  const [postTypeData, setPostTypeData] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(publicationId);
  const [selectedPostType, setSelectedPostType] = useState(postTypeId);


  const [saveButtonColor, setSaveButtonColor] = useState('blue');
  const [formChanged, setFormChanged] = useState(false);

  const handleStatusChange = (selectedStatusId) => {
    setStatusId(selectedStatusId);
  };

  const handlePublicationChange = (event) => {
    setSelectedPublication(event.target.value);
  };

  const handlePostTypeChange = (event) => {
    setSelectedPostType(event.target.value);
  };

  const handleCategoryChange = (selectedCategoryInfo) => {
    setCategory_id(selectedCategoryInfo.category_id);
    setCategory_url(selectedCategoryInfo.category_url);
  };

  const handleAuthorChange = (selectedAuthorId) => {
    setAuthorId(selectedAuthorId);
  };


  useEffect(() => {
    async function fetchData() {
      // Fetch data from the 'publication' table
      const { data: publicationData, error } = await supabase
        .from('publication')
        .select('*');

      if (publicationData) {
        setPublicationData(publicationData);
      } else {
        throw error
      }

      // Fetch data from the 'post_type' table
      const { data: postTypeData, error: postTypeError } = await supabase
        .from('post_type')
        .select('*');

      if (postTypeData) {
        setPostTypeData(postTypeData);
      } else {
        throw postTypeError
      }
    }

    fetchData();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newArticle = {
        status: statusId,
        publication_id: selectedPublication,
        post_type: selectedPostType,
        url: category_url + '/' + typedUrl,
        seo_score: seoScore,
        seo_title: seoTitle,
        seo_description: seoDescription,
        tag,
        keyword: keywords,
        featured_image: featuredImage,
        author_id: authorId,
        category_id: category_id,
        date,
        title,
        body


      };

      const { data, error } = await supabase.from('articles').upsert([newArticle]);

      if (error) {

        console.warn(error)
        throw error;
      }

      console.log('Article created:', data);


    } catch (error) {
      console.error('Error creating article:', error);
    }
  };


    // Function to reset the form to its default values
    const resetForm = () => {
      setStatusId(1);
      setTypedUrl('');
      setSeoScore(0);
      setCategory_id(0);
      setCategory_url('');
      setSeoTitle('');
      setSeoDescription('');
      setTag('');
      setKeywords('');
      setFeaturedImage('');
      setAuthorId(0);
      setDate('');
      setTitle('');
      setBody('');
      setNote('');
    };


  const handleTextChange = (content) => {
    setBody(content);

  };

  // Define a function to change the button color
  const changeButtonColor = () => {
    setSaveButtonColor(formChanged ? 'gray' : 'blue');
  };

  // Add an effect to watch for form changes
  useEffect(changeButtonColor, [formChanged]);


  const TextEditorModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const TextEditorFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];


  console.log(postTypeData)
  return (
    <div className="container">
      <div className="selectors">
        <select
          name="publicationDropdown"
          id="publicationDropdown"
          onChange={handlePublicationChange}
          value={selectedPublication}
        >

          {publicationData.map((publication) => (
            <option
              key={publication.publication_id}
              value={publication.publication_id}
            >
              {publication.publication_name}
            </option>
          ))}
        </select>

        <select
          name="postTypeDropdown"
          id="postTypeDropdown"
          onChange={handlePostTypeChange}
          value={selectedPostType}
        >

          {postTypeData.map((postType) => (
            <option
              key={postType.post_type_id}
              value={postType.post_type_id}
            >
              {postType.type_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex" style={{ margin: '1rem 0' }}>
        <button class="back-button button-dark" onClick={() => navigate(-1)}>Back</button>
        <button class="add-page-button" onClick={resetForm}>Add Page</button>
        <img src="/images/plus.svg" alt="" />
      </div>
      <div className="form-card">
        <div className="flex gap-between">
          <div className="flex child-margin">
            <p>Status</p>
            <StatusSelection
              selectedStatusId={statusId}
              onStatusChange={handleStatusChange}
              required
            />
          </div>
        </div>

        <div className="flex">
          <p style={{ marginRight: '1rem' }}>Category</p>
          <CategoryDropdown onCategoryChange={handleCategoryChange} required />
        </div>
        <div className="flex">
          <p style={{ marginRight: '1rem' }}>URL</p>
          <div className="url-section">
            /{category_url}/
            <span>
              <input
                type="text"
                value={typedUrl}
                onChange={(e) => setTypedUrl(e.target.value)}
                placeholder="Type your URL here"
              />
            </span>
          </div>
        </div>

        <div className="flex">
          <p style={{ marginRight: '5rem' }}>SEO Score</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="number"
              placeholder="Enter SEO Score"
              value={seoScore}
              onChange={(e) => setSeoScore(e.target.value)} // onChange for seoScore
              min="0"
              max="100"
            />
            <p>%</p>
          </div>
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Enter SEO Title"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)} // onChange for seoTitle
          />
        </div>

        <div className="flex">
          <textarea
            placeholder="Enter SEO Description"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)} // onChange for seoDescription
            rows="4"
            cols="10"
          />
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)} // onChange for tag
          />
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)} // onChange for keywords
          />
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Featured Image"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)} // onChange for featuredImage
          />
        </div>

        <div className="flex">
          <p style={{ marginRight: '5rem' }}>Author</p>
          <AuthorDropdown onAuthorChange={handleAuthorChange} required />
        </div>

        <div className="flex">
          <p style={{ marginRight: '5rem' }}>Date</p>
          <input
            type="datetime-local"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // onChange for date
          />
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // onChange for title
            rows="20"
            cols=""
          />
        </div>

        <div style={{ width: '1050px' }}>
          <ReactQuill
            value={body}
            onChange={handleTextChange}
            placeholder="Enter your text here..."
            modules={TextEditorModules}
            formats={TextEditorFormats}
            style={{ height: '800px', marginBottom: '100px' }}
          />
        </div>

        <div className="flex">
          <textarea
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)} // onChange for note
            rows="4"
          />
        </div>

        <form action="" onSubmit={handleSubmit}>
        <div className="button-div">
          <button className="button-light btn" type="button" onClick={resetForm}>
            Delete
          </button>
          <button
            className={`button-dark btn ${saveButtonColor}`}
            type="submit"
            onClick={() => {
              setFormChanged(false); // Reset form change state when clicked
            }}
            disabled={!formChanged}
          >
            Save
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default FormPage;
