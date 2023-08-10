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

const reWord = /[a-zA-Z]+/;
const reTranslation = /[а-яА-Я]+/;
const reTranscription = /[a-zA-Z:ıæɒɔɜəʌʋʃʒŋθð\[\]]+/;

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
    const [ mistakesNotification, setMistakesNotification] = useState('');
    const accordeonWord = useRef();

    const checkInputsValidation = ( e ) => {
        switch( String(e.target.name) ){
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
                console.log( true)
                setInputMistakes(  {...inputMistakes,
                    // eslint-disable-next-line max-len
                    [e.target.name]: 'Поле перевода должно быть заполнено русскими буквами. Оно не может содержать цифры, небуквенные символы или быть пустым' });
            }
            else {
                console.log( false );
                setInputMistakes( defaultMistakes )};
            break; 
        default: setInputMistakes( defaultMistakes );
        }
    };
    useEffect(()=>{
        if( buttonsState === false){
            if (mistakesNotification) {
                const inputMistakesArr = Object.values( inputMistakes );
                let count = 0;
                for( const mistake of inputMistakesArr ){
                    if( mistake !== '') count += 1;
                }
                if( count!== 0 ) {
                    setMistakesNotification( inputMistakesArr.join( ' ' ));
                };
                accordeonWord.current.classList.add('Word__warning_showed');
            }
            else { setMistakesNotification( defaultMistakes );
                accordeonWord.current.classList.remove('Word__warning_showed');}
        }
    }, [ inputMistakes, mistakesNotification ]);

    // useEffect(() => {
    //     // if( !mistakesNotification){accordeonWord.current.classList.remove('Word__warning_showed');
    //         // if( mistakesNotification !== undefined) 
    //     };
    // }, [ mistakesNotification ]);
    
    const changeButtonsState = ( ) => {
        setButtonState( !buttonsState );
    };

    const resetChanges = () => {
        setFixedWord( defaultWord );
        setButtonState( !buttonsState );
        setAbsentInput( defaultAbsentInputObj );
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
                        <ButtonSave onClickSave = { changeButtonsState } absentInput = { absentInput }/>
                        <ButtonDelete/>
                    </div>
                </section>
                <div className = "Word__warning" ref = { accordeonWord }>
                    { mistakesNotification }</div>
            </>
    );
}

