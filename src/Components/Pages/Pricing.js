import React from 'react'
import Plan from '../PaymentGatway/Plan'

export default function Pricing() {
    return (
        <>
            <div className='pricing-container'>
                <div className='pricing-heading'>
                    <h1>Unlock <span className='overlay-red-underline'>Advanced</span> <span className='overlay-red-underline'> Development</span> Resources.</h1>
                    <p>Simple and affordable,No Hidden Fees. Advance Features for your Web Developement Carrier. </p>
                </div>
                {/* <div class="pricing-card">
                    <div class="pricing-top-section">
                        <div class="pricing-top-left-column">
                            <h2 class="pricing-plan-heading">Basic Plan <span className='plan-status'>Current plan</span></h2>
                            <p class="pricing-plan-para">Basic features and reporting.</p>
                        </div>
                        <div class="pricing-top-right-column">
                            <div class="pricing-price"><span className='pricing-price-curr'>$</span><span className='pricing-price-qty'>00</span><span className='pricing-price-time'>per month</span></div>
                        </div>
                    </div>
                    <div class="pricing-center-section">
                        <div class="features-row-head">
                            <h4 class="features-heading">FEATURES</h4>
                            <p class="features-para">Everything in our free plan plus...</p>
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
                    <div class="pricing-bottom-section">
                        <button class="cta-button curr-plan">Plan Activated </button>
                    </div>
                </div> */}
              <Plan GetPlan={'pro'}/>
            </div>
        </>

    )
}
