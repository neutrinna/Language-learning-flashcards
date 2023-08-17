import React, { useContext, useState } from 'react';
import WordsContext from '../../../providers/WordsContext';

import data from '../../../data/colors.json';

import Word from './Word';

import './AllTheWords.scss';
import WordAddingForm from './WordAddingForm';

export default function AllTheWords(){
    const [ wordsAPI ] = useContext( WordsContext );
    const [ wordAddPressed, setWordAddPressed ] = useState( false );

    const handleButtonPressed = () => {
        setWordAddPressed( !wordAddPressed );
    };

    return(
        <main className="AllTheWords">
            <div className="AllTheWords__title">
                <div>Слово</div>
                <div>Транскрипция</div>
                <div>Перевод</div>
                <button className="AllTheWords__buttonAdd" onClick={ handleButtonPressed }>Добавить слово</button>
            </div>
            { <WordAddingForm 
                word = { '' }
                transcription = { '' }
                translation = { '' }
                wordAddPressed = { wordAddPressed }
                setWordAddPressed = { setWordAddPressed }/>
            }
            { 
                ( wordsAPI !== undefined&&wordsAPI.length !== 0 )?
                    wordsAPI.map(( word ) => {
                        return(
                            <Word
                                key = { word.id }
                                word = { word.english }
                                transcription = { word.transcription }
                                translation = { word.russian }
                                id = { word.id }/>
                        );
                    }):
                    data.map(( word, index ) => {
                        return <Word key = { index } {...word}/>;
                    })
            }
        </main>);
}