import React, { useState } from 'react';

import data from '../../../data/colors.json';
import arrowBack from '../../../images/arrow-back.svg';
import arrowForward from '../../../images/arrow-forward.svg';

import WordCard from './WordCard';

import './Slider.scss';

let offset = 0;

export default function Slider( props ){
    const [ offsetLeft, setOffset ] = useState( 0 );
    const [ cardIndex, setCardIndex ] = useState( 0 );

    const offsetBack = () => {
        offset -= 67;

        if ( offset < 0 ) {
            offset = 67 * 8;
        };
        setOffset( -offset );
        setCardIndex( offset/67 );
    };

    const offsetNext = () => {
        offset += 67;
        if ( offset > 67 * 8 ) {
            offset = 0;
        };
        setOffset( -offset );
        setCardIndex( offset/67 );
    };

    return(
        <div className ="Slider">
            <img src = { arrowBack } alt = "Стрелка назад" className = "buttons-slider"  onClick = { offsetBack }/>
            <div className ="Slider-wripper">
                <div className = "Slider-line">
                    <div className = "Slider-frame" style = { { left: offsetLeft + 'vh' } }>
                        {data.map(( word ) => {
                            return(
                                <WordCard key = { word.word } { ...word } /> );})
                        }
                    </div>
                </div>
            </div>
            <img src = { arrowForward } alt = "Стрелка вперед" className = "buttons-slider" onClick = { offsetNext }/>
        </div>
    );
}

WordCard.defaultProps = {
    word: data.word,
    translate: data.translation
};
