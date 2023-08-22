import React, { useState, useEffect, useRef, useContext } from 'react';

import data from '../../../data/colors.json';
import arrowBack from '../../../images/arrow-back.svg';
import arrowForward from '../../../images/arrow-forward.svg';
import WordsContext from '../../../providers/WordsContext';

import WordCard from './WordCard';

import './Slider.scss';

let offset = 0;

export default function Slider( props ){
    const [ offsetLeft, setOffset ] = useState( 0 );
    const [ cardIndex, setCardIndex ] = useState( 0 );
    const [ learnedWords, setLearnedWords ] = useState ( 0 );
    const [ wordsAPI, needRefresh, setNeedRefresh ] = useContext( WordsContext );
    let cardsArrLength = wordsAPI.length;
    const ref = useRef();

    useEffect( () => {
        setNeedRefresh( !needRefresh );
    }, [] );
    
    const offsetBack = () => {
        if( wordsAPI === undefined&&wordsAPI.length===0 ) cardsArrLength = data.length;
        offset -= 67;

        if ( offset < 0 ) {
            offset = 67 * ( cardsArrLength-1 );
        };
        setOffset( -offset );
        setCardIndex( offset/67 );
    };

    const offsetNext = () => {
        if( wordsAPI === undefined&&wordsAPI.length===0 ) cardsArrLength = data.length;
        offset += 67;

        if ( offset > 67 * ( cardsArrLength-1 )) {
            offset = 0;
        };
        setOffset( -offset );
        setCardIndex( offset/67 );
    };

    const countWordCheck = () => {
        let currentLearnedWordsCount = learnedWords;
        currentLearnedWordsCount += 1;
        setLearnedWords( currentLearnedWordsCount );
        // eslint-disable-next-line no-console
        console.log( `Изучено слов: ${currentLearnedWordsCount}` );
    };

    // const setFocus = () => {
    //     if( ref !== undefined ) ref.current.focus();
    // };

    // useEffect(() => {
    //     if( ref !== undefined ) setTimeout( setFocus, 1050 );
    // }, [ cardIndex ]);

    return(
        <div className ="Slider">
            <img src = { arrowBack } alt = "Стрелка назад" className = "buttons-slider"  onClick = { offsetBack }/>
            <div className ="Slider-wrapper">
                <div className = "Slider-line">
                    <div className = "Slider-frame" style = { { left: offsetLeft + 'vh' } }>
                        { wordsAPI !== undefined&&wordsAPI.length !==0 ?
                            wordsAPI.map(( word, index ) => {
                                return (<WordCard key = { word.id } 
                                    word = { word.english }
                                    transcription = { word.transcription }
                                    translation = { word.russian }
                                    countWordCheck = { countWordCheck }
                                    className = "wordCard"
                                    ref = {  cardIndex === index ? ref : null }
                                /> );}):
                            data.map(( word, index ) => {
                                return <WordCard key = { index } {...word} countWordCheck = { countWordCheck }/>;
                            })
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
