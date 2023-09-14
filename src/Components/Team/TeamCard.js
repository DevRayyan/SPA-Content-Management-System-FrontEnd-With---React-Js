import React from 'react'
export default function TeamCard(props) {
    return (
        <div className='team_box'>
            <div className='team_img'>
                <img src={`http://localhost:8000${props.data.image}`} alt="" />
            </div>
            <div className='team_content'>
                <h3>{props.data.name}</h3>
                <p>{props.data.occupation}</p>
                <a href={props.data.link}>Portfolio</a>
            </div>
        </div>
    )
}
