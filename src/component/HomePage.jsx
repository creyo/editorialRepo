import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supabase';
import { filterArticles , filterDataByUserId } from './filter.js';
import './HomePage.css';

// Import images from the "./images" directory
import plusImage from './images/plus.svg';
import keyImage from './images/key.svg';
import chit from "./images/chit.svg"

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [postTypes, setPostTypes] = useState([]);
  const [publications, setPublications] = useState([]);
  const [selectedPostType, setSelectedPostType] = useState('');
  const [selectedPublication, setSelectedPublication] = useState('');

  const [selectedPostTypeId, setSelectedPostTypeId] = useState(1);
  const [selectedPublicationId, setSelectedPublicationId] = useState(1);
  const [selectedStatusId, setSelectedStatusId] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      
      let { data, error } = await supabase
        .from('articles')
        .select(`
        *,
        articlestatus(*),
        authors(*),
        categories(*),
        post_type(*),
        publication(*)
        
      `);

      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setArticles(data);
      }
    }

     
    async function fetchPostTypes() {
      try {
        const { data, error } = await supabase.from('post_type').select('*');
        if (error) {
          throw error;
        }

        setPostTypes(data);
      } catch (error) {
        console.error('Error fetching post_type:', error);
      }
    }

    async function fetchPublications() {
      try {
        const { data, error } = await supabase.from('publication').select(`
          *,
          auth(*)`
          );
        if (error) {
          throw error;
        }

        let tokenInfo =  localStorage.getItem("sb-narivuecshkbtcueblcl-auth-token")
        let filterData = await filterDataByUserId(data, tokenInfo.user.id)
        setPublications(filterData);
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    }

    fetchArticles();
    fetchPostTypes();
    fetchPublications();
  }, []);

  const handlePostTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPostType(selectedValue);

    const selectedPostTypeObject = postTypes.find(
      (postType) => postType?.type_name === selectedValue
    );

    if (selectedPostTypeObject) {
      const postTypeId = selectedPostTypeObject?.post_type_id;
      setSelectedPostTypeId(postTypeId);
    }
  };

  //console.warn(articles);

  
  
  
  
  const handlePublicationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPublication(selectedValue);

    const selectedPublicationObject = publications.find(
      (publication) => publication?.publication_name === selectedValue
    );

    if (selectedPublicationObject) {
      const publicationId = selectedPublicationObject?.publication_id;
      setSelectedPublicationId(publicationId);
    }
  };

  // Use the filtering function to get filtered articles based on selectedPublicationId and selectedPostTypeId
  const filteredArticles = filterArticles(articles, selectedPublicationId, selectedPostTypeId, selectedStatusId)


  
  return (
    <div className="container">
      <div className="selectors">
        <select
          name=""
          id=""
          onChange={handlePublicationChange}
          value={selectedPublication}
        >
          {publications.map((publication) => (
            <option key={publication.publication_id} value={publication.publication_name}>
              {publication.publication_name}
            </option>
          ))}
        </select>

        <select
          name=""
          id=""
          onChange={handlePostTypeChange}
          value={selectedPostType}
        >
         

        {postTypes.map((postType) => (
          <option key={postType.post_type_id} value={postType.type_name}>
            {postType.type_name}
          </option>
        ))}
       
      </select>
    </div>

       

      <div className="top-card">
        <div className="buttons-others">
          <p className={`all ${selectedStatusId === null ? 'select' : ''}`} onClick={() => setSelectedStatusId(null)}>All(103)</p>
          <p className={`draft ${selectedStatusId === 1 ? 'select' : ''}`} onClick={() => setSelectedStatusId(1)}>Draft(103)</p>
          <p className={`published ${selectedStatusId === 2 ? 'select' : ''}`} onClick={() => setSelectedStatusId(2)}>Published(103)</p>
          <p className={`review ${selectedStatusId === 3 ? 'select' : ''}`} onClick={() => setSelectedStatusId(3)}>Review(103)</p>
        </div>
        <div className="key">
          <p style={{ color: '#457EFF', fontWeight: 600 }}>
            <Link to={`/addarticle/${selectedPublicationId}/${selectedPostTypeId}`}>
              <img src={plusImage} alt="Plus" /> Add Page
            </Link>
          </p>
        </div>
      </div>



    <div className="cards-container">
      {filteredArticles.map((articleItem) => (
        <div className="card" key={articleItem.article_id}>
          <div className="card-left">
            <div className="heading-checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <span className="checkmark"></span>
              </label>
              <p>ID {articleItem.article_id}</p>

              <p className="heading">
                <Link to={`/updatearticle/${articleItem.article_id}`} className="heading">
                  {articleItem.title}
                </Link>
              </p>
            </div>
            <div className="bread-crum">
              <p className="crumb">
                /{articleItem.categories.url}/{articleItem.url}
              </p>
              <p>{articleItem.date}</p>
              <p>{articleItem.created_at}</p>
            </div>

            <div className="buttons-others flex">
              {articleItem.status === 1 && <button>Draft</button>}
              {articleItem.status === 2 && (
                <button className="review-select">Review</button>
              )}
              {articleItem.status === 3 && <button>Published</button>}
              <div className="flex key">
                <img src={keyImage} alt="Key" />
                <p>{articleItem.keyword}</p>
                <img src={chit} alt="tag" />
                <p>{articleItem.tag}</p>
              </div>
            </div>
          </div>
          <div
            className={`seo ${getSEOColorClass(articleItem.seo_score)}`}
          >
            <p>SEO</p>
            <p className="percent">{articleItem.seo_score}%</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

function getSEOColorClass(seoScore) {
  if (seoScore >= 80) {
    return 'percent-green';
  } else if (seoScore >= 60) {
    return 'percent-yellow';
  } else {
    return 'percent-red';
  }
}
