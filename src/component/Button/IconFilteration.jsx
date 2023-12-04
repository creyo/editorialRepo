// IconFilteration.js

import React from 'react';
import mystery from '../images/mystery.png';
import refresh from '../images/refresh-ccw.png';
import images from '../images/imagesmode.png';
import description from '../images/description.png';
import "../../component/FrontPage.css";

const IconFilteration = ({ activeIcon, setActiveIcon }) => {

  const handleIconClick = (iconType) => {
    // Update the parent component state
    if (activeIcon === iconType) {
      // If the clicked icon is already active, unselect it (set to null)
      setActiveIcon(null);
    } else {
      // If the clicked icon is not active, update the state with the clicked icon
      setActiveIcon(iconType);
    }
  };

  return (
    <div className="icons-flex">
      <img
        className={activeIcon === 'proof' ? 'icon active' : 'icon'}
        src={mystery}
        alt=""
        onClick={() => handleIconClick('proof')}
      />
      <img
        className={activeIcon === 'update' ? 'icon active' : 'icon'}
        src={refresh}
        alt=""
        onClick={() => handleIconClick('update')}
      />
      <img
        className={activeIcon === 'image' ? 'icon active' : 'icon'}
        src={images}
        alt=""
        onClick={() => handleIconClick('image')}
      />
      <img
        className={activeIcon === 'note' ? 'icon active' : 'icon'}
        src={description}
        alt=""
        onClick={() => handleIconClick('note')}
      />
      <p className={`icon ${activeIcon === 'seo' ? 'active' : ''}`} onClick={() => handleIconClick('seo')}>
        SEO {(activeIcon === 'seo') !== null}
      </p>
    </div>
  );
}

export default IconFilteration;
