import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../config/supabase';
import StatusSelection from '../FormDataInformation/StatusSelection';
import CategoryDropdown from '../FormDataInformation/CategoryDropDown';
import AuthorDropdown from '../FormDataInformation/AuthorDropdown';
import './FormPage.css'; // Import your CSS file

function Updatearticle() {
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
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [note, setNote] = useState('');
  const [dateInput, setDateInput] = useState('');

  const[categoryValue , setCategoryValue] = useState('')
  const[authorValue,setAuthorValue] = useState('')


  // Dropdown 
  const [publicationData, setPublicationData] = useState([]);
  const [postTypeData, setPostTypeData] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(1);
  const [selectedPostType, setSelectedPostType] = useState(2);

  const { articleId } = useParams();





  useEffect(() => {
    async function fetchData() {
      // Fetch data from the 'publication' table
      const { data: publicationData, error } = await supabase
        .from('publication')
        .select('*');

      if (publicationData) {
        setPublicationData(publicationData);
      } else {
        throw error;
      }

      // Fetch data from the 'post_type' table
      const { data: postTypeData, error: postTypeError } = await supabase
        .from('post_type')
        .select('*');

      if (postTypeData) {
        setPostTypeData(postTypeData);
      } else {
        throw postTypeError;
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchArticleData() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select(`
            *,
            articlestatus(*),
            authors(*),
            categories(*),
            post_type(*),
            publication(*)
          `)
          .eq('article_id', articleId)
          .single();

           
        if (error) {
          console.error('Error fetching article data:', error);
          // Handle error as needed (e.g., show an error message to the user)
          return;
        }

        // Populate the form fields with the fetched data
        setStatusId(data.articlestatus.status_id);
        setTypedUrl(data.url);
        setSeoScore(data.seo_score);
        setCategory_id(data.categories.category_id);
        setCategory_url(data.categories.url);
        setSeoTitle(data.seo_title);
        setSeoDescription(data.seo_description);
        setTag(data.tag);
        setKeywords(data.keyword);
        setFeaturedImage(data.featured_image);
        setAuthorId(data.authors.author_id);
        setCategoryValue(data.categories.name)
        setAuthorValue(data.authors.name)

        // Handle Date
        if (data.date) {
          const parsedDate = new Date(data.date);
           setDateInput(formatDateForInput(parsedDate)); // Set the initial value for the editable input
        }

        setTitle(data.title);
        setBody(data.body);
        setNote(data.note);
        setSelectedPublication(data.publication_id);
        setSelectedPostType(data.post_type.post_type_id);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    }

    if (articleId) {
      fetchArticleData();
    }
  }, [articleId]);

  // Format the date to match the 'datetime-local' input format
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

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

  const handleDateInputChange = (event) => {
    // Update the dateInput state when the editable input value changes
    setDateInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedArticle = {
        status_id: statusId,
        publication_id: selectedPublication,
        post_type: selectedPostType,
        url: category_url + '/' + typedUrl,
        seo_score: seoScore,
        seo_title: seoTitle,
        seo_description: seoDescription,
        tag,
        keywords,
        featured_image: featuredImage,
        author_id: authorId,
        category_id: category_id,
        date: dateInput, // Use dateInput as the date value
        title,
        body,
        note,
      };

      const { data, error } = await supabase
        .from('articles')
        .upsert([updatedArticle]);

      if (error) {
        console.error('Error updating article:', error);
        // Handle error as needed (e.g., show an error message to the user)
        return;
      }

      console.log('Article updated:', data);

      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

 

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
        <p style={{ marginRight: '1rem' }}>Add Page</p>
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
          <CategoryDropdown onCategoryChange={handleCategoryChange} categoryValue={categoryValue}   required />
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
              onChange={(e) => setSeoScore(e.target.value)}
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
            onChange={(e) => setSeoTitle(e.target.value)}
          />
        </div>

        <div className="flex">
          <textarea
            placeholder="Enter SEO Description"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            rows="4"
            cols="10"
          />
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Featured Image"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
          />
        </div>

        <div className="flex">
          <p style={{ marginRight: '5rem' }}>Author</p>
          <AuthorDropdown onAuthorChange={handleAuthorChange} authorValue = {authorValue} required />
        </div>

        <div className="flex">
          <p style={{ marginRight: '5rem' }}>Date</p>
          <input
            type="datetime-local"
            placeholder="Date"
            value={dateInput}
            onChange={handleDateInputChange}
          />
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex">
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="30"
            cols="10"
          />
        </div>

        <div className="flex">
          <textarea
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
          />
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="button-div">
            <button className="button-light btn" type="button">
              Delete
            </button>
            <button className="button-dark btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Updatearticle;