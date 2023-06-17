import React from 'react';

import page from '../../../images/page.png'
import './WordCard.scss'

export default function WordCard(){
    return(
        <div className='WordCard' >
            <img src={page} alt="Карточка слова в виде тетрадного листа" />
            <div className='word'>hello</div>
        </div>
    )
}