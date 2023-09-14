import React, { useLayoutEffect } from 'react'
import SansitaFontImg from "../../images/SansitaFontImg.jpg";
import RobotoFontImg from "../../images/RobotoFontImg.jpg";

export default function FontRow(props) {
    const getFont = localStorage.getItem("font_mode");

    useLayoutEffect(() => {
        document.body.classList.add(getFont);
        SwitchFont();
    }, [getFont]);

    const SwitchFont = () => {
        const fonts = document.querySelectorAll(".font_container .custom_box");
        fonts.forEach((font) => {
            font.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                document.body.classList.remove(mode === "roboto" ? "sansita" : "roboto");
                localStorage.setItem("font_mode", mode);
                document.body.classList.add(mode);
                if (mode === "roboto") {
                    props.fontProps.ShowToast(
                        "fa-font-case iblue",
                        "Font style changes to Roboto",
                        "The dark mode has been successfully turned on."
                    )
                } else if (mode === "sansita") {
                    props.fontProps.ShowToast(
                        "fa-font-case ired",
                        "Font style changes to Sansita",
                        "The light mode has been successfully turned on."
                    )

                }
                updateFont();
            })
        })
    }

    const updateFont = () => {
        const fonts = document.querySelectorAll(".font_container .custom_box");
        const currentfont = localStorage.getItem("font_mode");
        fonts.forEach((font) => {
            const mode = font.dataset.mode;
            if (mode === currentfont) {
                font.classList.add("active");
            } else {
                font.classList.remove("active");
            }
        });
    }
    return (
        <>
            <p className='one_line_para'>Customize your font style.</p>
            <div className='appearance_container font_container'>
                <div>
                    <button data-mode="roboto" className={`custom_box ${getFont === "roboto" ? "active" : ""}`}>
                        <img src={RobotoFontImg} alt="" />
                        <div className='select_custom_switch'>
                            <label htmlFor='select_theme1'><i className='fa-solid fa-check'></i></label>
                            <input id='select_theme1' type="radio" />
                        </div>
                    </button>
                    <div className='custom_box_title'>Roboto <span>sans serif</span></div>
                </div>
                <div>
                    <button data-mode="sansita" className={`custom_box ${getFont === "sansita" ? "active" : ""}`}>
                        <img src={SansitaFontImg} alt="" />
                        <div className='select_custom_switch'>
                            <label htmlFor='select_theme2'><i className='fa-solid fa-check'></i></label>
                            <input id='select_theme2' type="radio" />
                        </div>
                    </button>
                    <div className='custom_box_title'>Sansita <span>sans serif</span></div>
                </div>
            </div>
        </>
    )
}
