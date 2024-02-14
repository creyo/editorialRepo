import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../config/supabase';
import { filterArticles, filterArticlesPostTypeCount, filterPublicationsByUserEmail, formatDate, countArticlesByStatus, countWord, filterArticlesCount } from './filter.js';
import './FrontPage.css'

import arrowDown from './images/arrow-down.png'
import setting from './images/settings.png'
import plus from './images/plus.png'
import eye from './images/eye.png'
import key from './images/key.svg'
import trash from './images/trash-2.png'
import chit from './images/chit.svg'

import try3 from './images/try.png'

import PostTypeButton from './Button/PostTypeButton';
import ArticleSearch from './Button/ArticleSearch';

import ConfirmDeletePopup from './Button/ConfirmDeletePopup.jsx';
import Icon from './Button/Icon.jsx';
import IconFilteration from './Button/IconFilteration.jsx';



function FrontPage() {

    const navigate = useNavigate()
    const [articles, setArticles] = useState([]);
    const [publications, setPublications] = useState([]);
    const [listedData, setListedData] = useState([])
    const [selectedPublication, setSelectedPublication] = useState('');
    const [finalData, setFinalData] = useState([])
    const [selectedPostTypeId, setSelectedPostTypeId] = useState();
    const [selectedPublicationId, setSelectedPublicationId] = useState(1)
    const [selectedStatusId, setSelectedStatusId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState(finalData.map(() => true));
    const [sortBy, setSortBy] = useState({ attribute: '', ascending: true });
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState([])
    const [sortedArticlesLength, setsortedArticlesLength] = useState(0)
    const [postTypeCount, setpostTypeCount] = useState([])
    const [activeIcon, setActiveIcon] = useState(null)







    let selectedOption = localStorage.getItem("selectedOption")
    if (selectedOption === "Page") {
        selectedOption = "pages"
    }

  

    async function fetchArticles(publicationID) {

        let { data, error } = await supabase
            .from('articles')
            .select(`
        *,
        articlestatus(*),
        authors(*),
        categories(*),
        post_type(*),
        publication(*),
         control("*")
        `).eq('publication_id', `${publicationID}`)
        console.log(data)
        if (error) {
            console.error('Error fetching articles:', error);
        } else {
            console.log(data)
            setArticles(data);
        }
    }

    console.log("selectedPublication", selectedPublication)
    console.log("selectedPublicationId", selectedPublicationId)

   
    
    


    useEffect(() => {
        // fetchArticles()
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

                let tokenInfo = localStorage.getItem('sb-czlpeqcpksfalvtmrulq-auth-token')
                const jsonObject = JSON.parse(tokenInfo);
                let email = jsonObject.user.email
                let filterData = filterPublicationsByUserEmail(data, email)
                if (filterData.length === 0) {
                    navigate("/blank");
                }
                // Sorting the array based on publication_id in ascending order
                const sortedData = filterData.sort((a, b) => a.publication_id - b.publication_id);
                setPublications(sortedData)
            } catch (error) {
                console.error('Error fetching publications:', error.message);
            }
        }

        fetchArticles(selectedPublicationId);

        fetchPublications();
    }, [navigate, selectedPublicationId]);


    // Use the filtering function to get filtered articles based on selectedPublicationId and selectedPostTypeId
    useEffect(() => {
        const filteredArticles = filterArticles(articles, selectedPostTypeId, selectedStatusId)
        let postTypeCount = filterArticlesPostTypeCount(articles, selectedPublicationId)
        setpostTypeCount(postTypeCount)
        const uniqueCategories = new Set();

        const categoriesData = filteredArticles.map(article => {
            const { name, url } = article.categories;

            // Use the 'url' as a unique key to avoid duplicates
            if (!uniqueCategories.has(url)) {
                uniqueCategories.add(url);
                return { name, url };
            }

            return null; // Skip duplicates
        }).filter(category => category !== null);
        setFinalData(filteredArticles)
        setCategory(categoriesData)
    }, [articles, selectedPublicationId, selectedPostTypeId, selectedStatusId])


    const toggleSortBy = (attribute) => {
        if (sortBy.attribute === attribute) {
            setSortBy({ attribute, ascending: !sortBy.ascending });
        } else {
            setSortBy({ attribute, ascending: true });
        }
    };



    const handlePublicationChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedPublication(selectedValue);
        localStorage.setItem('publicationName', selectedValue);

        const selectedPublicationObject = publications.find(
            (publication) => publication?.publication_name === selectedValue
        );

        if (selectedPublicationObject) {
            const publicationId = selectedPublicationObject?.publication_id;
            console.log("publicationid", publicationId)
            setSelectedPublicationId(publicationId);
            fetchArticles(publicationId)
            localStorage.setItem('publicationId', publicationId);
        }
    };

    const handleButtonClick = (value, option) => {
        setSelectedPostTypeId(value);
        localStorage.setItem('postTypeId', value);
    };

    const singleItemCheckbox = (article_id) => {
        // Parse the article_id to an integer
        const articleIdAsInt = parseInt(article_id, 10);

        // Create a copy of the current checkboxStates
        const newCheckboxStates = { ...checkboxStates };

        // Toggle the checked state for the specified article_id
        newCheckboxStates[articleIdAsInt] = !newCheckboxStates[articleIdAsInt];

        // Create an array of selected article_ids based on the updated checkbox states
        const ArticleIds = Object.keys(newCheckboxStates).filter(
            (id) => newCheckboxStates[id]
        ).map(id => parseInt(id, 10)); // Parse the IDs to integers in the resulting array

        // Now, ArticleIds contains the article_ids as integers of the  items
        setIdToDelete(ArticleIds);
        // Update the checkboxStates
        setCheckboxStates(newCheckboxStates);
    };




    // Event handler to capture the selected category
    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;

        setSelectedCategory(selectedValue);
    };


    const forCount = filterArticlesCount(articles, selectedPublicationId, selectedPostTypeId, activeIcon)

    //calling count function to count status count of articles 
    let count = countArticlesByStatus(forCount)


    const toggleCheckbox = () => {
        const newIsChecked = !isChecked;
        setIsChecked(newIsChecked);

        // Create an array of new checkbox states based on the updated isChecked value
        const newCheckboxStates = finalData.reduce((checkboxStates, article) => {
            checkboxStates[article.article_id] = newIsChecked;
            return checkboxStates;
        }, {});


        let value = Object.keys(newCheckboxStates)
        let ArticleIds = value.map((str) => parseInt(str, 10))



        if (idToDelete.length === sortedArticlesLength) {
            setIdToDelete([]);
        } else {

            setIdToDelete(ArticleIds);
        }


        setCheckboxStates(newCheckboxStates);
    }



    const applySortingAndFilteringFunctions = (data, sortBy, selectedCategoryUrl, control) => {
        let filteredData = data;

        // Filter based on the selectedCategoryUrl (if not "All")
        if (selectedCategoryUrl && selectedCategoryUrl !== "All") {
            filteredData = data.filter((item) => item.categories.url === selectedCategoryUrl);
        }

        // Additional filtering based on the control field
        if (control) {
            filteredData = filteredData.filter((item) => item.control && item.control[control] === true);
        }

        const { attribute, ascending } = sortBy;

        // Apply sorting function based on the provided attribute
        if (attribute === 'title') {
            filteredData = filteredData.sort((a, b) => ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
        } else if (attribute === 'seo_score') {
            filteredData = filteredData.sort((a, b) => ascending ? a.seo_score - b.seo_score : b.seo_score - a.seo_score);
        } else if (attribute === 'date') {
            filteredData = filteredData.sort((a, b) => ascending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
        } else if (attribute === 'category') {
            filteredData = filteredData.sort((a, b) => ascending ? a.url.localeCompare(b.url) : b.url.localeCompare(a.url));
        }

        return filteredData;
    };




    // const sortedArticles = applySortingAndFilteringFunctions(finalData, sortBy, selectedCategory);
    const sortedArticles = applySortingAndFilteringFunctions(finalData, sortBy, selectedCategory, activeIcon);
    const handleSearch = (query) => {
        // Use the query to filter the articles
        const searching = sortedArticles.filter((article) =>
            new RegExp(`\\b${query}`, 'i').test(article.title)
        );

        setListedData(searching)
    };



    const pubID = localStorage.getItem('publicationId');
    const postTypeId = localStorage.getItem('postTypeId');
    const selectValue = localStorage.getItem('publicationName');
    useEffect(() => {
        setListedData(sortedArticles)
        setsortedArticlesLength(sortedArticles.length)
        setSelectedPublication(selectValue)
        setSelectedPublicationId(parseInt(pubID))
        setSelectedPostTypeId(parseInt(postTypeId))
        // console.log(typeof(), postTypeId)
    }, [sortedArticles, selectedPublicationId, selectedPostTypeId, postTypeId, pubID, selectValue])





    const handleConfirm = async (articleId) => {
        try {
            // Update the 'Deleted' field to true for the selected articles
            const { error } = await supabase
                .from('articles')
                .update({ status: 0 })
                .in('article_id', articleId);

            if (error) {
                throw error.message
            } else {
                fetchArticles(selectedPublicationId)
                setIsChecked(false)
            }

        } catch (error) {
            console.error('Error deleting articles:', error.message);
        }


        setIsConfirmationOpen(false);
    };


    const handleClose = () => {
        // Close the confirmation popup
        setIsConfirmationOpen(false);
    };


    const handleDataUpdate = async () => {

        fetchArticles(selectedPublicationId);
    };


    // const [editedContent, setEditedContent] = useState('');

    // const handleContentEdit = (e) => {
    //     console.log(e.target.textContent)
    //     setEditedContent(e.target.textContent);
    // }; 

    // const handleBlur = async (e,articleId ) => {
    //     setTimeout(() => {
    //       console.log(e.target.textContent);
    //       console.log(articleId);
    //     }, 0);
    //   };

    const handleBlur = async (e, articleId, type) => {
        let content = e.target.textContent;
        if (type === 'seo_score') {
            // Remove % sign if type is "seo"
            content = content.replace(/%/g, "");
        }

        const updateItem = {
            [type]: content,
        }

        try {

            const { data, error } = await supabase
                .from('articles')
                .update(updateItem)
                .eq('article_id', articleId);

            if (error) {
                throw new Error('Error updating article:', error.message);
            }
            fetchArticles(selectedPublicationId)

            return data; // Return the updated data if needed
        } catch (error) {
            console.error('Error updating article:', error.message);
            throw error;
        }
    };


    // Function to update article status using Supabase API
    const updateArticleStatus = async (status, id) => {

        try {
            // Assuming you have the Supabase client instance available
            const { error } = await supabase
                .from('articles')
                .update({ status: status })
                .eq('article_id', id);

            if (error) {
                // Handle error, display message, etc.
                console.error('Error updating article status:', error);
            } else {
                fetchArticles(selectedPublicationId)

            }
        } catch (error) {
            console.error('Error updating article status:', error.message);
        }
    };






    return (
        <>
            <div className="containers">

                <div className="selectors">
                    <div className="flex" >
                        <div className="flex">
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

                            <img src={arrowDown} alt="" style={{ marginRigth: '10px' }} />
                        </div >
                        <PostTypeButton onChangeValue={handleButtonClick} PostTypeData={count.all} articleLength={postTypeCount.length} />
                    </div>
                    <Link to={"/setting"} style={{ textDecoration: "none" }}>
                        <div className="key setting" >
                            <p> Settings</p>
                            <img src={setting} alt="" />
                        </div>
                    </Link>
                </div>

                <div className="top-card">
                    <div className="buttons-others">
                        <p className={`all ${selectedStatusId === null ? 'all-button-selected' : ''}`} onClick={() => setSelectedStatusId(null)}>All ({count.all})</p>
                        <p className={`draft ${selectedStatusId === 1 ? 'draft-button-selected' : ''}`} onClick={() => setSelectedStatusId(1)}>Draft  ({count.draft})</p>
                        <p className={`review ${selectedStatusId === 2 ? 'review-button-selected' : ''}`} onClick={() => setSelectedStatusId(2)}>Review  ({count.review})</p>
                        <p className={`published ${selectedStatusId === 3 ? 'published-button-selected' : ''}`} onClick={() => setSelectedStatusId(3)}>Published  ({count.published})</p>
                        <p className={`deleted ${selectedStatusId === 0 ? 'deleted-button-selected' : ''}`} onClick={() => setSelectedStatusId(0)}>Deleted ({count.deleted}) </p>

                    </div>
                    <div className="flex">
                        <ArticleSearch onSearch={handleSearch} />
                        <div className="add-plus">
                            <Link className='link' to={`/addarticle/${selectedPublicationId}/${selectedPostTypeId}`}>
                                <p>Add a {selectedPostTypeId === 2 ? "Blog" : "Page"} </p>
                            </Link>
                            <img src={plus} alt="" />
                        </div>
                    </div>

                </div>
                <div className="filters-input">

                    <div className="key" >
                        <div className="checkbox" >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={toggleCheckbox}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <p>Select All</p>
                        <img
                            src={isChecked ? "checkmark.png" : "uncheck.png"}
                            alt=""
                            onClick={toggleCheckbox}
                        />
                        <img
                            style={{ cursor: "pointer" }}
                            src={trash}
                            alt="Click to open confirmation"
                            onClick={() => setIsConfirmationOpen(true)}
                        />

                        <ConfirmDeletePopup
                            isOpen={isConfirmationOpen}
                            articleId={idToDelete}
                            onConfirm={handleConfirm}
                            onClose={handleClose}

                        />
                    </div>

                    <div className="filters">
                        <div className="flex" onClick={() => toggleSortBy('title')}>
                            <p>Title</p>
                            <div className="arrows">

                                {sortBy.attribute === 'title' && sortBy.ascending ? (

                                    <svg style={{ marginBottom: '2px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                        <path d="M0 6L6 0L12 6H0Z" fill="#457EFF" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                                        <path d="M0 0.203125L6 6.20312L12 0.203125H0Z" fill="#457EFF" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <div className="flex" onClick={() => toggleSortBy('seo_score')}>
                            <p>SEO Score</p>
                            <div className="arrows">
                                {/* Sorting icons (adjust the SVG path as needed) */}
                                {sortBy.attribute === 'seo_score' && sortBy.ascending ? (
                                    <svg style={{ marginBottom: '2px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                        <path d="M0 6L6 0L12 6H0Z" fill="#457EFF" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                                        <path d="M0 0.203125L6 6.20312L12 0.203125H0Z" fill="#457EFF" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <div className="flex" onClick={() => toggleSortBy('date')}>
                            <p>Date</p>
                            <div className="arrows">
                                {/* Sorting icons (adjust the SVG path as needed) */}
                                {sortBy.attribute === 'date' && sortBy.ascending ? (
                                    <svg style={{ marginBottom: '2px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                        <path d="M0 6L6 0L12 6H0Z" fill="#457EFF" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                                        <path d="M0 0.203125L6 6.20312L12 0.203125H0Z" fill="#457EFF" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <div className="flex" onClick={() => toggleSortBy('category')}>
                            <p>Category</p>
                            <div className="arrows">
                                {/* Sorting icons (adjust the SVG path as needed) */}
                                {sortBy.attribute === 'category' && sortBy.ascending ? (
                                    <svg style={{ marginBottom: '2px' }} xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                                        <path d="M0 6L6 0L12 6H0Z" fill="#457EFF" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                                        <path d="M0 0.203125L6 6.20312L12 0.203125H0Z" fill="#457EFF" />
                                    </svg>
                                )}
                            </div>
                        </div>


                        <div className="flex">
                            <select name="categoryDropdown" id="categoryDropdown" onChange={handleCategoryChange} value={selectedCategory} >
                                <option value="">All</option>
                                {category.map(category => (
                                    <option key={category.url} value={category.url}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <img src={arrowDown} alt="" style={{ marginRight: '10px' }} />
                        </div>

                        <div>
                            <IconFilteration activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
                        </div>


                    </div>


                </div>

                {listedData.map((article) => (
                    <div className="card" key={article.article_id}>
                        <div className="card-left">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkboxStates[article.article_id]}
                                        onChange={() => singleItemCheckbox(article.article_id)}
                                    />

                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <img src={article.featured_image ? `https://res.cloudinary.com/creyo-com/image/upload/c_scale,w_138,h_83,r_10/${selectedPublication}/${selectedOption}/${article.featured_image}` : try3} alt="" />
                        </div>
                        <div className="card-right">
                            <div className="options">
                                <div className='flex'>
                                    <p className="heading" style={{ border: "none" }}
                                        contentEditable
                                        suppressContentEditableWarning={true}

                                        onBlur={(e) => handleBlur(e, article.article_id, 'title')}
                                    >
                                        {article.title}
                                    </p>
                                    <p className="char char-red" style={{ marginLeft: "20px" }}>
                                        ({article.title.length} char)
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="key">

                                        <img src={eye} alt="" />
                                    </div>
                                    {article.seo_score && <div className="seo">
                                        <p>SEO</p>
                                        <p className="percent percent-red" contentEditable
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleBlur(e, article.article_id, 'seo_score')}
                                        >{article.seo_score}%</p>
                                    </div>}
                                    <div className="seo edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path d="M12.776 1.33594C12.6055 1.33594 12.4347 1.40092 12.3047 1.53125L11.1667 2.66927L13.8333 5.33594L14.9714 4.19792C15.232 3.93725 15.232 3.51521 14.9714 3.25521L13.2474 1.53125C13.1171 1.40092 12.9466 1.33594 12.776 1.33594ZM10.1667 3.66927L2.5 11.3359V14.0026H5.16667L12.8333 6.33594L10.1667 3.66927Z" fill="#457EFF" />
                                        </svg>
                                        <Link className="svgLink" to={`/updatearticle/${article.article_id}`}>Edit</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="bread-crumb">
                                <div className="bread-crum">
                                    <img src={arrowDown} alt="" />
                                    <p className="crumb">/{article.categories.url}/<span contentEditable
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleBlur(e, article.article_id, 'url')}
                                    >{article.url}</span></p>
                                    <p>{formatDate(article.date)}</p>
                                    <p>{formatDate(article.created_at)}</p>
                                    <p>ID {article.article_id}</p>
                                    <Icon article={article} article_id={article.article_id} onDataUpdate={handleDataUpdate} />

                                </div>

                                <div className="words">{countWord(article.body)} Words </div>
                            </div>
                            <div className="buttons-others flex">
                                {/* <button>{article.articlestatus.status_name}</button> */}
                                <button
                                    className={article.status === 1 ? 'draft-select' : ''}
                                    onClick={() => updateArticleStatus(1, article.article_id)}
                                >
                                    Draft
                                </button>
                                <button
                                    className={article.status === 2 ? 'review-select' : ''}
                                    onClick={() => updateArticleStatus(2, article.article_id)}
                                >
                                    Review
                                </button>
                                <button
                                    className={article.status === 3 ? 'published-select' : ''}
                                    onClick={() => updateArticleStatus(3, article.article_id)}
                                >
                                    Published
                                </button>
                                {article.keyword && <div className="flex key">
                                    <img src={key} alt="" />
                                    <p contentEditable suppressContentEditableWarning={true}
                                        onBlur={(e) => handleBlur(e, article.article_id, 'keyword')}>{article.keyword}</p>
                                </div>}
                                {article.tag && <div className="flex key">
                                    <img src={chit} alt="" />
                                    <p contentEditable suppressContentEditableWarning={true}
                                        onBlur={(e) => handleBlur(e, article.article_id, 'tag')}>{article.tag}</p>
                                </div>
                                }
                            </div>

                        </div>
                    </div>
                ))}
                {/* <div className="card">
                    <div className="card-left">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" checked="checked" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <img src={try3} alt="" />
                    </div>
                    <div className="card-right">
                        <div className="options">
                            <p className="heading">Guide to Building a Brand Identity Kit: The Ultimate Beginner’s Guide for Establishing a Strong Brand</p>
                            <div className="flex">
                                <div className="key">
                                    <p className="char char-red">(107 Char)</p>
                                    <img src={eye} alt="" />
                                </div>

                                <div className="seo">
                                    <p>SEO</p>
                                    <p className="percent percent-red">50%</p>
                                </div>

                                <div className="seo edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path d="M12.776 1.33594C12.6055 1.33594 12.4347 1.40092 12.3047 1.53125L11.1667 2.66927L13.8333 5.33594L14.9714 4.19792C15.232 3.93725 15.232 3.51521 14.9714 3.25521L13.2474 1.53125C13.1171 1.40092 12.9466 1.33594 12.776 1.33594ZM10.1667 3.66927L2.5 11.3359V14.0026H5.16667L12.8333 6.33594L10.1667 3.66927Z" fill="#457EFF" />
                                    </svg>
                                    <p className="">Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className="bread-crumb">
                            <div className="bread-crum">
                                <img src={arrowDown} alt="" />
                                <p className="crumb">/real-estate/<span>how-to-make-money</span></p>
                                <p>30 Aug 23</p>
                                <p>1:13 PM</p>
                                <p>ID 3476</p>
                                <div class="icons-flex">
                                    <img class="icon active" src={mystery} alt="" />
                                    <img class="icon" src={refresh} alt="" />
                                    <img class="icon" src={images} alt="" />
                                    <img class="icon " src={description} alt="" />
                                    <p class="icon " >SEO</p>
                                </div>
                            </div>
                            <div className="words">870 Words</div>
                        </div>


                        <div className="buttons-others flex">
                            <button className="draft-select">Draft</button>
                            <button >Review</button>
                            <button>Published</button>
                            <div className="flex key">
                                <img src={key} alt="" />
                                <p>Domain Names</p>
                            </div>
                            <div className="flex key">
                                <img src={chit} alt="" />
                                <p>Income Streams</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-left">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" checked="checked" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div className="card-right">
                        <div className="options">
                            <p className="heading">Guide to Building a Brand Identity Kit: The Ultimate Beginner’s Guide for Establishing a Strong Brand</p>
                            <div className="flex">
                                <div className="key">
                                    <p className="char char-red">(107 Char)</p>
                                    <img src={eye} alt="" />
                                </div>

                                <div className="seo">
                                    <p>SEO</p>
                                    <p className="percent percent-red">50%</p>
                                </div>

                                <div className="seo edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path d="M12.776 1.33594C12.6055 1.33594 12.4347 1.40092 12.3047 1.53125L11.1667 2.66927L13.8333 5.33594L14.9714 4.19792C15.232 3.93725 15.232 3.51521 14.9714 3.25521L13.2474 1.53125C13.1171 1.40092 12.9466 1.33594 12.776 1.33594ZM10.1667 3.66927L2.5 11.3359V14.0026H5.16667L12.8333 6.33594L10.1667 3.66927Z" fill="#457EFF" />
                                    </svg>
                                    <p className="">Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className="bread-crumb">
                            <div className="bread-crum">
                                <img src={arrowDown} alt="" />
                                <p className="crumb">/real-estate/<span>how-to-make-money</span></p>
                                <p>30 Aug 23</p>
                                <p>1:13 PM</p>
                                <p>ID 3476</p>
                                <div class="icons-flex">
                                    <img class="icon " src={mystery} alt="" />
                                    <img class="icon" src={refresh} alt="" />
                                    <img class="icon active" src={images} alt="" />
                                    <img class="icon " src={description} alt="" />
                                    <p class="icon " >SEO</p>
                                </div>
                            </div>
                            <div className="words">870 Words</div>
                        </div>


                        <div className="buttons-others flex">
                            <button className="draft-select">Draft</button>
                            <button >Review</button>
                            <button>Published</button>
                            <div className="flex key">
                                <img src={key} alt="" />
                                <p>Domain Names</p>
                            </div>
                            <div className="flex key">
                                <img src={chit} alt="" />
                                <p>Income Streams</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}



export default FrontPage

