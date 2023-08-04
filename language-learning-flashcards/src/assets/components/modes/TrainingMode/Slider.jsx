import React, { useState, useEffect, useRef } from 'react';

import data from '../../../data/colors.json';
import arrowBack from '../../../images/arrow-back.svg';
import arrowForward from '../../../images/arrow-forward.svg';

import WordCard from './WordCard';

import './Slider.scss';

let offset = 0;
// let currentLearnedWordsCount = sessionStorage.getItem( 'currentLearnedWordsCount' ) || 0;

export default function Slider( props ){
    const [ offsetLeft, setOffset ] = useState( 0 );
    const [ cardIndex, setCardIndex ] = useState( 0 );
    const [ learnedWords, setLearnedWords ] = useState ( 0 );
    const ref = useRef();

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

    const countWordCheck = () => {
        let currentLearnedWordsCount = learnedWords;
        currentLearnedWordsCount += 1;
        setLearnedWords( currentLearnedWordsCount );
        console.log( `Изучено слов: ${currentLearnedWordsCount}` );
        // sessionStorage.setItem( 'currentLearnedWordsCount', currentLearnedWordsCount );
    };

    const setFocus = () => {
        ref.current.focus();
    };

    useEffect(() => {
        setTimeout( setFocus, 1050 );
    }, [ cardIndex ]);

    return(
        <div className ="Slider">
            <img src = { arrowBack } alt = "Стрелка назад" className = "buttons-slider"  onClick = { offsetBack }/>
            <div className ="Slider-wrapper">
                <div className = "Slider-line">
                    <div className = "Slider-frame" style = { { left: offsetLeft + 'vh' } }>
                        {data.map(( word, index ) => {
                            return(
                                <WordCard key = { word.word } { ...word }
                                    countWordCheck = { countWordCheck }
                                    className = "wordCard"
                                    ref = {  cardIndex === index ? ref : null }
                                /> );})
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
