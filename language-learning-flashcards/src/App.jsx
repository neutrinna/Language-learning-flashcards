import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Header from './assets/components/Header';
import AllTheWords from './assets/components/modes/AllTheWords/AllTheWords';
import SettingMode from './assets/components/modes/SettingMode/SettingMode';
import TrainingMode from './assets/components/modes/TrainingMode/TrainingMode';
import NotFoundPage from './assets/components/NotFoundPage';
import WordsContext from './assets/providers/WordsContext';
import Error from './assets/components/Error';

import './App.css';
import Loader from './assets/components/Loader';


function App() {
    const [ wordsAPI, setWordsAPI ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ error, setError ] = useState();
    const [ needRefresh, setNeedRefresh ] = useState( false );

    const refreshWordsAPI = () => {
        fetch( '/api/words' )
            .then( response => {
                if( response.ok ){
                    return response.json();
                } else{
                    throw new Error( 'Ошибка в выполнении запроса к серверу' );
                }})
            .then( response  => {
                setWordsAPI( response );
                setTimeout( () => setIsLoading( false ), 500 );
            }
            )
            .catch( error => {
                setError( error );
                setTimeout( () => setIsLoading( false ), 500 );
            });
    };

    const loaderCB = param => {
        setIsLoading( param );
    };

    useEffect( () => {
        refreshWordsAPI();
    }, [ needRefresh ] );
    console.log(error);
    if( error ){
        return <Error name = { error.name } message = { error.message }/>;
    }

    return (
        <>
            <CSSTransition in = { isLoading } timeout = {1000} classNames = "Loader" mountOnEnter unmountOnExit >
                <Loader/> 
            </CSSTransition>

            <WordsContext.Provider value = {[ wordsAPI, needRefresh, setNeedRefresh, loaderCB ]}>
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
        </>
    );
}

export default App;
