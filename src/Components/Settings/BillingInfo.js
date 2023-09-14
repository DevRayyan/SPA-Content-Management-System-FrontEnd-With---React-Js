import React from 'react'

export default function BillingInfo() {
    return (
        <>
        <div className='personal_pro_wrap'>

           <div className='personal_pro_head'>
                Billing Information
            </div>
            <div className='personal_pro_container'>
                <div className='personal_pro_h2'>
                    Manage Payment Method
                </div>
                <div className='billing_info_fields'>
                    <form>
                        <div class="input-grid">
                            <div class="input-box">
                                <label htmlFor="billing_card_name">Card  Holder*</label>
                                <input type="text" id="billing_card_name" />
                            </div>
                        </div>
                        <div class="input-box">
                            <label htmlFor="billing_card_number">Credit/debit card number*</label>
                            <input type="text" id="billing_card_number" />
                        </div>
                        <div class="input-box">
                            <label htmlFor="billing_card_date">Expiration month and year*</label>
                            <input type="text" id="billing_card_date" />
                        </div>
                        <div class="input-box">
                            <label htmlFor="billing_card_cvc">CVC*</label>
                            <input type="text" id="billing_card_cvc" />
                        </div>

                        <div class="input-button">
                            <button>Update Changes</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}
