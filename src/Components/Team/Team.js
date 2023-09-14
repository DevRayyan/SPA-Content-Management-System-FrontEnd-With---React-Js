import React, { useLayoutEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TeamCard from './TeamCard'
export default function Team() {
  const [Team, setTeam] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
const SkBgColor = getComputedStyle(document.body).getPropertyValue(
  "--skeleten-base-clr"
);
const SkhighlightColor = getComputedStyle(document.body).getPropertyValue(
  "--skeleten-highlight-clr"
);

useLayoutEffect(() => {
  FetchReview()
}, []);
async function FetchReview(){
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
      setTeam(Data.data);
      
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (

    <div className='team_wrapper'>
      <div className='team_container_head'>
        <h2>Meet our team of <span>creators</span>, designers, and world-class problem <span> solvers</span></h2>
        <p>Dont miss my friends.</p>

        <div className='spider_web_arrow'>
          <div className='indicate_arrow'>
            <svg viewBox="0 0 100 100">
              <path d="M20 30 Q40 30, 30 55 T89 50 M90 46 L95 48 L90 53" stroke-width="1" fill="none" />
            </svg>
          </div>
        </div>
      </div>
            <div className='team_container'>
  {IsLoading ? 
    [...Array(4)].map((_, i) => (
      <SkeletonTheme key={i}
      baseColor={SkBgColor}
      highlightColor={SkhighlightColor}
    >
      <div className="testimonial-card">
        <div className="intro">
          <Skeleton width={40} borderRadius={10} height={40} />
          <div style={{ marginLeft: 10 }}>
            <h3>{<Skeleton width={150} />}</h3>
            <small>{<Skeleton width={100} />}</small>
          </div>
        </div>
        <p>{<Skeleton count={3} />}</p>
        <div className="date">
          <span>{<Skeleton width={"25%"} />}</span>
        </div>
      </div>
    </SkeletonTheme>
    ))
    : (
      Team && Team.map((member, i) => (
        <TeamCard
          key={i}
          data={member}
        />
      ))
    )
  }
</div>

    </div>
  )
}
