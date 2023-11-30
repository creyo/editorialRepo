import React from 'react';
import AuthorPic from "./images/author.png"
import trash from "./images/trash-2.png"
import plusGreenIcon from "./images/plus-green.png"
import './style.css'; // Make sure to import your CSS file

function Author() {
    return (

        <>
            <div className="settings-form author-page-form">
                <img src={AuthorPic} alt="" />
                <form action="">
                    <div>
                        <label htmlFor="">Author Name</label>
                        <input type="text" placeholder="Zubia Shahid" />
                    </div>
                    <div className="text-area-div">
                        <label htmlFor="">Author Bio</label>
                        <textarea type="text" placeholder="Zubia is an accomplished..." />
                    </div>
                    <button className="btn">Submit</button>
                </form>
            </div>

            <div className="list-div">
                <h1>Author List (3)</h1>

                <table className="list-table">
                    <thead>
                        <tr>
                            <th>
                                <div className="checkbox-flex">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" checked="checked" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <p className="small-text">Select All</p>
                                    <img src={trash} alt="" />
                                </div>
                            </th>
                            <th className="hidden"><h2>Image</h2></th>
                            <th><h2>Author Name</h2></th>
                            <th><h2>Items</h2></th>
                            <th><h2>Bio</h2></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="checkbox-flex">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" checked="checked" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <p>A01</p>
                                </div>
                            </td>
                            <td><img src={AuthorPic} alt="author" /></td>
                            <td><p>Shahid Zubiya</p></td>
                            <td><p>11</p></td>
                            <td><p>Zubia is an accomplished editorial writer and journalist with a passion for dissecting complex issues...</p></td>
                        </tr>
                        <tr>
                            <td>
                                <div className="checkbox-flex">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" checked="checked" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <p>A01</p>
                                </div>
                            </td>
                            <td><img src={AuthorPic} alt="author" /></td>
                            <td><p>Shahid Zubiya</p></td>
                            <td><p>12</p></td>
                            <td><p>Zubia is an accomplished editorial writer and journalist with a passion for dissecting complex issues...</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="list-div">
                <h1>Appsala (3)</h1>

                <table className="list-table">
                    <thead>
                        <tr>
                            <th>
                                <div className="checkbox-flex">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" checked="checked" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <p className="small-text">Select All</p>
                                    <img src={trash} alt="" />
                                </div>
                            </th>
                            <th>
                                <div className="flex text-green">
                                    <img src={plusGreenIcon} alt="" />
                                    <p style={{ fontSize: "14px" }}>Add</p>
                                </div>
                            </th>
                            <th><h2>Author Name</h2></th>
                            <th><h2>Items</h2></th>
                            <th><h2>Bio</h2></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="checkbox-flex">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" checked="checked" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <p>A01</p>
                                </div>
                            </td>
                            <td><img src={AuthorPic} alt="author" /></td>
                            <td><p>Shahid Zubiya</p></td>
                            <td><p>11</p></td>
                            <td><p>Zubia is an accomplished editorial writer and journalist with a passion for dissecting complex issues...</p></td>
                        </tr>
                        <tr>
                            <td>
                                <div className="checkbox-flex">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" checked="checked" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <p>A01</p>
                                </div>
                            </td>
                            <td><img src={AuthorPic} alt="author" /></td>
                            <td><p>Shahid Zubiya</p></td>
                            <td><p>12</p></td>
                            <td><p>Zubia is an accomplished editorial writer and journalist with a passion for dissecting complex issues...</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="list-div">
                <h1>Brandemy (3)</h1>
            </div>
        </>


    );
}

export default Author;
