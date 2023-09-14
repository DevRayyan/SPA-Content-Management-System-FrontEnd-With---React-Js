import React from 'react'
import PostCover from "../../images/browseBanner.jpg";

export default function Bookmark() {
    return (
        <div className='bookmark_page_container'>
            <div className='head'><i class="fa-regular fa-bookmark"></i>
            <div className='head_text'>
                <h1>Bookmarks</h1>
                <p>Your 20 choses articles are stored in the bookmark.</p>
            </div>
            </div>
            <div className='bookmark_grid'>
                <ul>
                    <li>
                        <div className="post_cover">
                            <img src={PostCover} alt="" />
                        </div>
                        <a href="#">
                            <div className='bookmark_post_title'>The transition property is used to add a smooth transition effect to the opacity change.</div>

                            <div className='bookmark_post_para'>The transition property is used to add a smooth transition effenge.</div>
                        </a>
                        <button><i className="fa-regular fa-xmark"></i></button>
                    </li>
                    <li>
                        <div className="post_cover">
                            <img src={PostCover} alt="" />
                        </div>
                        <a href="#">
                            <div className='bookmark_post_title'>The transition property is used to add a smooth transition effect to the opacity change.</div>

                            <div className='bookmark_post_para'>The transition property is used to add a smooth transition effenge.</div>
                        </a>
                        <button><i className="fa-regular fa-xmark"></i></button>
                    </li>
                    <li>
                        <div className="post_cover">
                            <img src={PostCover} alt="" />
                        </div>
                        <a href="#">
                            <div className='bookmark_post_title'>The transition property is used to add a smooth transition effect to the opacity change.</div>

                            <div className='bookmark_post_para'>The transition property is used to add a smooth transition effenge.</div>
                        </a>
                        <button><i className="fa-regular fa-xmark"></i></button>
                    </li>
                    <li>
                        <div className="post_cover">
                            <img src={PostCover} alt="" />
                        </div>
                        <a href="#">
                            <div className='bookmark_post_title'>The transition property is used to add a smooth transition effect to the opacity change.</div>

                            <div className='bookmark_post_para'>The transition property is used to add a smooth transition effenge.</div>
                        </a>
                        <button><i className="fa-regular fa-xmark"></i></button>
                    </li>
                    <li>
                        <div className="post_cover">
                            <img src={PostCover} alt="" />
                        </div>
                        <a href="#">
                            <div className='bookmark_post_title'>The transition property is used to add a smooth transition effect to the opacity change.</div>

                            <div className='bookmark_post_para'>The transition property is used to add a smooth transition effenge.</div>
                        </a>
                        <button><i className="fa-regular fa-xmark"></i></button>
                    </li>
                    <li>
                        <div className="post_cover">
                            <img src={PostCover} alt="" />
                        </div>
                        <a href="#">
                            <div className='bookmark_post_title'>The transition property is used to add a smooth transition effect to the opacity change.</div>

                            <div className='bookmark_post_para'>The transition property is used to add a smooth transition effenge.</div>
                        </a>
                        <button><i className="fa-regular fa-xmark"></i></button>
                    </li>
           
                 

                </ul>
            </div>
        </div>
    )
}
