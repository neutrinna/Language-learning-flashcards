import React from 'react';

import colors from '../../../images/colors.png';

import ButtonTrain from './ButtonTrain';

import './SetOfWords.scss';


export default function SetOfWords(){
    return(
        <section className = "SetOfWords">
            <ButtonTrain/>
            <img src = { colors } alt = "Заставка карточки с цветами" />
            <h3>Цвета</h3>
        </section>
    );
}