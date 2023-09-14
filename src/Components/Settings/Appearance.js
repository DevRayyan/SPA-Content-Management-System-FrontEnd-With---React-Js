import React from 'react'
import ThemeRow from './ThemeRow';
import FontRow from './FontRow';


export default function Appearance(props) {


    return (
        <div className='personal_pro_wrap'>
            <div className='personal_pro_head'>
                Customizations</div>
            <ThemeRow themeProps={props} />
            <FontRow fontProps={props} />
        </div>
    );
}
