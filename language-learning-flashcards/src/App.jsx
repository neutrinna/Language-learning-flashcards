import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './assets/components/Header';
import AllTheWords from './assets/components/modes/AllTheWords/AllTheWords';
import SettingMode from './assets/components/modes/SettingMode/SettingMode';
import TrainingMode from './assets/components/modes/TrainingMode/TrainingMode';
import NotFoundPage from './assets/components/NotFoundPage';
import WordsContext from './assets/providers/WordsContext';

import './App.css';


function App() {
    const [ wordsAPI, setWordsAPI ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ error, setError ] = useState( {} );

    useEffect(() => {
        fetch( '/api/words' )
            .then( response => {
                if( response.ok ){
                    return response.json();
                } else{
                    throw new Error( 'Ошибка в выполнении запроса к серверу' );
                }})
            .then( response  => {
                setWordsAPI( response );
                setIsLoading( false );}
            )
            .catch( error => {
                setError( error );
                setIsLoading( false );
            });
    }, []);

    // if( error ){
    //     return <h1>{error.message}</h1>
    // }
    // if( isLoading ){
    //     return <h1>Выполняется загрузка...</h1>
    // }
    return (
        <WordsContext.Provider value = {[ wordsAPI ]}>
            <div className = "App">
                <Router>
                    <Header/>
                    <Routes>
                        <Route path = "/" element = { <SettingMode/>}/>
                        <Route path = "/words" element = { <AllTheWords/> }/>
                        <Route path = "/game" element = { <TrainingMode/> }/>
                        <Route path = "*" element = { <NotFoundPage/> }/>
                    </Routes>
                </Router>
            </div>
        </WordsContext.Provider>
    );
}

export default App;
