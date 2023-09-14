import React, { useLayoutEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import FilterDropdown from "../Assets/FilterDropdown";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Category() {
  const [Category, setCategory] = useState("");
  const SkBgColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-base-clr"
  );
  const SkhighlightColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-highlight-clr"
  );

  const [IsLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    FetchCategory();
  }, []);
  async function FetchCategory() {
    setIsLoading(true);
    await fetch("http://localhost:8000/api/category", {
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
        setCategory(Data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div className="carousel-wrapper">
        <div className="review-contact-head">
          <h1>All Categories</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            iusto?
          </p>
        </div>
        <div className="filter-topbar">
          <div className="filter-topbar-head">All Filters</div>
          <div className="filter-dropdowns">
            <FilterDropdown
              List={Category["parent category"]}
              column="parent_cat_name"
              btnIcon="fa-regular fa-list"
              Unique="parentcategory"
              btnTitle="Select Parent Category"
            />
            <FilterDropdown
              List={Category["sub category"]}
              Type={"checkbox"}
              IsCheck={true}
              column="category_title"
              btnIcon="fa-regular fa-list"
              Unique="subcategory"
              btnTitle="Select Sub Category"
            />
          </div>
        </div>
        <div className="card-carousel col-4">
          {IsLoading
            ? [...Array(8)].map((_, i) => (
                <SkeletonTheme
                  key={i}
                  baseColor={SkBgColor}
                  highlightColor={SkhighlightColor}
                >
                  <div className="card">
                    <div className={`cat-icon`}>
                      <Skeleton width={50} borderRadius={10} height={50} />
                    </div>
                    <h3 className="cat-title">{<Skeleton width={"80%"} />}</h3>
                    <small className="pcat-title">
                      {<Skeleton width={"60%"} />}
                    </small>
                    <p className="cat-desc">{<Skeleton count={2} />}</p>
                  </div>
                </SkeletonTheme>
              ))
            : Category &&
              Category["sub category"].map((subCat, i) => {
                const GetPCategory = Category["parent category"].find(
                  (pcat) => {
                    return pcat.parent_cat_id == subCat["parent_cat_id"];
                  }
                )["parent_cat_name"];
                return (
                  <CategoryCard
                    ParentCategory={GetPCategory}
                    key={subCat["id"]}
                    icon={subCat["category_icon"]}
                    title={subCat["category_title"]}
                    desc={subCat["category_desc"]}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}
