import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import data from '../../../data/colors.json';
import WordsStore from '../../../stores/WordsStore';

import WordAddingForm from './WordAddingForm';
import Word from './Word';
import './AllTheWords.scss';

const wordsStore = new WordsStore();

const AllTheWords = observer( () => {
    const [ needRefresh, setNeedRefresh ] = useState( false )
    const [ wordAddPressed, setWordAddPressed ] = useState( false );

    const handleButtonPressed = () => {
        setWordAddPressed( !wordAddPressed );
    };

    useEffect( () => {
        wordsStore.refreshWordsAPI()
    }, [ needRefresh ])

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
                setWordAddPressed = { setWordAddPressed }
                setNeedRefresh = { setNeedRefresh }
                needRefresh = { needRefresh }/>
            } 

            { 
                ( wordsStore.wordsAPI !== undefined&&wordsStore.wordsAPI.length !== 0 )?
                    wordsStore.wordsAPI.map(( word ) => {
                        return(
                            <Word
                                key = { word.id }
                                word = { word.english }
                                transcription = { word.transcription }
                                translation = { word.russian }
                                id = { word.id }
                                saveChanges = { wordsStore.saveChanges }
                                deleteWord = { wordsStore.deleteWord }/>
                        );
                    }):
                    data.map(( word, index ) => {
                        return <Word key = { index } {...word}/>;
                    })
            }
        </main>
    );
})

export default AllTheWords;

