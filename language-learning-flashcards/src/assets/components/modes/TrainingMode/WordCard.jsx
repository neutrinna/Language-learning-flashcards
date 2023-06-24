import React from 'react';

import page from '../../../images/page.png';
import './WordCard.scss';
export default function WordCard( props ){

  return(
    <div className = "WordCard" >
      <img src = { page } alt = "Карточка слова в виде тетрадного листа" />
      <div className = "word">{ props.word }</div>
      <div className = { `word-translate ${ props.translateCheck }`}>{ props.translate }</div>
    </div>
  );
}

WordCard.defaultProps = {
  word: 'hello',
  translate: 'привет'
};