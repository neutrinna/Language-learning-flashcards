import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import data from '../../../data/colors.json';
import arrowBack from '../../../images/arrow-back.svg';
import arrowForward from '../../../images/arrow-forward.svg';

import WordCard from './WordCard';

import './Slider.scss';

let offset = 0;

const Slider = observer(( props ) => {
    const wordsStore = props.wordsStore;
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => wordsStore.refreshWordsAPI, [ wordsStore.needRefresh ] );

    const [ offsetLeft, setOffset ] = useState( 0 );
    const [ cardIndex, setCardIndex ] = useState( 0 );
    const [ learnedWords, setLearnedWords ] = useState ( 0 );
    let cardsArrLength = wordsStore.wordsAPI.length;
    const ref = useRef();

    const setSlideOffset = ( offsetDirection ) => {
        if( wordsStore.wordsAPI === undefined&&wordsStore.wordsAPI.length===0 ) cardsArrLength = data.length;
        if( offsetDirection === 'back' ) {
            offset -= 67;
            if ( offset < 0 ) {
                offset = 67 * ( cardsArrLength-1 );
            };}
        else {
            offset += 67;
            if ( offset > 67 * ( cardsArrLength-1 )) {
                offset = 0;
            };
        }
        setOffset( -offset );
    };

    useEffect( () => {
        setCardIndex( -offsetLeft/67 );
        props.setCurrentSlide( -offsetLeft/67 );
    }, [ offsetLeft ]);
    useEffect( () => setSlideOffset( 'forward' ), [ props.nextSlide ]);

    const countWordCheck = () => {
        let currentLearnedWordsCount = learnedWords;
        currentLearnedWordsCount += 1;
        setLearnedWords( currentLearnedWordsCount );
        // eslint-disable-next-line no-console
        console.log( `Изучено слов: ${currentLearnedWordsCount}` );
    };

    // const setFocus = () => {
    //     if( ref !== undefined && ref !== null ) ref.current.focus();
    // };

    // useEffect(() => {
    //     if( ref !== undefined && ref !== null ) setTimeout( setFocus, 500 );
    // }, [ cardIndex ]);

    return(
        <div className ="Slider">
            <img src = { arrowBack } alt = "Стрелка назад"
                className = "buttons-slider"  onClick = { () => setSlideOffset( 'back' ) }/>
            <div className ="Slider-wrapper">
                <div className = "Slider-line">
                    <div className = "Slider-frame" style = { { left: offsetLeft + 'vh' } }>
                        { wordsStore.wordsAPI !== undefined&&wordsStore.wordsAPI.length !==0 ?
                            wordsStore.wordsAPI.map(( word, index ) => {
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
            <img src = { arrowForward } alt = "Стрелка вперед" className = "buttons-slider"
                onClick = { () => setSlideOffset( 'forward' ) }/>
        </div>
    );
});

WordCard.defaultProps = {
    word: data.word,
    translate: data.translation
};

export default Slider;