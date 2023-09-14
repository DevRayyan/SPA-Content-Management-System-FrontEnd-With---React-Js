import React, { useEffect, useLayoutEffect, useState } from "react";
import BlogCard from "./BlogCard";
import PortionEnd from "../Assets/PortionEnd";
import PortionTop from "../Assets/PortionTop";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function BlogContainer() {
  const [Posts, setPosts] = useState("");
  const SkBgColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-base-clr"
  );
  const SkhighlightColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-highlight-clr"
  );

  const [IsLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    FetchPosts();
  }, []);
  async function FetchPosts() {
    setIsLoading(true);
    await fetch("http://localhost:8000/api/fetch-posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((Response) => {
        return Response.json();
      })
      .then((Data) => {
        setIsLoading(false);
        setPosts(Data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div className="cards-container">
        <PortionTop
          title={"Latest Articles"}
          btn_title={"browse all articles"}
          btn_url={"/browse"}
        />
        <div className="post-grid">
          {IsLoading
             ?
             <SkeletonTheme
                  baseColor={SkBgColor}
                  highlightColor={SkhighlightColor}
                >
           {  [...Array(8)].map((_, i) => (
                  <div                   key={i}
                  className="card">
                    <div style={{background:SkBgColor}} className="card-img">
                    </div>
                    <div className="card-content">
                      <h2 style={{marginBottom:10}}>{<Skeleton />}</h2>
                      {<Skeleton width={"100%"}/>}
                      {<Skeleton width={"75%"}/>}
                      <div style={{margin:"10px 0 20px 0"}}>
                      {<Skeleton style={{marginRight:5}} width={50}  inline={true} count={4} />}
                        
                        
                      </div>
                      <div className="card-btns">
                        <div>
                          <span style={{marginTop:"10px"}}>{<Skeleton width={"100%"} />}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                 
              ))}
                </SkeletonTheme>
            : Posts &&
              Posts.map((post, i) => {
                if (i < 8) {
                  return <BlogCard data={post} key={i} />;
                }
              })}
        </div>
        <PortionEnd title="Load More Articles" />
      </div>
    </>
  );
}
