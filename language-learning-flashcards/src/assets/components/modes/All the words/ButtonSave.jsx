import React from 'react';

import Save from '../../../images/save.svg'
import '../../../styles/Button.scss'
import './ButtonSave.scss'

export default function ButtonSave(){
    return(
        <img className='Button ButtonSave' src={Save} alt="кнопка сохранить"/>
    )
}