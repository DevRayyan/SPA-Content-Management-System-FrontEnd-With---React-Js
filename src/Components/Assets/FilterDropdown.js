import React, { useEffect, useState } from 'react'

export default function FilterDropdown(props) {
  const [isOpen, setIsOpen] = useState(false)

  function handleDropdown() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, [])

  function handleClickOutside(e) {
    const dropdownBtn = document.querySelector(`.dropdown-btn-${props.Unique}`);
    const dropdownList = document.querySelector(`.dropdown-list-${props.Unique}`);
    if (dropdownBtn && !dropdownBtn.contains(e.target) && dropdownList && !dropdownList.contains(e.target)) {
      setIsOpen(false);
    }
  }
  const list = document.getElementById(`${props.Unique}`);

  const searchItems = (key) => {
    const filteredList = props.List.filter(item => item.value.toLowerCase().indexOf(key) !== -1);
    const itemsHTML = filteredList.map((item, i) => `<li key=${i}>  ${props.IsCheck && `<div className="checkbox-container">
    <input id=${item.id} type=${props.Unique !== "two" ? "checkbox" : "radio"} style= "display: ${props.IsCheck ? "block" : "none"}" /><span className="checkmark"></span></div>`}<label for=${item.id}>${item.value}</label></li>`).join('');
    list.innerHTML = itemsHTML;
  }

  return (
    <div className={`dropdown-wrapper dropdown-${props.Unique}`}>
      <button type='button' className={`dropdown-btn dropdown-btn-${props.Unique}`} onClick={handleDropdown}>
        <div className='dropdown-icon-title'><i className={`${props.btnIcon}`}></i> <span>{props.btnTitle}</span></div>
        <div><i className={`fa-solid fa-angle-down ${isOpen ? "rotate-90" : ""}`}></i></div>
      </button>
      <div className={`dropdown-list dropdown-list-${props.Unique} ${isOpen ? "active" : ""}`}>
        {props.Search && <div className='dropdown-search'>
          <input type="text" onKeyUp={(e) => { return searchItems(e.target.value) }} id='searchItems' placeholder='Search Tags' />
          <span><i className='fa-regular fa-magnifying-glass'></i></span>
        </div>}

        <ul id={props.Unique}>
          {
            props.List.map((item, i) => {
              return <li key={i}>
                {props.IsCheck && <div className="checkbox-container">
                  <input id={i} type={props.Type} style={{ display: `${props.IsCheck ? "block" : "none"}` }} />
                  <span className="checkmark"></span>
                </div>
                }
                <label htmlFor={i}>{item[props.column]}</label></li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
FilterDropdown.defaultProps = {
  List: [],
  Search: false,
  IsCheck: false,
  btnTitle: "Select",
  btnIcon: "",
  Type:"hidden"
}