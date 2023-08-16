import React, { useState, useRef, useContext } from 'react';

import WordsContext from '../../../providers/WordsContext';

import ButtonSave from './ButtonSave';

import './Word.scss';

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

const mistakesText = {
    // eslint-disable-next-line max-len
    word: 'Поле слова должно быть заполнено английскими буквами. Оно не может содержать цифры, небуквенные символы или быть пустым',
    transcription: 'Поле транскрипции не может содержать цифры, пробел или быть пустым',
    // eslint-disable-next-line max-len
    translation: 'Поле перевода должно быть заполнено русскими буквами. Оно не может содержать цифры, небуквенные символы или быть пустым'
};

const reWord = /[^a-zA-Z]+/;
const reTranscription = /[\d\s]+/;
// const reTranscription = /[^a-zA-Z\ː\:ıæɒɔɜəʌʋʃʒŋθð\[\]]+/;
const reTranslation = /[^а-яА-ЯёЁ\,\/]+/;

export default function WordAddingForm( props ) {
    const defaultWord = {
        word: `${props.word}`,
        transcription: `${props.transcription}`,
        translation: `${props.translation}`
    };

    const [ absentInput, setAbsentInput ] = useState ( defaultAbsentInputObj );
    const [ fixedWord, setFixedWord ] = useState( defaultWord );
    const [ inputMistakes, setInputMistakes ] = useState( defaultMistakes );
    const [ savePressed, setSavePressed ] = useState( 0 );
    const [ wordsAPI ] = useContext( WordsContext );
    const accordeonWord = useRef();

    const checkInputsValidation = ( e ) => {
        const name = e.target.name;
        let regexp;
        let mistakeText;

        if( name === 'word' ){ 
            regexp = reWord;
            mistakeText = mistakesText.word; }
        else if ( name === 'translation'){ 
            regexp = reTranslation;
            mistakeText = mistakesText.translation; }
        else { 
            regexp = reTranscription;
            mistakeText = mistakesText.transcription; }

        regexp.test( e.target.value )?
            setInputMistakes({ ...inputMistakes, [ name ]: mistakeText })
            :setInputMistakes({ ...inputMistakes, [ name ]:'' });
    };

    const setNewId = () => {
        if( wordsAPI !== undefined&&wordsAPI.length !== 0 ){
            console.log(wordsAPI.length);
            return ( wordsAPI.length );
        }
    };

    const saveChanges = () => {
        setSavePressed( prevState => prevState + 1 );
        if(!Object.values( inputMistakes ).join('')) {
            setSavePressed( 0 );
            // eslint-disable-next-line no-console
            console.log( 'word saved', fixedWord );}
        fetch( 'api/words/add', {
            method: 'POST',
            body: { ...fixedWord,
                id: setNewId()},
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then( response => response.json() );
        console.log( setNewId());
    };

    // const resetChanges = () => {
    //     setFixedWord( defaultWord );
    //     setAbsentInput( defaultAbsentInputObj );
    //     setSavePressed( 0 );
    // };

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
        <>
            <section className = { props.wordAddPressed? 'Word Word__active': 'Word Word__active Word__hidden'} >
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
                    <ButtonSave onClickSave = { saveChanges } absentInput = { absentInput }/>
                </div>
            </section>
            {<div className = {(savePressed>0)&&Object.values( inputMistakes ).join('')?
                'Word__warning Word__warning_showed':'Word__warning'}
            ref = { accordeonWord }>
                { Object.values( inputMistakes ).map (( mistake, index ) => {
                    return(
                        <div className = "mistake" key = { index }>{ mistake }</div>
                    );
                })} 
            </div>}
        </>
    );
}

