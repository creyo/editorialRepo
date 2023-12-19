import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findPostTypeNameById, filterPublicationsByUserEmail } from "./filter"
import ReactQuill from 'react-quill';
import ProfilePopup from './popUp/ProfilePopup';
import { renderToString } from 'react-dom/server';
import { render } from 'jsx-to-html';
import 'react-quill/dist/quill.snow.css';
import './FormPage.css'; // Import your CSS file
import StatusSelection from '../FormDataInformation/StatusSelection';
import CategoryDropdown from '../FormDataInformation/CategoryDropDown';
import AuthorDropdown from '../FormDataInformation/AuthorDropdown';
import supabase from '../config/supabase'; // Import the Supabase instance
import AddProduct from './popUp/AddProduct';
import DragDrop from './DragDrop';
import Card from './Card';
import Card2 from './Card2';
import QuillCard from './QuillCard';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function FormPage() {

  const { publicationId, postTypeId } = useParams();

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

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  //dropdown 
  const [publicationData, setPublicationData] = useState([]);
  const [postTypeData, setPostTypeData] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(publicationId);
  const [selectedPostType, setSelectedPostType] = useState(postTypeId);

  const [highestarticleid, setHighestArticleId] = useState(0)

  const [submit, setSubmit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddButtonOpen, setIsAddButtonOpen] = useState(false);







  useEffect(() => {
    async function fetchData() {
      // Fetch data from the 'publication' table
      const { data, error } = await supabase.from('user_publication').select(`
          *,
          user(*),
          publication(*)`
      );
      if (error) {
        throw error;
      }

      let tokenInfo = localStorage.getItem("sb-narivuecshkbtcueblcl-auth-token")
      const jsonObject = JSON.parse(tokenInfo);
      let email = jsonObject.user.email

      let filterData = filterPublicationsByUserEmail(data, email)
      setPublicationData(filterData);

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



  let tokenInfo = localStorage.getItem("sb-narivuecshkbtcueblcl-auth-token")
  const jsonObject = JSON.parse(tokenInfo);
  let userId = jsonObject.user.id


  //find highest article_id
  useEffect(() => {
    async function fetchHighestArticleId() {
      // Fetch data from the 'articles' table to find the highest article_id
      const { data, error } = await supabase.from('articles').select('*').order('article_id', { ascending: false }).limit(1);

      if (error) {
        throw error
      } else if (data.length > 0) {

        setHighestArticleId(data[0].article_id + 1);
      }
    }

    fetchHighestArticleId();
  }, []);

  const Items = [
    {
      id: 1,
      type: "card",
      info: {
        name: "Andrew Allemann",
        bio: "Andrew is the founder and editor of Domain Name Wire, a publication that",
        styles: {
          class: {
            padding: '20px',
            borderRadius: '9px',
            background: '#FFF',
            boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)',
          },
          h3: {
            color: '#0AB5FF',
            fontSize: '1.2rem',
            fontWeight: ' bolder',
          },

          p: {
            color: '#757575',
            fontSize: '8px',
          }
        }
      }
    },
    {
      id: 2,
      type: "text-editor",
      text: '',
      info: {
        name: "Text Editor",
        bio: "",
      }
    },
    {
      id: 3,
      type: "card2",
      text: '',
      info: {
        name: "Find and Fix HTML Issues",
        bio: "with site audit tool",
        img_url: 'https://static.semrush.com/blog/uploads/files/e3/c1/e3c11aed0d9bffb525e8f7552d6b7fa1/illustration-ads-banner-205x170.svg',
        styles: {
          class: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 2rem',
            backgroundColor: 'rgb(255, 232, 77)',
            height: '500px',
            width: '400px',
          },
          h3: {
            fontSize: '1.6rem',
            marginTop: '10px',
          },
          a: {
            marginTop: '10px',
            textDecoration: 'none',
            color: 'black',
            fontSize: '1.3rem',
          },
          p: {
            marginTop: '10px',
          }
        }
      }
    },

  ];

  const [ItemsObj, setItems] = useState(Items);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newArticle = {
        status: statusId,
        publication_id: selectedPublication,
        post_type: selectedPostType,
        url: typedUrl,
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
        body,
        user_id: userId
      };

      if (isUpdating) {
        // Update the article with the highest article_id
        const { error } = await supabase
          .from('articles')
          .update(newArticle)
          .eq('article_id', highestarticleid);

        if (error) {
          throw error;
        }


      } else {
        // Create a new article
        const { error } = await supabase.from('articles').upsert([newArticle]);

        if (error) {

          throw error;
        }
        setIsUpdating(true)
        setSubmit(true);

      }

    } catch (error) {
      throw error
    }
  };



  const handleStatusChange = (selectedStatusId) => {
    setStatusId(selectedStatusId);
    setSubmit(false)
  };

  const handlePublicationChange = (event) => {
    setSelectedPublication(event.target.value);
    setSubmit(false)
  };

  const handlePostTypeChange = (event) => {
    setSelectedPostType(event.target.value);
    setSubmit(false)
  };

  const handleCategoryChange = (selectedCategoryInfo) => {
    setCategory_id(selectedCategoryInfo.category_id);
    setCategory_url(selectedCategoryInfo.category_url);
    setSubmit(false)
  };

  const handleAuthorChange = (selectedAuthorId) => {
    setAuthorId(selectedAuthorId);
    setSubmit(false)
  };


  const handleTextChange = (content) => {
    setBody(content);
    setSubmit(false)

  };
  const handleUrl = (e) => {
    setTypedUrl(e.target.value)
    setSubmit(false)
  }

  const handleSeoScore = (e) => {
    setSeoScore(e.target.value)
    setSubmit(false)
  }

  const handleSeoTitle = (e) => {
    setSeoTitle(e.target.value)
    setSubmit(false)
  }

  const handleSeoDescription = (e) => {
    setSeoDescription(e.target.value)
    setSubmit(false)
  }

  const handleTag = (e) => {
    setTag(e.target.value)
    setSubmit(false)
  }

  const handleKeywords = (e) => {
    setKeywords(e.target.value)
    setSubmit(false)
  }

  const handleFeatureImage = (e) => {
    setFeaturedImage(e.target.value)
    setSubmit(false)
  }


  const handleDate = (e) => {
    setDate(e.target.value)
    setSubmit(false)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
    setSubmit(false)
  }

  const handleNote = (e) => {
    setNote(e.target.value)
    setSubmit(false)
  }



  const openProfilePopup = () => {
    setProfilePopupOpen(true);
  };

  const closeProfilePopup = () => {
    setProfilePopupOpen(false);
  };



  const openAddProduct = () => {
    setIsAddButtonOpen(true);
  };

  const closeAddProduct = () => {
    setIsAddButtonOpen(false);
  };

  const handleAddButtonSave = (productData) => {
    // Handle the product data here
    // You can format the product data as needed
    return `Product: ${productData.title}, <br> Description: ${productData.description}, <br> Link: ${productData.link}`;
    // setBody((prevBody) => `${prevBody}<br>${productInfo}`);
    closeAddProduct();
  };


  //function to reset after click on add page 
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

  // Add Page button click handler
  const handleAddPage = () => {
    setIsUpdating(!isUpdating); // Toggle isUpdating directly
    setHighestArticleId(highestarticleid + 1)
    resetForm(); // Reset the form
    const syntheticEvent = { preventDefault: () => { } }; // Create a synthetic event
    handleSubmit(syntheticEvent); // Submit the data
  };

  const addComponent = (type) => {
    switch (type) {
      case 'profile':
        setContentBlock([...contentBlock, saveProfile(name, bio)])
        // console.log(contentBlock)
        break;
      case 'product':
        break;
      case 'quill':
        setContentBlock([...contentBlock, quill()])
        // console.log(contentBlock)
        break
      default:
        return null;

    }
  }



  const saveProfile = (name, bio) => {
    const authorInfo = (
      <>
        <div
          style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            margin: '10px',
            boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)'
          }}
        >
          <div>
            <h3
              style={{
                color: ' #0AB5FF',
                fontSize: '1.2rem',
                fontWeight: 'bolder'
              }}
            >
              {name}
            </h3>
            <p>{bio}</p>
          </div>
        </div>

      </>
    );

    // Assuming setBody is used to update some state in your component
    setBody((prevBody) => `${prevBody}<br/>${renderToString(authorInfo)}`);
    console.log('body', body)
    return authorInfo;
  };

  const quill = () => {
    return (
      <>
        <div style={{ width: '1050px' }}>
          <ReactQuill
            // value={body}
            onChange={handleTextChange}
            placeholder="Enter your text here..."
            modules={TextEditorModules}
            formats={TextEditorFormats}
            style={{ height: '300px', marginBottom: '100px' }}
          />
        </div></>
    )
  }


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


  const [contentBlock, setContentBlock] = useState([]); // Example initial content


  const handleEdit = (e, index) => {
    const newContentBlock = [...contentBlock];
    newContentBlock[index] = e.target.textContent;
    setContentBlock(newContentBlock);
  };



  return (
    <DndProvider backend={HTML5Backend}>
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
          {/* back button will on home page */}
          <button className="back-button" onClick={() => (window.location.href = "/")}>Back</button>
          <button className="add-page-button" onClick={handleAddPage}>Add {findPostTypeNameById(postTypeData, parseInt(selectedPostType))}</button>
          <img src="/images/plus.svg" alt="" />
        </div>
        <div>
        </div>
        <div className="form-card">
          <div className="flex gap-between">
            <div className="flex child-margin">
              <p>Status</p>
              <StatusSelection
                selectedStatusId={statusId}
                onStatusChange={handleStatusChange}

              />
            </div>
          </div>

          <div className="flex">
            <p style={{ marginRight: '1rem' }}>Category</p>
            <CategoryDropdown onCategoryChange={handleCategoryChange} publicationValue={selectedPublication} />
          </div>
          <div className="flex">
            <p style={{ marginRight: '1rem' }}>URL</p>
            <div className="url-section">
              /{category_url}/
              <span>
                <input
                  type="text"
                  value={typedUrl}
                  onChange={handleUrl}
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
                onChange={handleSeoScore} // onChange for seoScore
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
              onChange={handleSeoTitle} // onChange for seoTitle
            />
          </div>

          <div className="flex">
            <textarea
              placeholder="Enter SEO Description"
              value={seoDescription}
              onChange={handleSeoDescription} // onChange for seoDescription
              rows="4"
              cols="10"
            />
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Tag"
              value={tag}
              onChange={handleTag} // onChange for tag
            />
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Keywords"
              value={keywords}
              onChange={handleKeywords} // onChange for keywords
            />
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Featured Image"
              value={featuredImage}
              onChange={handleFeatureImage} // onChange for featuredImage
            />
          </div>

          <div className="flex">
            <p style={{ marginRight: '5rem' }}>Author</p>

            <AuthorDropdown onAuthorChange={handleAuthorChange} publicationValue={selectedPublication} />
          </div>

          <div className="flex">
            <p style={{ marginRight: '5rem' }}>Date</p>
            <input
              type="datetime-local"
              placeholder="Date"
              value={date}
              onChange={handleDate} // onChange for date
              style={{ width: '200px' }}
            />
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitle} // onChange for title
              rows="20"
              cols=""
            />
          </div>

          <button onClick={openProfilePopup} className="open-profile-button">Add Author</button>
          <ProfilePopup
            isOpen={isProfilePopupOpen}
            onClose={closeProfilePopup}
            onSave={() => addComponent('profile')}
            setBio={setBio}
            setName={setName}
            name={name}
            bio={bio}
          />


          <button className="open-profile-button" onClick={openAddProduct}>Add Product</button>
          {isAddButtonOpen && (
            <AddProduct isOpen={isAddButtonOpen}
              onClose={closeAddProduct}
              onSave={handleAddButtonSave} />
          )}
          <button className="open-profile-button" onClick={() => addComponent('quill')}>Add Content</button>



          {contentBlock.map((content, index) => (
        <div
          key={index}
          contentEditable
          onBlur={(e) => handleEdit(e, index)}
          suppressContentEditableWarning={true}
        >
          {content}
        </div>
      ))}


          <DragDrop Items={ItemsObj} setBody={setBody} body={body} setItems={setItems} />

          <div className="flex">
            <textarea
              placeholder="Note"
              value={note}
              onChange={handleNote} // onChange for note
              rows="4"
            />
          </div>

          <form action="" >
            <div className="button-div">
              <button className="button-light btn" type="button" onClick={resetForm}>
                Delete
              </button>
              <button
                className={`${submit ? 'button-grey' : 'button-blue'}`}
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <aside>
          {Items.map((item) => (

            item.type === 'card2' ?

              (
                <Card2 info={item.info} id={item.id} key={item.id} />
              ) :

              item.type == 'card' ? (
                <Card info={item.info} id={item.id} key={item.id} />
              )
                : <QuillCard info={item.info} id={item.id} key={item.id} />


            // <Card info={item.info} id={item.id} key={item.id} />
          ))}
        </aside>
      </div>
    </DndProvider>
  );
}

export default FormPage;
