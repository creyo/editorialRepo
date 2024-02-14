import React, { useState } from 'react'
import "./style.css"
import Author from './Author'
import x from "./images/x.png"
import Profile from './Profile'
import Publication from './Publication'

function Setting() {

    const [selectedItem, setSelectedItem] = useState('Publication');

    const [publicationName, setPublicationName] = useState('');

    // Callback function to receive publication_name from Publication component
    const handlePublicationNameChange = (name) => {
      setPublicationName(name);
    };


    return (
        <div className="container author-page">
            <div className="selectors setting-page-selector">
                <div className="flex">
                    <select name="" id="website-selector">
                        <option value="">{publicationName}</option>
                    </select>
                    <img src="images/arrow-down.png" alt="" />
                </div>

                <div className="buttons-others flex">
                    <p
                        className={`draft ${selectedItem === 'Publication' ? 'selected-item' : ''}`}
                        onClick={() => setSelectedItem('Publication')}
                    >
                        Publication
                    </p>
                    <p
                        className={`draft ${selectedItem === 'Author' ? 'selected-item' : ''}`}
                        onClick={() => setSelectedItem('Author')}
                    >
                        Author
                    </p>
                    <p
                        className={`draft ${selectedItem === 'Profile' ? 'selected-item' : ''}`}
                        onClick={() => setSelectedItem('Profile')}
                    >
                        Profile
                    </p>
                </div>
                <div className="key setting" onClick={() => window.history.back()}>
                    <p>Close</p>
                    <img src={x} alt="" />
                </div>

            </div>

            {/* Conditionally render components based on selectedItem */}
            {selectedItem === 'Author' && <Author />}
            {selectedItem === 'Profile' && <Profile />}
            {selectedItem === 'Publication' &&<Publication onPublicationNameChange={handlePublicationNameChange} />}

        </div>
    );
}

export default Setting;