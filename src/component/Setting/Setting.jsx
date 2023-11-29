import React from 'react'
import "./style.css"
import Author from './Author'
import x from "./images/x.png"
// import Profile from './Profile'
// import Publication from './Publication'

function Setting() {
    return (
        <div className="container author-page">
            <div className="selectors setting-page-selector">
                <div className="flex">
                    <select name="" id="website-selector">
                        <option value="">Passiveday</option>
                    </select>
                    <img src="images/arrow-down.png" alt="" />
                </div>

                <div className="buttons-others flex">
                    <p className="draft">Publication</p>
                    <p className="draft selected-item">Author</p>
                    <p className="draft">Profile</p>
                </div>
                <div className="key setting" onClick={() => window.history.back()}>
                    <p>Close</p>
                    <img src={x} alt="" />
                </div>

            </div>

            <Author />
            {/* <h1>Profile</h1>
        <Profile/>
        <h3>publication</h3>
        <Publication/> */}


        </div>

    )
}

export default Setting