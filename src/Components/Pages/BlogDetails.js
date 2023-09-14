import { format } from "date-fns";
import React, { useLayoutEffect, useState } from "react";
import PostCover from "../../images/browseBanner.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Assets/Loader";
export default function BlogDetails(props) {
  const params = useParams();
  const Navigate = useNavigate();
  const [GetPost, setGetPost] = useState("");
  const SkBgColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-base-clr"
  );
  const SkhighlightColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-highlight-clr"
  );
  const [IsLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    const getToken = localStorage.getItem("token");

    if (getToken) {
      GetPostData();
    } else {
      props.ShowToast(
        "fa-solid fa-circle-xmark ired",
        "Login Required",
        "For article details you can login your account."
      );
      Navigate("/login", { replace: true });
    }
  }, []);

  async function GetPostData() {
    setIsLoading(true);
    await fetch("http://localhost:8000/api/get-post-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: params.query }),
    })
      .then((Response) => {
        return Response.json();
      })
      .then((Data) => {
        console.log(Data);
        setIsLoading(false);
        if (!Data.success) {
          if (Data.msg == "no entry") {
            props.ShowToast(
              "fa-solid fa-circle-xmark ired",
              "Premium Plan Required",
              "This is premium blog."
            );
            Navigate("/plans",{replace:true});
          }
        }
        if (Data.data[0]) {
          setGetPost(Data.data[0]);
        }
        if (Data.data == 0) {
          alert("empty");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      {IsLoading ? (
        <Loading />
      ) : (
        <div className="post_details_portion">
          <div className="breadcrumb">
            <div></div>
            Article <span className="line"></span>
            <div className="posted_date">
              Posted{" "}
              {GetPost && format(new Date(GetPost.created_at), "dd MMMM, yyyy")}
            </div>
          </div>
          <div className="post_details_col-2">
            <div className="col-1">
              <div>
                <div className="post_cover">
                  {GetPost && (
                    <img src={`http://localhost:8000${GetPost.image}`} alt="" />
                  )}
                </div>
                <div className="post_title">
                  <h1>{GetPost && GetPost.title}</h1>
                </div>
                <div className="post_desc">{GetPost.description}</div>
              </div>

              {/* <div className="conversation_container">
                <div className="title">Start Conversation</div>
                <div className="comment_container">
                  <div className="comment_box">
                    <div className="user_cover">
                      <img src={PostCover} alt="" />
                    </div>
                    <div className="search_box">
                      <input type="text" placeholder="What's on your mind?" />
                    </div>
                    <button>
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                  <div className="comments">
                    <div className="comment_heading">Comments</div>
                    <div className="comment">
                      <div className="comment_intro">
                        <div className="commented_user_cover">
                          <img src={PostCover} alt="" />
                        </div>

                        <div className="comment_para">
                          <div className="">
                            <span className="user_name">Rayyan Ali Khan </span>
                            <span className="date">01 January 2022</span>
                          </div>
                          <p>
                            {" "}
                            sdfjh df jd fhj dh jd jh dh jd jh dhjdh dhgk dhgk
                            dgh kdghksdfjh df jd fhj dh jd jh dh jd jh dhjdh
                            dhgk dhgk dgh kdghk sdfjh df jd fhj dh jd jh dh jd
                            jh dhjdh dhgk dhgk dgh kdghksdfjh df jd fhj dh jd jh
                            dh jd jh dhjdh dhgk dhgk dgh kdghksdfjh df jd fhj dh
                            jd jh dh jd jh dhjdh dhgk dhgk dgh kdghksdfjh df jd
                            fhj dh jd jh dh jd jh dhjdh dhgk dhgk dgh kdghk
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="comment">
                      <div className="comment_intro">
                        <div className="commented_user_cover">
                          <img src={PostCover} alt="" />
                        </div>

                        <div className="comment_para">
                          <div className="">
                            <span className="user_name">Rayyan Ali Khan </span>
                            <span className="date">01 January 2022</span>
                          </div>
                          <p>
                            {" "}
                            sdfjh df jd fhj dh jd jh dh jd jh dhjdh dhgk dhgk
                            dgh kdghksdfjh df jd fhj dh jd jh dh jd jh dhjdh
                            dhgk dhgk dgh kdghk sdfjh df jd fhj dh jd jh dh jd
                            jh dhjdh dhgk dhgk dgh kdghksdfjh df jd fhj dh jd jh
                            dh jd jh dhjdh dhgk dhgk dgh kdghksdfjh df jd fhj dh
                            jd jh dh jd jh dhjdh dhgk dhgk dgh kdghksdfjh df jd
                            fhj dh jd jh dh jd jh dhjdh dhgk dhgk dgh kdghk
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="comment">
                      <div className="comment_intro">
                        <div className="commented_user_cover">
                          <img src={PostCover} alt="" />
                        </div>

                        <div className="comment_para">
                          <div className="">
                            <span className="user_name">Rayyan Ali Khan </span>
                            <span className="date">01 January 2022</span>
                          </div>
                          <p>
                            {" "}
                            sdfjh df jd fhj dh jd jh dh jd jh dhjdh dhgk dhgk
                            dgh kdghksdfjh df jd fhj dh jd jh dh jd jh dhjdh
                            dhgk dhgk dgh kdghk sdfjh df jd fhj dh jd jh dh jd
                            jh dhjdh dhgk dhgk dgh kdghksdfjh df jd fhj dh jd jh
                            dh jd jh dhjdh dhgk dhgk dgh kdghksdfjh df jd fhj dh
                            jd jh dh jd jh dhjdh dhgk dhgk dgh kdghksdfjh df jd
                            fhj dh jd jh dh jd jh dhjdh dhgk dhgk dgh kdghk
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="comment">
                      <div className="comment_intro">
                        <div className="commented_user_cover">
                          <img src={PostCover} alt="" />
                        </div>

                        <div className="comment_para">
                          <div className="">
                            <span className="user_name">Rayyan Ali Khan </span>
                            <span className="date">01 January 2022</span>
                          </div>
                          <p>
                            {" "}
                            sdfjh df jd fhj dh jd jh dh jd jh dhjdh dhgk dhgk
                            dgh kdghksdfjh df jd fhj dh jd jh dh jd jh dhjdh
                            dhgk dhgk dgh kdghk sdfjh df jd fhj dh jd jh dh jd
                            jh dhjdh dhgk dhgk dgh kdghksdfjh df jd fhj dh jd jh
                            dh jd jh dhjdh dhgk dhgk dgh kdghksdfjh df jd fhj dh
                            jd jh dh jd jh dhjdh dhgk dhgk dgh kdghksdfjh df jd
                            fhj dh jd jh dh jd jh dhjdh dhgk dhgk dgh kdghk
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="col-2">
              <div className="related-post scrollbar">
                <div className="related-head">Related Articles</div>
                <ul className="related-post-list">
                  <li>
                    <a href="#">Related Articles</a>
                    <a className="btn">
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">Related Articles</a>
                    <a className="btn">
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">Related Articles</a>
                    <a className="btn">
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">Related Articles</a>
                    <a className="btn">
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">Related Articles</a>
                    <a className="btn">
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">Related Articles</a>
                    <a className="btn">
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">Related Articles</a>
                    <a className="btn">
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">Related Articles</a>
                    <a className="btn">
                      <i className="fa-regular fa-arrow-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="related-category">
                <div className="related-head">Related Categories</div>
                <ul className="related-post-list">
                  {GetPost &&
                    GetPost.sub_category.split(",").map((tag, i) => {
                      return (
                        <li key={i}>
                          <a
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                            href="#"
                          >
                            {tag}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
