import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CSSTransition } from 'react-transition-group';

import Header from './assets/components/Header';
import AllTheWords from './assets/components/modes/AllTheWords/AllTheWords';
import SettingMode from './assets/components/modes/SettingMode/SettingMode';
import TrainingMode from './assets/components/modes/TrainingMode/TrainingMode';
import NotFoundPage from './assets/components/NotFoundPage';
import Loader from './assets/components/Loader';
import Error from './assets/components/Error';

import './App.css';

const App = observer( ( props ) => {
    const wordsStore = props.wordsStore;

    useEffect(() => wordsStore.refreshWordsAPI(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ wordsStore.needRefresh ]);

    if( wordsStore.error ){
        return <Error name = { wordsStore.error.name } message = { wordsStore.error.message }/>;
    }

    return (
        <>
            <CSSTransition in = { wordsStore.isLoading }
                timeout = {1000} classNames = "Loader" mountOnEnter unmountOnExit >
                <Loader/> 
            </CSSTransition>

            <div className = "App">
                <Router>
                    <Header/>
                    <Routes>
                        <Route path = "/" element = { <SettingMode/>}/>
                        <Route path = "/words" element = { <AllTheWords wordsStore = { wordsStore }/> }/>
                        <Route path = "/game" element = { <TrainingMode wordsStore = { wordsStore }/> }/>
                        <Route path = "*" element = { <NotFoundPage/> }/>
                    </Routes>
                </Router>
            </div>
        </>
    );
});

export default App;
