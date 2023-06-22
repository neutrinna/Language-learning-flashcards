import React, {useState} from 'react';

import ButtonSave from './ButtonSave';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';

import './Word.scss';

export default function Word( props ) {
  const [ buttonsState, setButtonState ] = useState(true);

  function changeButtonsState(){
    setButtonState(!buttonsState);
  }

  return(
    buttonsState?
      <section className="Word" >
        <div className="Word__property">{ props.word }</div>
        <div  className="Word__property">{ props.transcription }</div>
        <div  className="Word__property">{ props.translation }</div>
        <div className="Word__options">
          <ButtonEdit onClick={changeButtonsState}></ButtonEdit>
          <ButtonDelete></ButtonDelete>
        </div>
      </section>
      : <section className="Word Word__active" >
        <div className="Word__property"><input type="text" defaultValue = { props.word } /></div>
        <div className="Word__property"><input type="text" defaultValue = { props.transcription }/></div>
        <div className="Word__property"><input type="text" defaultValue = { props.translation }/></div>
        <div className="Word__options">
          <ButtonSave onClick={changeButtonsState}></ButtonSave>
          <ButtonDelete></ButtonDelete>
        </div>
      </section>
  );
}

