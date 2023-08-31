import React, { useState, useEffect  } from 'react';
import { observer } from 'mobx-react-lite';

import data from '../../../data/colors.json';

import WordAddingForm from './WordAddingForm';
import Word from './Word';
import './AllTheWords.scss';

const AllTheWords = observer(( props ) => {
    
    const wordsStore = props.wordsStore;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => wordsStore.refreshWordsAPI, [ wordsStore.needRefresh ] );

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
                setWordAddPressed = { setWordAddPressed }
                wordsStore = { wordsStore }/>
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
                                wordsStore = { wordsStore }/>
                        );
                    }):
                    data.map(( word, index ) => {
                        return <Word key = { index } {...word}/>;
                    })
            }
        </main>
    );
});

export default AllTheWords;

