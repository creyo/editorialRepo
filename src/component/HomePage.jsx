import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../config/supabase';
import { filterArticles, filterPublicationsByUserEmail, formatDate, countArticlesByStatus, filterArticlesCount } from './filter.js';
//import './HomePage.css';
import SwitchButtons from './Button/SwitchButtons';
// Import images from the "./images" directory
import plusImage from './images/plus.svg';
import keyImage from './images/key.svg';
import chit from "./images/chit.svg"
import PostTypeButton from './Button/PostTypeButton';
import ArticleSearch from './Button/ArticleSearch';

export default function HomePage() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([]);
  const [publications, setPublications] = useState([]);
  const [selectedPostType, setSelectedPostType] = useState('');
  const [selectedPublication, setSelectedPublication] = useState('');
  const [finalData, setFinalData] = useState([])
  const [selectedPostTypeId, setSelectedPostTypeId] = useState(1);
  const [selectedPublicationId, setSelectedPublicationId] = useState(1);
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);



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
        
      `)

      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setArticles(data);
      }
    }




    async function fetchPublications() {
      try {
        const { data, error } = await supabase.from('user_publication').select(`
          *,
          user(*),
          publication(*)`
        );
        if (error) {
          throw error;
        }

        let tokenInfo = localStorage.getItem("sb-czlpeqcpksfalvtmrulq-auth-token")
        const jsonObject = JSON.parse(tokenInfo);
        let email = jsonObject.user.email
        // console.log(user_id)
        //  console.log(data)
        let filterData = filterPublicationsByUserEmail(data, email)
        if (filterData.length === 0) {
          navigate("/blank");
        }

        setPublications(filterData);
      } catch (error) {
        console.error('Error fetching publications:', error.message);
      }
    }

    fetchArticles();

    fetchPublications();
  }, [navigate]);


  const handleButtonClick = (id, value) => {
    setSelectedPostTypeId(id);
    setSelectedPostType(value);
    // Handle other logic as needed
  };


  console.log(selectedPostType, selectedPostTypeId)


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
  useEffect(() => {
    const filteredArticles = filterArticles(articles, selectedPublicationId, selectedPostTypeId, selectedStatusId)
    setFinalData(filteredArticles)
  }, [articles, selectedPublicationId, selectedPostTypeId, selectedStatusId])


  const forCount = filterArticlesCount(articles, selectedPublicationId, selectedPostTypeId)

  //calling count function to count status count of articles 
  let count = countArticlesByStatus(forCount)


  const closePopup = () => {
    setIsPopupOpen(false)
  };

  const openPopUp = () => {
    setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
  };



  const handleSearch = (query) => {
    // Use the query to filter the articles
    const searching = articles.filter((article) =>
      new RegExp(`\\b${query}`, 'i').test(article.title)
    );

    setFinalData(searching)
  };


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


        <PostTypeButton onChangeValue={handleButtonClick} />
      </div>

      <button onClick={openPopUp}>  {isPopupOpen ? "Close Setting" : "Setting"}</button>
      {isPopupOpen &&
        <SwitchButtons
          closePopup={closePopup}

        />
      }

      <div className="top-card">
        <div className="buttons-others">
          <p className={`all ${selectedStatusId === null ? 'select' : ''}`} onClick={() => setSelectedStatusId(null)}>All({count.all})</p>
          <p className={`draft ${selectedStatusId === 1 ? 'select' : ''}`} onClick={() => setSelectedStatusId(1)}>Draft({count.draft})</p>
          <p className={`published ${selectedStatusId === 3 ? 'select' : ''}`} onClick={() => setSelectedStatusId(3)}>Published({count.published})</p>
          <p className={`review ${selectedStatusId === 2 ? 'select' : ''}`} onClick={() => setSelectedStatusId(2)}>Review({count.review})</p>
          <ArticleSearch articles={articles} onSearch={handleSearch} />
        </div>
        <div className="key">
          <p style={{ color: '#457EFF', fontWeight: 600 }}>
            <Link to={`/addarticle/${selectedPublicationId}/${selectedPostTypeId}`}>
              <img src={plusImage} alt="Plus" /> Add {selectedPostType === '' ? "Page" : selectedPostType}
            </Link>
          </p>
        </div>
      </div>



      <div className="cards-container">
        {finalData.map((articleItem) => (
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
                <p>{formatDate(articleItem.date)}</p>
                <p>{formatDate(articleItem.created_at)}</p>
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
