import React, { useState, useEffect } from 'react';

import Slider from './Slider';
import KnowButton from './KnowButton';
import DontKnowButton from './DontKnowButton';
import './TrainingMode.scss';

export default function TrainingMode( props ){
    const [ nextSlide, setNextSlide ] = useState( 0 );
    const [ cardReactionArr, setCardReactionArr ] = useState( Array( props.wordsStore.wordsAPI.length ));
    const [ currentSlide, setCurrentSlide ] = useState( 0 );

    useEffect(() => setCardReactionArr({ ...cardReactionArr, [ currentSlide ]: true }), [ currentSlide ]);
    useEffect(()=> console.log(cardReactionArr, cardReactionArr[props.currentSlide]), [cardReactionArr]);

    return(
        <main className="TrainingMode">
            <Slider wordsStore = { props.wordsStore } nextSlide = { nextSlide } setCurrentSlide = { setCurrentSlide }/>
            <div className="Buttons">
                <DontKnowButton setNextSlide = { setNextSlide } cardReactionArr = { cardReactionArr }
                    currentSlide = { currentSlide }/>
                <KnowButton setNextSlide = { setNextSlide } cardReactionArr = { cardReactionArr }
                    currentSlide = { currentSlide }/>
            </div>
        </main>
    );
}