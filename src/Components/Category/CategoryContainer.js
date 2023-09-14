import React, { useLayoutEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import PortionTop from "../Assets/PortionTop";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function CategoryContainer() {
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
        setCategory(Data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div className="carousel-wrapper">
        <PortionTop
          title={"Navigate By Categories"}
          btn_title={"See all categories"}
          btn_url={"/category"}
        />
        <div className="card-carousel">
          {IsLoading
            ? [...Array(6)].map((_, i) => (
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
              Category["sub category"].slice(0, 6).map((subCat, i) => {
                const GetPCategory = Category["parent category"].find(
                  (pcat) => {
                    return pcat.parent_cat_id == subCat["parent_cat_id"];
                  }
                )["parent_cat_name"];
                return (
                  <CategoryCard
                    Isload={IsLoading}
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
