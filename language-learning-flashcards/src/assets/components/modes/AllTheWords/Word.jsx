import React, { useState, useRef } from 'react';

import ButtonSave from './ButtonSave';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';
import ButtonCancel from './ButtonCancel';

import './Word.scss';
import { useEffect } from 'react';

const defaultAbsentInputObj = {
    word: false,
    transcription: false,
    translation: false
};

const defaultMistakes = {
    word: '',
    transcription: '',
    translation: ''
};

const reWord = /[^a-zA-Z]+/;
const reTranslation = /[^а-яА-ЯёЁ]+/;
const reTranscription = /[^a-zA-Z:ıæɒɔɜəʌʋʃʒŋθð\[\]]+/;

export default function Word( props ) {
    const defaultWord = {
        word: `${props.word}`,
        transcription: `${props.transcription}`,
        translation: `${props.translation}`
    };

    const [ buttonsState, setButtonState ] = useState( true );
    const [ absentInput, setAbsentInput ] = useState ( defaultAbsentInputObj );
    const [ fixedWord, setFixedWord ] = useState( defaultWord );
    const [ inputMistakes, setInputMistakes ] = useState( defaultMistakes );
    const [ savePressed, setSavePressed ] = useState( 0 );
    const accordeonWord = useRef();

    const checkInputsValidation = ( e ) => {
        switch( e.target.name ){
        case 'word':
            if(reWord.test( e.target.value )) {
                setInputMistakes(  {...inputMistakes,
                    // eslint-disable-next-line max-len
                    [e.target.name]: 'Поле слова должно быть заполнено английскими буквами. Оно не может содержать цифры, небуквенные символы или быть пустым' });
            }
            else setInputMistakes( defaultMistakes );
            break; 
        case 'transcription':
            if(reTranscription.test( e.target.value )) {
                setInputMistakes(  {...inputMistakes,
                    // eslint-disable-next-line max-len
                    [e.target.name]: 'Поле транскрипции не может содержать цифры или быть пустым' });
            }
            else setInputMistakes( defaultMistakes );
            break;
        case 'translation':
            if(reTranslation.test( e.target.value )) {
                setInputMistakes(  {...inputMistakes,
                    // eslint-disable-next-line max-len
                    [e.target.name]: 'Поле перевода должно быть заполнено русскими буквами. Оно не может содержать цифры, небуквенные символы или быть пустым' });
            }
            else {
                setInputMistakes( defaultMistakes )};
            break; 
        default: setInputMistakes( defaultMistakes );
        }
    };

    useEffect(() => {
        console.log('press');
        console.log( Boolean(Object.values( inputMistakes ).join('')) );
        try{ Object.values( inputMistakes ).join('')? accordeonWord.current.classList.add('Word__warning_showed')
            : accordeonWord.current.classList.remove('Word__warning_showed');}
        catch {console.log(accordeonWord.current);}
    }, [ savePressed ]);
    
    const changeButtonsState = ( ) => {
        setButtonState( false );
    };
    const saveChanges = () => {
        setSavePressed( prevState => prevState + 1 );
        if(!Object.values( inputMistakes ).join('')) {
            setButtonState( true );
            setSavePressed( 0 );}
    };

    const resetChanges = () => {
        setFixedWord( defaultWord );
        setButtonState( true );
        setAbsentInput( defaultAbsentInputObj );
        setSavePressed( 0 );
    };

    const handleWordInputs = e => {
        if(e.target.value === '') {
            e.target.classList.add('incorrect');
            setAbsentInput(  {...absentInput,
                [e.target.name]: true });
        }
        else{
            e.target.classList.remove('incorrect');
            setAbsentInput({ ...absentInput,
                [e.target.name]: false });
        }

        checkInputsValidation( e );
        setFixedWord( { ...fixedWord,
            [e.target.name]: e.target.value.toLowerCase() });
    };

    return(
        buttonsState?
            <section className = "Word" >
                <div className = "Word__property">{ fixedWord.word }</div>
                <div className = "Word__property">{ fixedWord.transcription }</div>
                <div className = "Word__property">{ fixedWord.translation }</div>
                <div className = "Word__options">
                    <ButtonEdit onClick = { changeButtonsState }/>
                    <ButtonDelete/>
                </div>
            </section>
            
            : <>
                <section className = "Word Word__active" >
                    <div className = "Word__property word-word">
                        <input type = "text" value = { fixedWord.word } 
                            name = "word" onChange = { handleWordInputs }/>
                    </div>
                    <div className = "Word__property word-transcription">
                        <input type = "text" value = { fixedWord.transcription }
                            name = "transcription" onChange = { handleWordInputs }/>
                    </div>
                    <div className = "Word__property word-translation">
                        <input type = "text" value = { fixedWord.translation }
                            name = "translation" onChange = { handleWordInputs }/>
                    </div>
                    <div className = "Word__options">
                        <ButtonCancel onClickCancel = { resetChanges }/>
                        <ButtonSave onClickSave = { saveChanges } absentInput = { absentInput }/>
                        <ButtonDelete/>
                    </div>
                </section>
                {((savePressed>0)&&Object.values( inputMistakes ).join(''))?
                    <div className = "Word__warning" ref = { accordeonWord }>
                        { Object.values( inputMistakes ).map (( mistake, index ) => {
                            return(
                                <div  key = { index }>{ mistake }</div>
                            );
                        })} 
                    </div>: null}
            </>
    );
}

