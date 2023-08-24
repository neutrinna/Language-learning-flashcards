import React from 'react';

import Slider from './Slider';
import KnowButton from './KnowButton';
import DontKnowButton from './DontKnowButton';
import './TrainingMode.scss';

export default function TrainingMode( props ){

    return(
        <main className="TrainingMode">
            <Slider wordsStore = { props.wordsStore }/>
            <div className="Buttons">
                <DontKnowButton/>
                <KnowButton/>
            </div>
        </main>
    );
}