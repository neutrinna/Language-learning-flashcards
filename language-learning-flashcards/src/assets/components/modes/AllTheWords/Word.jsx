import React, {useState} from 'react';

import ButtonSave from './ButtonSave';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';
import ButtonCancel from './ButtonCancel';

import './Word.scss';

export default function Word( props ) {
  const changedWord = {};
  const word = React.createRef();
  const transcription = React.createRef();
  const translation = React.createRef();

  const [ buttonsState, setButtonState ] = useState( true );
  const [ cancelState, setCancelState ] = useState( true );

  const changeButtonsState = () => {
    if( buttonsState ){}
    else{
      changedWord.word = word.current.value;
      changedWord.transcription = transcription.current.value;
      changedWord.translation = translation.current.value;
      setCancelState( !cancelState );
    }
    setButtonState( !buttonsState );
  };

  const resetChanges = () => {
    setButtonState( !buttonsState );
  };

<<<<<<< HEAD
    return(
        buttonsState?
            <section className = "Word" >
                <div className = "Word__property">{ cancelState ? `${ props.word }` : `${ changedWord.word }` }</div>
                <div  className = "Word__property">
                    { cancelState ? `${ props.transcription }` : `${ changedWord.transcription }` }</div>
                <div  className = "Word__property">
                    { cancelState ? `${ props.translation }` : `${ changedWord.translation }` }</div>
                <div className = "Word__options">
                    <ButtonEdit onClick = { changeButtonsState }/>
                    <ButtonDelete/>
                </div>
            </section>
            : <section className = "Word Word__active" >
                <div className = "Word__property word-word">
                    <input type = "text" defaultValue = { props.word } ref = { word } />
                </div>
                <div className = "Word__property word-transcription">
                    <input type = "text" defaultValue = { props.transcription } ref = { transcription }/>
                </div>
                <div className = "Word__property word-translation">
                    <input type = "text" defaultValue = { props.translation } ref = { translation }/>
                </div>
                <div className = "Word__options">
                    <ButtonCancel onClickCancel = { resetChanges }/>
                    <ButtonSave onClickSave = { changeButtonsState }/>
                    <ButtonDelete/>
                </div>
            </section>
    );
=======
  return(
    buttonsState?
      <section className = "Word" >
        <div className = "Word__property">{ cancelState ? `${ props.word }` : `${ changedWord.word }` }</div>
        <div  className = "Word__property">
          { cancelState ? `${ props.transcription }` : `${ changedWord.transcription }` }</div>
        <div  className = "Word__property">
          { cancelState ? `${ props.translation }` : `${ changedWord.translation }` }</div>
        <div className = "Word__options">
          <ButtonEdit onClick = { changeButtonsState }/>
          <ButtonDelete/>
        </div>
      </section>
      : <section className = "Word Word__active" >
        <div className = "Word__property word-word">
          <input type = "text" defaultValue = { props.word } ref = {word} />
        </div>
        <div className = "Word__property word-transcription">
          <input type = "text" defaultValue = { props.transcription } ref = {transcription}/>
        </div>
        <div className = "Word__property word-translation">
          <input type = "text" defaultValue = { props.translation } ref = {translation}/>
        </div>
        <div className = "Word__options">
          <ButtonCancel onClickCancel = { resetChanges }/>
          <ButtonSave onClickSave = { changeButtonsState }/>
          <ButtonDelete/>
        </div>
      </section>
  );
>>>>>>> f607d2767da98fcbaea8c6c9013cc7f490c91104
}

