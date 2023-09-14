import React, { useLayoutEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function AdminBanner() {
  const [TeamBnr, setTeamBnr] = useState("");
  const SkBgColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-base-clr"
  );
  const SkhighlightColor = getComputedStyle(document.body).getPropertyValue(
    "--skeleten-highlight-clr"
  );
  const [IsLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    FetchTeamImg();
  }, []);
  async function FetchTeamImg() {
    setIsLoading(true);
    await fetch("http://localhost:8000/api/fetch-team", {
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
        setTeamBnr(Data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div className="main-admin-intro-banner">
        <div className="m-a-i-b-wrapper">
          <div className="admin-cover-grid">
            {IsLoading ? (
              <SkeletonTheme
                baseColor={SkBgColor}
                highlightColor={SkhighlightColor}
              >
                <Skeleton
                  style={{ transform: "rotate(45deg)" }}
                  borderRadius={"25%"}
                  width={50}
                  height={50}
                />
                <Skeleton
                  style={{ transform: "rotate(45deg)" }}
                  borderRadius={"25%"}
                  width={75}
                  height={75}
                />
                <Skeleton
                  style={{ transform: "rotate(45deg)" }}
                  borderRadius={"25%"}
                  width={100}
                  height={100}
                />
                <Skeleton
                  style={{ transform: "rotate(45deg)" }}
                  borderRadius={"25%"}
                  width={75}
                  height={75}
                />
                <Skeleton
                  style={{ transform: "rotate(45deg)" }}
                  borderRadius={"25%"}
                  width={50}
                  height={50}
                />
              </SkeletonTheme>
            ) : (
              TeamBnr &&
              TeamBnr.map((mbr, i) => {
                if (i < 5) {
                  return <div key={i} className="admin-cover"><img src={`http://localhost:8000${mbr.image}`} alt="" /></div>;
                }
              })
            )}
          </div>
          <div className="m-a-i-b-para">
            Over 300+ Developers are Contributer's achieved
          </div>
          <div className="m-a-i-b-text">
            The best Professionate Website Developers & Designers are here to
            fulfill your recommendation.
          </div>
        </div>
      </div>
    </>
  );
}
