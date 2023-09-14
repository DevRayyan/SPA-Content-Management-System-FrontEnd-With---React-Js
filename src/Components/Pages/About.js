import React from 'react'
import aboutBanner from "../../images/DarkThemeIcon.png";
export default function About() {
    return (
        <div className='about-wapper'>
            <div className='about-section'>
                <img src={aboutBanner} alt="" />
            </div>
            <div className='about-section'>
                <div className='about-section-left'>
                    <h2>Web developers are the builders of the <span>digital world</span>,</h2>
                    <p>Web developers are the creators of websites and web applications that power the internet, using programming languages and tools to design and maintain digital platforms that shape our online experiences.</p>
                </div>
                <div className='about-section-right start'>
                    <img src={aboutBanner} alt="" />

                </div>
            </div>
            <hr class="dashed"/>
            <div className='about-section'>
                <div className='about-section-right end'>
                    <img src={aboutBanner} alt="" />
                </div>
                <div className='about-section-left'>
                    <h2>Creating the foundation for endless <span>possibilities</span> and <span>innovations</span>.</h2>
                    <p> We Build Bridge Between Advanced Technologies and Developers We Build Bridge Between Advs</p>
                </div>
            </div>
            <hr class="dashed"/>
            <div className='about-section'>
                <div className='about-section-left'>
                    <h2>Web developers are the <span>builders</span> of the digital world,</h2>
                    <p>Web developers are the creators of websites and web applications that power the internet, using programming languages and tools to design and maintain digital platforms that shape our online experiences.</p>
                </div>
                <div className='about-section-right start'>
                    <img src={aboutBanner} alt="" />

                </div>
            </div>
            <hr class="dashed"/>
            <div className='about-section'>
                <div className='about-section-right end'>
                    <img src={aboutBanner} alt="" />
                </div>
                <div className='about-section-left '>
                    <h2>Creating the foundation for endless <span>possibilities</span> and <span>innovations</span>.</h2>
                    <p> We Build Bridge Between Advanced Technologies and Developers We Build Bridge Between Advs</p>
                </div>
            </div>
        </div>
    )
}
