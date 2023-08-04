import React, { useState } from 'react';
import { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import page from '../../../images/page.png';
import './WordCard.scss';
<<<<<<< HEAD

const WordCard = forwardRef(( props, ref) => {
    const [  translateCheck, setTranslateCheck ] = useState('');
    
    const handleChange = ( event ) => {
        setTranslateCheck( translateCheck? '' : 'display'  );
        props.countWordCheck( event.target );
    };
    
    return(
        <div className = "WordCard" >
            <img src = { page } alt = "Карточка слова в виде тетрадного листа" />
            <div className = "word">{ props.word }</div>
            <CSSTransition in = { translateCheck } timeout = { 1000 } classNames = "translate-transition">
                {translateCheck? 
                    <div className = "word-translate">{ props.translation } </div>
                    : 
                    <button className = "button-check" onClick = { handleChange } 
                        ref = { ref }>Проверить</button> }
            </CSSTransition>
        </div>
    );
});

export default WordCard;
=======
export default function WordCard( props ){
  const [  translateCheck, setTranslateCheck ] = useState('');

  const handleChange = () =>{
    setTranslateCheck( translateCheck? '' : 'display'  );
  };

  return(
    <div className = "WordCard" >
      <img src = { page } alt = "Карточка слова в виде тетрадного листа" />
      <div className = "word">{ props.word }</div>
      <CSSTransition in = { translateCheck } timeout = { 1000 } classNames = "translate-transition">
        {translateCheck? 
          <div className =  "word-translate">{ props.translation } </div>
          : 
          <div className = "button-check" onClick = { handleChange }>Проверить</div> }
      </CSSTransition>
    </div>
  );
}
>>>>>>> f607d2767da98fcbaea8c6c9013cc7f490c91104

WordCard.defaultProps = {
  word: 'Hello',
  translation: 'Привет'
};