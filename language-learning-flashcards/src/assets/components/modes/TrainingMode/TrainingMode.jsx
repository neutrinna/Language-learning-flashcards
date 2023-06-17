import React from 'react';

import WordCard from './WordCard';
import KnowButton from './KnowButton';
import DontKnowButton from './DontKnowButton';
import './TrainingMode.scss';

export default function TrainingMode(){
  return(
    <main className="TrainingMode">
      <WordCard></WordCard>
      <div className="Buttons">
        <DontKnowButton></DontKnowButton>
        <KnowButton></KnowButton>
      </div>
    </main>
  );
}