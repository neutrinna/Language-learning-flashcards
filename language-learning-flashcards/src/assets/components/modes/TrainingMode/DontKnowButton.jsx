import React, { useState } from 'react';

import '../../../styles/ButtonsTraining.scss';
import './DontKnowButton.scss';

export default function DontKnowButton( props ){
    const [ unFamiliarWords, setUnFamiliarWords ] = useState ( 0 );

    const increaseWordsCount = () => {
        setUnFamiliarWords( prevState => prevState + 1);

        props.setNextSlide( prevState => prevState + 1);
    };

    return(
        <button className = "ButtonsTraining DontKnowButton" onClick = { increaseWordsCount }>
            { unFamiliarWords === 0? 'Не знаю':
                `Не знаю (${ unFamiliarWords })` }
        </button>
    );

}