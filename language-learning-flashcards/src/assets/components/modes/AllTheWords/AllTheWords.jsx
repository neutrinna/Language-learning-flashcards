<<<<<<< HEAD
import React from 'react';
import { observer } from 'mobx-react-lite';
=======
import React, { useContext, useState, useEffect } from 'react';
>>>>>>> e42c218b5c1b80ea2f7c8ee99bd5c9377f0b08fd

import data from '../../../data/colors.json';
import WordsContext from '../../../providers/WordsContext';

import WordAddingForm from './WordAddingForm';
import Word from './Word';
import './AllTheWords.scss';

<<<<<<< HEAD
const AllTheWords = observer( () => {
=======
export default function AllTheWords(){
    const [ wordsAPI, needRefresh, setNeedRefresh, loaderCB ] = useContext( WordsContext );
    const [ wordAddPressed, setWordAddPressed ] = useState( false );

    useEffect( () => {
        setNeedRefresh( !needRefresh );
    }, [] );

    const handleButtonPressed = () => {
        setWordAddPressed( !wordAddPressed );
    };

    const deleteWord = id => {
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

    const changeWord = ( id, changedWord ) => {
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

    const saveNewWord = async newWord => {

        loaderCB( true );
        
        try{
            const response = await fetch( 'api/words/add', {
                method: 'POST',
                body: JSON.stringify( newWord ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            const data = await response.json();
            // eslint-disable-next-line no-console
            console.log( 'word saved', data );
            setTimeout( () => loaderCB( false ), 500 );
        }
        catch( error ){ 
            // eslint-disable-next-line no-console
            console.log( `Ошибка отправки слова на сервер: ${error}`);
            setTimeout( () => loaderCB( false ), 500 );
        };

        setNeedRefresh( !needRefresh );
    };

>>>>>>> e42c218b5c1b80ea2f7c8ee99bd5c9377f0b08fd
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
<<<<<<< HEAD
        </main>
    );
})

export default AllTheWords;
=======
        </main>);
}
>>>>>>> e42c218b5c1b80ea2f7c8ee99bd5c9377f0b08fd
