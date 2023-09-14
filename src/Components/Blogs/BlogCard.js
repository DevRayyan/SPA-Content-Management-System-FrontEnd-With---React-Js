import React from "react";
import { format } from 'date-fns';
import { Link } from "react-router-dom";

export default function BlogCard(props) {
  const  ImgLink = `http://localhost:8000${props.data.image}`;
  const tags = props.data.sub_category.split(",");
  const formattedDate = format(new Date(props.data.created_at), 'dd MMMM, yyyy');

  return (
    <div className="card">
      <div className="hover-btns">
        <button>
          <i className="fa-light fa-house"></i>
        </button>
        <button>
          <i className="fa-light fa-heart"></i>
        </button>
      </div>
      <div className="card-img">
        <img src={ImgLink} alt="" />
{
  props.data.plan == true ?
        <div className="pro-access-tag">
          <i className="fa-solid fa-gem"></i>
          <span>Pro Essential</span>
        </div>
:""
}
      </div>
      <div className="card-content">
        <h3>{props.data.title}</h3>
        <p>{props.data.description.slice(0,30)}...</p>
        <div className="tags">
          {
            tags.map((tag,i)=>{
             return <span key={i}>{tag}</span>
            })
          }
        </div>
        <div className="card-btns">
          <div>
        <div className="post_reads"><i className="fa-regular fa-eye"></i> 12k Reads</div>
            <span>{formattedDate}</span>
          </div>
          <div>
            <Link to={`/browse/details/${props.data.id}`} >Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
