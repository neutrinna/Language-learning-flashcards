import React, { useContext, useState } from 'react';

import WordsContext from '../../../providers/WordsContext';

import data from '../../../data/colors.json';

import Word from './Word';

import './AllTheWords.scss';
import WordAddingForm from './WordAddingForm';


export default function AllTheWords(){
    const [ wordsAPI, refreshWordsAPI ] = useContext( WordsContext );
    const [ wordAddPressed, setWordAddPressed ] = useState( false );

    const handleButtonPressed = () => {
        setWordAddPressed( !wordAddPressed );
    };

    const deleteWord = ( e, id ) => {

        // fetch( `api/words/${id}/delete`, {
        //     method: 'POST',
        //     body: JSON.stringify( '' ),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8'
        //     }
        // })
        //     .then( response => response.json() )
        //     .then( response => {
        //         console.log( response );
        //     })
        //     .catch( error => console.log( `Ошибка отправки слова на сервер: ${error}` ));

        refreshWordsAPI();

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
                                id = { word.id }
                                deleteWord = { deleteWord }/>
                        );
                    }):
                    data.map(( word, index ) => {
                        return <Word key = { index } {...word}/>;
                    })
            }
        </main>);
}