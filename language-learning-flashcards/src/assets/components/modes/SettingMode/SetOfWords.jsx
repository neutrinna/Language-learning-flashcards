import React from 'react';

import ButtonTrain from './ButtonTrain';

import './SetOfWords.scss'
import colors from '../../../images/colors.png'

export default function SetOfWords(){
    return(
        <section className='SetOfWords'>
            <ButtonTrain></ButtonTrain>
            <img src={colors} alt="Заставка карточки с цветами" />
            <h3>Цвета</h3>
        </section>
    )
}