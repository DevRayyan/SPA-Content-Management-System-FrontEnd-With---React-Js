import React from "react";



export default function CategoryCard(props) {
  
const Icon =  props.icon.split(",");
  return (
    <div className="card">
      <div style={{background:Icon[0]}} className={`cat-icon`}>
        <i style={{color:Icon[2]}} className={Icon[1] }></i>
      </div>
      <h3 className="cat-title">{props.title}</h3>
      <small className="pcat-title">{props.ParentCategory}</small>
      <p className="cat-desc">{props.desc}</p>
      <a className="cat-btn">
        <i className="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  );
}
