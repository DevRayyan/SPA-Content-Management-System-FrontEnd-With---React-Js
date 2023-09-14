import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Plan({Btn=true,GetPlan="free"}) {
   const CurrPlan =  localStorage.getItem("status");
  return (
    <div class="pricing-card">
    <div class="pricing-top-section">
        <div class="pricing-top-left-column">
            <h2 class="pricing-plan-heading">Exclusive Plan {CurrPlan == GetPlan ? <span className="plan-status">active</span> : null }</h2>
            <p class="pricing-plan-para">Our most popular plan for web developers.</p>
        </div>
        <div class="pricing-top-right-column">
            <div class="pricing-price"><span className='pricing-price-qty'>$10/mth</span></div>
        </div>
    </div>
    <div class="pricing-center-section">
        <div class="features-row-head">
            <h4 class="features-heading">FEATURES</h4>
            <p class="features-para">Everything in our premium plan with extra advance code  ...</p>
        </div>
        <div class="features-row">
            <div class="left-column">
                <ul class="feature-list">
                    <li><i className='fa-solid fa-check-circle'></i>5 GB Storage</li>
                    <li><i className='fa-solid fa-check-circle'></i>10 Email Accounts</li>
                    <li><i className='fa-solid fa-check-circle'></i>24/7 Customer Support</li>
                    <li><i className='fa-solid fa-check-circle'></i>Free Domain Name</li>
                    <li><i className='fa-solid fa-check-circle'></i>Unlimited Bandwidth</li>
                </ul>
            </div>
            <div class="right-column">
                <ul class="feature-list">
                    <li><i className='fa-solid fa-check-circle'></i>100 GB Bandwidth</li>
                    <li><i className='fa-solid fa-check-circle'></i>20 Email Accounts</li>
                    <li><i className='fa-solid fa-check-circle'></i>24/7 Customer Support</li>
                    <li><i className='fa-solid fa-check-circle'></i>Free SSL Certificate</li>
                    <li><i className='fa-solid fa-check-circle'></i>Unlimited Domains</li>
                </ul>
            </div>
        </div>
    </div>

    {Btn && ( GetPlan == CurrPlan ? (
        <div class="pricing-bottom-section">
        <button class={`cta-button curr-plan `}>Activated</button>
    </div>

    ):(
        <div class="pricing-bottom-section">
        <Link to="/subscribe" class={`cta-button`}>Purchase Now <i className='fa-regular fa-arrow-right'></i></Link>
    </div>

    ))
    }
</div>
  )
}
