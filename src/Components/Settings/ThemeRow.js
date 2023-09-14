import React, { useEffect } from 'react'
import DarkThemeImage from "../../images/DarkThemeIcon.png";
import LightThemeIcon from "../../images/LightThemeIcon.png";

export default function ThemeRow(props) {
    const getTheme = localStorage.getItem("theme_mode");

    useEffect(() => {
        document.body.classList.add(getTheme);
        SwitchTheme();
    }, [getTheme]);

    const SwitchTheme = () => {
        const themes = document.querySelectorAll(".theme_container .custom_box");
        themes.forEach((theme) => {

            theme.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                document.body.classList.remove(mode === "dark" ? "light" : "dark");
                localStorage.setItem("theme_mode", mode);
                document.body.classList.add(mode);
                if (mode === "dark") {
                    props.themeProps.ShowToast(
                        "fa-moon-cloud igray",
                        "Dark Mode Enabled",
                        "The dark mode has been successfully turned on."
                    )
                } else if (mode === "light") {
                    props.themeProps.ShowToast(
                        "fa-sun iorange",
                        "Light Mode Enabled",
                        "The light mode has been successfully turned on."
                    )

                }
                updateTheme();
            })
        })
    }

    const updateTheme = () => {
        const themes = document.querySelectorAll(".theme_container .custom_box");
        const currentTheme = localStorage.getItem("theme_mode");
        themes.forEach((theme) => {
            const mode = theme.dataset.mode;
            if (mode === currentTheme) {
                theme.classList.add("active");
            } else {
                theme.classList.remove("active");
            }
        });
    }
    return (
        <>
            <p className='one_line_para'>Tailor this website to your preferences by adding your personal touch.</p>
            <div className='appearance_container theme_container'>
                <div>
                    <button data-mode="dark" className={`custom_box ${getTheme === "dark" ? "active" : ""}`}>
                        <img src={DarkThemeImage} alt="" />
                        <div className='select_custom_switch'>
                            <label htmlFor='select_theme1'><i className='fa-solid fa-check'></i></label>
                            <input id='select_theme1' type="radio" />
                        </div>
                    </button>
                    <div className='custom_box_title'>Nightfall</div>
                </div>
                <div>
                    <button data-mode="light" className={`custom_box ${getTheme === "light" ? "active" : ""}`}>
                        <img src={LightThemeIcon} alt="" />
                        <div className='select_custom_switch'>
                            <label htmlFor='select_theme2'><i className='fa-solid fa-check'></i></label>
                            <input id='select_theme2' type="radio" />
                        </div>
                    </button>
                    <div className='custom_box_title'>Sunrise</div>
                </div>
            </div></>
    )
}
