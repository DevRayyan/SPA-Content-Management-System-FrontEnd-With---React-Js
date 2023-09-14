import React, { useLayoutEffect, useRef, useState } from "react";
import BlogCard from "../Blogs/BlogCard";
import FilterDropdown from "../Assets/FilterDropdown";
import noRecImg from "../../images/no-rec-found.png";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function BrowseBlogs() {
  const SkBgColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-base-clr"
  );
  const SkhighlightColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-highlight-clr"
  );
  const SearchRef = useRef(null);
  const [Data, setData] = useState("");
  const [Keyword, setKeyword] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [SearchParams, setSearchParams] = useSearchParams();
  useLayoutEffect(() => {
    if (SearchParams.get("q")) {
      setKeyword(SearchParams.get("q"));
      SearchRef.current.value = SearchParams.get("q");
    } else {
      SearchParams.set("q", "");
    }
    FetchData();
  }, [Keyword, SearchParams.get("page"), SearchParams.get("q")]);
  async function FetchData() {
    setIsLoading(true);
    
    await fetch(
      `http://localhost:8000/api/search-post?q=${SearchParams.get(
        "q"
      )}&page=${SearchParams.get("page")}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((Response) => {
        return Response.json();
      })
      .then((Data) => {
        setIsLoading(false);
        setData(Data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const planSort = [
    { id: "plan-0", value: "Both" },
    { id: "plan-1", value: "Free" },
    { id: "plan-2", value: "Pro Essential" },
  ];
  const assetsSort = [
    { id: "asset-0", value: "HTML 5" },
    { id: "asset-1", value: "CSS 3" },
    { id: "asset-2", value: "Javascript" },
    { id: "asset-3", value: "Jquery" },
    { id: "asset-4", value: "React Js" },
  ];
  const ItemsSort = [
    { id: "item-0", value: "Most Popular" },
    { id: "item-1", value: "Likes High to Low" },
    { id: "item-2", value: "Likes Low to High" },
  ];
  function HandleSearch(e) {
    e.preventDefault();
    setKeyword(SearchRef.current.value);
    setSearchParams({ q: SearchRef.current.value });

    SearchRef.current.blur();
  }
function ClearQuery(){
  SearchRef.current.value=""
}
  return (
    <>
      <div className="browse-cards-container">
        <div className="search-input-container">
          <div className="search-input-head">Browse Development Resources</div>
          <form onSubmit={HandleSearch}>
            <input type="text" ref={SearchRef} placeholder="Search..." />
            <button onClick={ClearQuery} type="button" className="search-bar-icons">
              <i className="fa-regular fa-xmark"></i>
            </button>
            <div className="search-bar-icons">
              <i className="fa-regular fa-magnifying-glass"></i>
            </div>
          </form>
        </div>
        <div className="browse_results">
          <h1>{Keyword}</h1>
          <p>
            Discover an Amazing & Inspiring Website Useful Components & <br />{" "}
            many more that you want.
          </p>
        </div>
        {/* <div className="filter-topbar">
          <div className="filter-topbar-head">All Filters</div>
          <div className="filter-dropdowns">
            <FilterDropdown
              List={assetsSort}
              btnIcon="fa-regular fa-tag"
              Unique="one"
              Type={"checkbox"}
              btnTitle="Select Assets"
              IsCheck={true}
              Search={true}
            />
            <FilterDropdown
              List={planSort}
              btnIcon="fa-regular fa-crown"
              Unique="two"
              Type={"radio"}
              btnTitle="Free/Pro"
              IsCheck={true}
            />

            <FilterDropdown
              List={planSort}
              btnIcon="fa-regular fa-list"
              Unique="four"
              btnTitle="Select Category"
            />
            <FilterDropdown
              List={ItemsSort}
              btnIcon="fa-regular fa-sort"
              Unique="three"
              btnTitle="Sorting Items"
            />
          </div>
        </div> */}
        {Data.total > 0 && SearchParams.get("q") && (
          <div style={{ padding: "0 clamp(18px,1.4vw,1.4vw)" }}>
            {IsLoading ? (
              <div
                style={{
                  width: "clamp(140px,13vw,13vw)",
                  height: "clamp(20px,1.8vw,1.8vw)",
                  background: "var(--cat-card)",
                }}
              ></div>
            ) : (
              <>
                <p
                  style={{
                    fontSize: "clamp(15px,1.25vw,1.25vw)",
                    color: "var(--icon-clr)",
                  }}
                >
                  Total Articles Found :&nbsp;
                  {Data.data && (Data.total == 1 || Data.total == 0)
                    ? Data.total
                    : Data.total}
                  
                </p>
              </>
            )}
          </div>
        )}
        {IsLoading ? (
          <div className="post-grid ">
            <SkeletonTheme
              baseColor={SkBgColor}
              highlightColor={SkhighlightColor}
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card">
                  <div
                    style={{ background: SkBgColor }}
                    className="card-img"
                  ></div>
                  <div className="card-content">
                    <h2 style={{ marginBottom: 10 }}>{<Skeleton />}</h2>
                    {<Skeleton width={"100%"} />}
                    {<Skeleton width={"75%"} />}
                    <div style={{ margin: "10px 0 20px 0" }}>
                      {
                        <Skeleton
                          style={{ marginRight: 5 }}
                          width={50}
                          inline={true}
                          count={4}
                        />
                      }
                    </div>
                    <div className="card-btns">
                      <div>
                        <span style={{ marginTop: "10px" }}>
                          {<Skeleton width={"100%"} />}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </SkeletonTheme>
            :
          </div>
        ) : (Data.total > 0) && (SearchParams.get("page") < Data.last_page )? (
          <div className="post-grid ">
            {Data.data &&
              Data.data.map((post, i) => {
                return <BlogCard key={i} data={post} />;
              })}
          </div>
        ) : (
          <div className="no-rec-found-display">
            <img src={noRecImg} alt="" />
            <h1>No Results Found</h1>
            <p>
              We couldn't find what you searched for. <br /> Try searching
              again.
            </p>
          </div>
        )}
{Data.last_page}
        {!IsLoading && Data.last_page != 1 && Data.last_page != 0 && (
          <div className="paginate-box">
            <div className="page-links">
              {
                <>
                  <div className="prev-link">
                    {Data.prev_page_url ? (
                      <Link
                        to={`http://localhost:3000/browse?q=${SearchParams.get(
                          "q"
                        )}&page=${parseInt(SearchParams.get("page")) - 1}`}
                      >
                        <i className="fa-solid fa-angle-left"></i>
                      </Link>
                    ) : (
                      <a style={{ cursor: "not-allowed" }}>
                        <i className="fa-solid fa-angle-left"></i>
                      </a>
                    )}
                  </div>
                  {[...Array(Data.last_page)].map((_, i) => {
                    if (Data.current_page == i + 1) {
                      return (
                        <div className="page-link">
                          <Link
                            style={{ cursor: "not-allowed" }}
                            to={`http://localhost:3000/browse?q=${SearchParams.get(
                              "q"
                            )}&page=${i + 1}`}
                            className="active"
                          >
                            {i + 1}
                          </Link>
                        </div>
                      );
                    } else {
                      return (
                        <div className="page-link">
                          <Link
                            to={`http://localhost:3000/browse?q=${SearchParams.get(
                              "q"
                            )}&page=${i + 1}`}
                          >
                            {i + 1}
                          </Link>{" "}
                        </div>
                      );
                    }
                  })}
                  <div className="next-link">
                    {Data.next_page_url ? (
                      <Link
                        to={`http://localhost:3000/browse?q=${SearchParams.get(
                          "q"
                        )}&page=${parseInt(SearchParams.get("page")) + 1}`}
                      >
                        <i className="fa-solid fa-angle-right"></i>
                      </Link>
                    ) : (
                      <a style={{ cursor: "not-allowed" }}>
                        <i className="fa-solid fa-angle-right"></i>
                      </a>
                    )}
                  </div>
                </>
              }
            </div>
          </div>
        )}
      </div>
    </>
  );
}
