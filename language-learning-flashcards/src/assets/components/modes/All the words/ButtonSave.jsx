import React from 'react';

import Save from '../../../images/save.svg'
import './ButtonSave.scss'

export default function ButtonSave(){
    return(
        <img className='ButtonSave' src={Save} alt="кнопка сохранить"/>
    )
}