import React, {useState} from 'react';
// import { CSSTransition } from 'react-transition-group';

import page from '../../../images/page.png';
import './WordCard.scss';
export default function WordCard( props ){
  const [  translateCheck, setTranslateCheck ] = useState('');

  const handleChange = () =>{
    setTranslateCheck( translateCheck? '' : 'display'  );
  };

  return(
    <div className = "WordCard" >
      <img src = { page } alt = "Карточка слова в виде тетрадного листа" />
      <div className = "word">{ props.word }</div>
        {translateCheck?
          <div className = { `word-translate ${ translateCheck }`}>
            { props.translation }</div>
          : <div className = "button-check" onClick = { handleChange }>
            Проверить</div>  }
    </div>
  );
}

WordCard.defaultProps = {
  word: 'Hello',
  translation: 'Привет'
};