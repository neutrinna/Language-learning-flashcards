import React, { useContext, useState, useEffect } from 'react';

import data from '../../../data/colors.json';
import WordsContext from '../../../providers/WordsContext';

import WordAddingForm from './WordAddingForm';
import Word from './Word';
import './AllTheWords.scss';

export default function AllTheWords(){
    const [ wordsAPI, needRefresh, setNeedRefresh, loaderCB ] = useContext( WordsContext );
    const [ wordAddPressed, setWordAddPressed ] = useState( false );

    useEffect( () => {
        setNeedRefresh( !needRefresh );
    }, [] );

    const handleButtonPressed = () => {
        setWordAddPressed( !wordAddPressed );
    };

    const deleteWord = ( e, id ) => {
        fetch( `api/words/${id}/delete`, {
            method: 'POST',
            body: JSON.stringify( '' ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then( response => response.json() )
            .then( response => {
                // eslint-disable-next-line no-console
                console.log( response );
            })
            // eslint-disable-next-line no-console
            .catch( error => console.log( `Ошибка удаления слова: ${error}` ));
    };

    const changeWord = ( e, id, changedWord ) => {
        fetch( `api/words/${id}/update`, {
            method: 'POST',
            body: JSON.stringify( changedWord ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then( response => response.json() )
            .then( changedWord => {
                // eslint-disable-next-line no-console
                console.log( changedWord );
            })
            // eslint-disable-next-line no-console
            .catch( error => console.log( `Ошибка отправки слова на сервер: ${error}`));
    };

    const saveNewWord = ( e, newWord ) => {

        loaderCB( true );
        
        fetch( 'api/words/add', {
            method: 'POST',
            body: JSON.stringify( newWord ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then( response => response.json() )
            .then( newWord => {
                // eslint-disable-next-line no-console
                console.log( 'word saved', newWord );
                setTimeout( () => loaderCB( false ), 500 );
            })
            .catch( error => { 
                // eslint-disable-next-line no-console
                console.log( `Ошибка отправки слова на сервер: ${error}`);
                setTimeout( () => loaderCB( false ), 500 );
            });

        setNeedRefresh( !needRefresh );
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
                saveNewWord = { saveNewWord }/>
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
                                deleteWord = { deleteWord }
                                changeWord = { changeWord }/>
                        );
                    }):
                    data.map(( word, index ) => {
                        return <Word key = { index } {...word}/>;
                    })
            }
        </main>);
}