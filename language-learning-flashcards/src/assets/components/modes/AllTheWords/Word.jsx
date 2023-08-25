import React, { useState, useRef } from 'react';

import ButtonSave from './ButtonSave';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';
import ButtonCancel from './ButtonCancel';

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
const reTranslation = /[^а-яА-ЯёЁ,/]+/;

export default function Word( props ) {
    const wordsStore = props.wordsStore;
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
    const [ isDeleted, setIsDeleted ] = useState( false );
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
    
    const changeButtonsState = () => {
        setButtonState( false );
    };

    const saveChanges = () => {
        setSavePressed( prevState => prevState + 1 );
        if(!Object.values( inputMistakes ).join('')) {

            const changedWord = {
                english: fixedWord.word,
                transcription: fixedWord.transcription,
                russian: fixedWord.translation,
                tags: '',
                tags_json: []
            };
            wordsStore.saveChanges( props.id, changedWord );
            
            setButtonState( true );
            setSavePressed( 0 );
            // eslint-disable-next-line no-console
            console.log( 'word saved', changedWord );}
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
            <section className = { isDeleted? 'Word Word__hidden': 'Word'} >
                <div className = "Word__property">{ fixedWord.word }</div>
                <div className = "Word__property">{ fixedWord.transcription }</div>
                <div className = "Word__property">{ fixedWord.translation }</div>
                <div className = "Word__options">
                    <ButtonEdit onClick = { changeButtonsState }/>
                    <ButtonDelete id = { props.id } 
                        setIsDeleted = { setIsDeleted }
                        wordsStore = { wordsStore }/>
                </div>
            </section>
            : <>
                <section className = { isDeleted?'Word Word__active Word__hidden': 'Word Word__active'} >
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
                        <ButtonDelete id = { props.id } 
                            setIsDeleted = { setIsDeleted }
                            deleteWord = { props.deleteWord }/>
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

