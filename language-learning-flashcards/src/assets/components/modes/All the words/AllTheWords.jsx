import React from 'react';

import data from '../../../data/colors.json';

import Word from './Word';

import './AllTheWords.scss';

export default function AllTheWords(){
  return(
    <main className="AllTheWords">
      <div className="AllTheWords__title">
        <div>Слово</div>
        <div>Транскрипция</div>
        <div>Перевод</div>
      </div>{
        data.map((word, index) => {
          return(
            <Word
              key = {index}
              word = {word.word}
              transcription = {word.transcription}
              translation = {word.translation}>
            </Word>
          );
        })
      }
    </main>
  );
}