import React, { useState } from 'react';

import '../../../styles/ButtonsTraining.scss';
import './KnowButton.scss';

export default function KnowButton( props ){
    const [ familiarWords, setFamiliarWords ] = useState ( 0 );

    const increaseWordsCount = () => {
        setFamiliarWords( prevState => prevState + 1);

        props.setNextSlide( prevState => prevState + 1);
    };

    return(
        <button disabled = { props.cardReactionArr[props.currentSlide] === undefined ? false : true }
            className = "ButtonsTraining KnowButton" onClick = { increaseWordsCount }>
            { familiarWords === 0? 'Знаю': `Знаю (${ familiarWords })` }
        </button>
    );

}